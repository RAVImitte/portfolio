"""One-off generator for the avatar hero animation frame sequence.

Morphs between the two supplied cutouts (public/no_background_right_looking_first.png
and public/no_background_left_looking_second.png) using dense optical flow, producing
a sequence of in-between frames that preserve alpha transparency. The frames are
consumed by src/components/HeroAvatar.tsx, which cross-fades adjacent frames based on
pointer position for a smooth, seamless head turn -- no video codec involved, so the
transparent background survives in every browser.

Run with: python docs/gen_avatar_frames.py
Not part of the build; regenerate manually if the source cutouts change.
"""
import os

import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(HERE, "..", "public")
OUT_DIR = os.path.join(PUBLIC, "avatar-frames")

SRC_A = os.path.join(PUBLIC, "no_background_right_looking_first.png")
SRC_B = os.path.join(PUBLIC, "no_background_left_looking_second.png")

TARGET_WIDTH = 640
N_FRAMES = 25
WEBP_QUALITY = 82


def load_resized(path, width):
    img = Image.open(path).convert("RGBA")
    ratio = width / img.width
    height = round(img.height * ratio)
    img = img.resize((width, height), Image.LANCZOS)
    return np.array(img).astype(np.float32)


def premultiply(rgba):
    rgb = rgba[..., :3]
    a = rgba[..., 3:4] / 255.0
    return rgb * a, rgba[..., 3]


def gray_for_flow(rgba):
    # Composite over mid-gray so silhouette edges (not just interior texture) drive
    # the flow estimate, then convert to 8-bit grayscale for Farneback.
    rgb = rgba[..., :3]
    a = rgba[..., 3:4] / 255.0
    composited = rgb * a + 128.0 * (1 - a)
    return cv2.cvtColor(composited.astype(np.uint8), cv2.COLOR_RGB2GRAY)


def calc_flow(gray_from, gray_to):
    return cv2.calcOpticalFlowFarneback(
        gray_from, gray_to, None,
        pyr_scale=0.5, levels=5, winsize=25,
        iterations=6, poly_n=7, poly_sigma=1.5, flags=0,
    )


def warp(field, flow, scale):
    h, w = field.shape[:2]
    grid_x, grid_y = np.meshgrid(np.arange(w, dtype=np.float32), np.arange(h, dtype=np.float32))
    map_x = grid_x - flow[..., 0] * scale
    map_y = grid_y - flow[..., 1] * scale
    return cv2.remap(
        field, map_x, map_y, interpolation=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT, borderValue=0,
    )


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    a_rgba = load_resized(SRC_A, TARGET_WIDTH)
    b_rgba = load_resized(SRC_B, TARGET_WIDTH)
    assert a_rgba.shape == b_rgba.shape, "source frames must share the same aspect ratio"

    a_pm, a_alpha = premultiply(a_rgba)
    b_pm, b_alpha = premultiply(b_rgba)

    gray_a = gray_for_flow(a_rgba)
    gray_b = gray_for_flow(b_rgba)
    flow_ab = calc_flow(gray_a, gray_b)  # displacement A -> B
    flow_ba = calc_flow(gray_b, gray_a)  # displacement B -> A

    for i in range(N_FRAMES):
        t = i / (N_FRAMES - 1)
        name = os.path.join(OUT_DIR, f"frame-{i:02d}.webp")

        if i == 0:
            out_rgba = a_rgba
        elif i == N_FRAMES - 1:
            out_rgba = b_rgba
        else:
            warped_a_pm = warp(a_pm, flow_ab, t)
            warped_a_alpha = warp(a_alpha, flow_ab, t)
            warped_b_pm = warp(b_pm, flow_ba, 1 - t)
            warped_b_alpha = warp(b_alpha, flow_ba, 1 - t)

            blended_pm = warped_a_pm * (1 - t) + warped_b_pm * t
            blended_alpha = warped_a_alpha * (1 - t) + warped_b_alpha * t

            safe_alpha = np.clip(blended_alpha, 1e-3, 255.0)
            rgb = blended_pm / (safe_alpha[..., None] / 255.0)
            rgb = np.clip(rgb, 0, 255)
            alpha = np.clip(blended_alpha, 0, 255)
            out_rgba = np.dstack([rgb, alpha]).astype(np.uint8)

        Image.fromarray(out_rgba.astype(np.uint8), "RGBA").save(
            name, "WEBP", quality=WEBP_QUALITY, method=6
        )
        print(f"wrote {name}")

    print(f"done: {N_FRAMES} frames in {OUT_DIR}")


if __name__ == "__main__":
    main()
