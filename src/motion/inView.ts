// Global scroll-in reveal for elements marked with `data-reveal="…"`.
// One IntersectionObserver + one MutationObserver watch the whole document;
// each element flips to `.is-in` when it enters view (once, then unobserved).
// Respects `prefers-reduced-motion` and the `data-motion="reduce"` root flag.

const SELECTOR = "[data-reveal]:not(.is-in)";

function reduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.dataset.motion === "reduce") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

function markAll(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => el.classList.add("is-in"));
}

let started = false;

export function startInViewReveals(): void {
  if (typeof window === "undefined" || started) return;
  started = true;

  if (reduceMotion()) {
    markAll(document);
    const mo = new MutationObserver(() => markAll(document));
    mo.observe(document.body, { subtree: true, childList: true });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );

  const scan = (root: ParentNode): void => {
    root.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => io.observe(el));
  };

  scan(document);
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      r.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        const el = n as Element;
        if (el.matches?.(SELECTOR)) io.observe(el as HTMLElement);
        scan(el);
      });
    }
  });
  mo.observe(document.body, { subtree: true, childList: true });
}
