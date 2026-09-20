import { useEffect } from "react";

/**
 * Pointer treatment: a precise dot that tracks exactly, and a ring that trails
 * with easing. The ring widens over anything interactive, contracts on press,
 * and stretches slightly in the direction of travel.
 *
 * Note: docs/design-reassessment.md rejected cursor effects. That was overruled
 * deliberately — see the session feedback. It is kept honest by the guards:
 * it only engages for fine pointers with motion allowed, and the native cursor
 * is only hidden once this component is actually running, so a JS failure can
 * never leave someone without a pointer.
 */
const INTERACTIVE = 'a, button, summary, [role="button"], input, select, textarea, label';

export function PointerCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let dot: HTMLElement | null = null;
    let ring: HTMLElement | null = null;
    let frame = 0;
    let running = false;

    // Target (exact pointer) vs rendered ring position, eased each frame.
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;

    const render = () => {
      const dx = tx - rx;
      const dy = ty - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;

      // Stretch along the direction of travel, capped so it stays a ring.
      const speed = Math.min(Math.hypot(dx, dy), 60);
      const stretch = 1 + speed / 190;
      const angle = speed > 1 ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;

      if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      if (ring) {
        ring.style.transform =
          `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) ` +
          `rotate(${angle}deg) scale(${stretch}, ${1 / stretch})`;
      }
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      document.documentElement.classList.remove("cursor-idle");
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const hot = !!target?.closest?.(INTERACTIVE);
      document.documentElement.classList.toggle("cursor-hot", hot);
    };
    const onDown = () => document.documentElement.classList.add("cursor-down");
    const onUp = () => document.documentElement.classList.remove("cursor-down");
    const onLeave = () => document.documentElement.classList.add("cursor-idle");

    const start = () => {
      if (running) return;
      running = true;

      dot = document.createElement("div");
      dot.className = "cursor-dot";
      dot.setAttribute("aria-hidden", "true");
      ring = document.createElement("div");
      ring.className = "cursor-ring";
      ring.setAttribute("aria-hidden", "true");
      document.body.append(dot, ring);

      // Only now is it safe to hide the native cursor.
      document.documentElement.classList.add("has-custom-cursor", "cursor-idle");

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      window.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      dot?.remove();
      ring?.remove();
      dot = null;
      ring = null;
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "cursor-hot",
        "cursor-down",
        "cursor-idle",
      );
    };

    const sync = () => {
      if (fine.matches && !calm.matches) start();
      else stop();
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
