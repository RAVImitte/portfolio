import { useEffect, useRef } from "react";
import heroVideo from "../assets/hero.webm";

/**
 * Hero video avatar. The video shows a head turn from left to right; instead of
 * playing it in real time, the pointer's X position scrubs the timeline so the
 * avatar looks toward the cursor.
 *
 * Smoothness: rather than jumping directly to the target frame (which causes
 * jumpy seeking), the current time eases toward the target every frame — the
 * same lerp pattern used by the trailing ring in PointerCursor.
 *
 * Inert for coarse pointers and reduced-motion readers — they get a static
 * mid-frame (looking forward), which is the neutral resting position.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    // True if either the OS pref or the in-app MotionToggle asks for reduced motion.
    const motionReduced = () =>
      calm.matches || document.documentElement.dataset.motion === "reduce";

    // Normalised target (0..1) and the currently displayed position.
    let target = 0.5;
    let raf = 0;
    // Source is 30fps — quantize to that grid so we don't ask for sub-frame times.
    const FPS = 30;
    let lastFrame = -1;
    // Gate the next seek on the previous one actually painting a frame — otherwise
    // rAF-rate `currentTime` writes queue up faster than the VP9 alpha decoder can
    // render, and the user sees stalled frames instead of smooth scrubbing.
    let seekPending = false;

    const onMetadata = () => {
      if (video.duration) video.currentTime = video.duration / 2;
    };

    const onMove = (event: PointerEvent) => {
      target = Math.max(0, Math.min(1, event.clientX / window.innerWidth));
    };

    const onSeeked = () => { seekPending = false; };

    // Continuous ease toward the target so the head turn is smooth.
    const tick = () => {
      if (video.duration && !seekPending) {
        const targetTime = target * video.duration;
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.008) {
          const next = video.currentTime + diff * 0.25;
          const frame = Math.round(next * FPS);
          if (frame !== lastFrame) {
            lastFrame = frame;
            seekPending = true;
            video.currentTime = frame / FPS;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      target = 0.5;
      lastFrame = -1;
      if (video.duration) video.currentTime = video.duration / 2;
    };

    const attach = () => {
      if (fine.matches && !motionReduced()) start();
      else stop();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("seeked", onSeeked);
    attach();
    fine.addEventListener("change", attach);
    calm.addEventListener("change", attach);
    window.addEventListener("rm-motionchange", attach);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("seeked", onSeeked);
      stop();
      fine.removeEventListener("change", attach);
      calm.removeEventListener("change", attach);
      window.removeEventListener("rm-motionchange", attach);
    };
  }, []);

  return (
    <div className="hero-video">
      <video
        ref={videoRef}
        src={heroVideo}
        muted
        playsInline
        preload="auto"
        aria-label="Avatar of Ravi Mitte"
        aria-hidden="true"
      />
    </div>
  );
}

