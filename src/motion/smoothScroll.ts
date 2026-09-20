import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./tokens";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let wrapperEl: HTMLElement | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function refreshScroll(): void {
  lenis?.resize();
  ScrollTrigger.refresh();
}

export function initSmoothScroll(wrapper?: HTMLElement | null, content?: HTMLElement | null): () => void {
  if (prefersReducedMotion()) {
    ScrollTrigger.normalizeScroll(false);
    return () => undefined;
  }

  wrapperEl = wrapper ?? null;

  lenis = new Lenis({
    wrapper: wrapper ?? window,
    content: content ?? wrapper ?? document.documentElement,
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    autoResize: true,
    autoRaf: false,
    naiveDimensions: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  if (wrapper) {
    ScrollTrigger.defaults({ scroller: wrapper });
  }

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  const onResize = () => refreshScroll();
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    if (tickerFn) gsap.ticker.remove(tickerFn);
    tickerFn = null;
    ScrollTrigger.defaults({ scroller: window });
    lenis?.destroy();
    lenis = null;
    wrapperEl = null;
  };
}

export function scrollToTop(immediate = false): void {
  if (lenis) {
    lenis.scrollTo(0, {
      immediate: immediate || prefersReducedMotion(),
      force: true,
    });
  }
  if (wrapperEl) wrapperEl.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function scrollToHash(hash: string): void {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -88, duration: 1, force: true });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}
