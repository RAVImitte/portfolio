export const EASE_REVEAL = "expo.out";
export const EASE_COVER = "power4.inOut";
export const DURATION_COVER_IN = 0.64;
export const DURATION_COVER_OUT = 0.72;
export const DURATION_REVEAL = 1.0;
export const DURATION_HERO = 1.35;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canHover(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
