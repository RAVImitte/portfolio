"""One-off generator for the two OG share cards (public/og-backend.png, public/og-android.png).
Run with: python docs/gen_og_cards.py
Not part of the build; regenerate manually if the copy changes.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap

W, H = 1200, 630
PAPER = (247, 245, 241)
INK = (26, 26, 26)
MUTED = (95, 91, 85)
BLUE = (33, 85, 232)
CHIP_BG = (250, 248, 244)
CHIP_LINE = (221, 214, 202)

FONTS = "C:/Windows/Fonts/"
f_kicker = ImageFont.truetype(FONTS + "consolab.ttf", 21)
f_h1 = ImageFont.truetype(FONTS + "georgiab.ttf", 62)
f_role = ImageFont.truetype(FONTS + "segoeui.ttf", 25)
f_chip = ImageFont.truetype(FONTS + "segoeuib.ttf", 19)
f_foot = ImageFont.truetype(FONTS + "consola.ttf", 19)

PAD_X, PAD_TOP, PAD_BOTTOM = 84, 68, 56


def soft_glow(base, center, radius, color, alpha):
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    x, y = center
    d.ellipse([x - radius, y - radius, x + radius, y + radius], fill=(*color, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(radius / 2))
    base.alpha_composite(glow)


def rounded_chip(draw, xy, text, font):
    x, y = xy
    tw = draw.textlength(text, font=font)
    pad_x, pad_y = 20, 10
    box = [x, y, x + tw + pad_x * 2, y + 38 + 2]
    draw.rounded_rectangle(box, radius=999, fill=CHIP_BG, outline=CHIP_LINE, width=1)
    draw.text((x + pad_x, y + pad_y - 1), text, font=font, fill=INK)
    return box[2] + 12


def make_card(path, kicker, heading_lines, role_text, chips, edition_label):
    base = Image.new("RGBA", (W, H), (*PAPER, 255))
    soft_glow(base, (W - 120, 90), 340, BLUE, 34)
    soft_glow(base, (60, H - 40), 300, BLUE, 22)
    draw = ImageDraw.Draw(base)

    y = PAD_TOP
    draw.text((PAD_X, y), kicker.upper(), font=f_kicker, fill=BLUE)
    y += 44

    for line in heading_lines:
        draw.text((PAD_X, y), line, font=f_h1, fill=INK)
        y += 70

    y += 12
    wrapped = textwrap.wrap(role_text, width=56)
    for line in wrapped:
        draw.text((PAD_X, y), line, font=f_role, fill=MUTED)
        y += 34

    # Chip row + footer sit at fixed distance from the bottom.
    chip_y = H - PAD_BOTTOM - 38 - 56
    x = PAD_X
    for chip in chips:
        x = rounded_chip(draw, (x, chip_y), chip, f_chip)

    foot_y = H - PAD_BOTTOM - 20
    draw.text((PAD_X, foot_y), "Ravi Shankar Mitte \u00b7 Bangalore, India", font=f_foot, fill=MUTED)
    label_w = draw.textlength(edition_label, font=f_foot)
    draw.text((W - PAD_X - label_w, foot_y), edition_label, font=f_foot, fill=MUTED)

    base.convert("RGB").save(path, optimize=True)
    print("wrote", path, base.size)


make_card(
    "public/og-backend.png",
    "Senior Software Engineer \u00b7 Backend \u00b7 Samsung",
    ["Clear contracts.", "Reliable services."],
    "Java, Spring Boot, GraphQL, PostgreSQL and AWS \u2014 contracts that hold up in production.",
    ["Java / Spring Boot", "GraphQL \u00b7 PostgreSQL", "Microservices \u00b7 AWS", "AWS Certified"],
    "Backend edition",
)

make_card(
    "public/og-android.png",
    "Senior Software Engineer \u00b7 Android / Wear / XR \u00b7 Samsung",
    ["Connected devices.", "Reliable experiences."],
    "Android, Wear OS and Android XR \u2014 phone-to-device paths that hold up in production.",
    ["Kotlin / Android", "Wear OS \u00b7 Android XR", "Cross-device systems", "AWS Certified"],
    "Android edition",
)
