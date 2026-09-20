import { useEffect, type RefObject } from "react";

/**
 * Publishes the pointer's position within `ref` as two normalised custom
 * properties (--px / --py, each -1..1). CSS decides what to do with them, so
 * the depth treatment can be changed or removed without touching this file.
 *
 * Deliberately inert for coarse pointers and reduced-motion users. They get
 * the static composition, which is the one the page's argument depends on.
 */
export function useParallaxField(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let active = false;

    const write = (x: number, y: number) => {
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
    };

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        if (!box.width || !box.height) return;
        write(
          Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1)),
          Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1)),
        );
      });
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      write(0, 0);
    };

    const attach = () => {
      const wanted = fine.matches && !calm.matches;
      if (wanted === active) return;
      active = wanted;
      if (wanted) {
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
      } else {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        onLeave();
      }
    };

    attach();
    fine.addEventListener("change", attach);
    calm.addEventListener("change", attach);

    return () => {
      fine.removeEventListener("change", attach);
      calm.removeEventListener("change", attach);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
