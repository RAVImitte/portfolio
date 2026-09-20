import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DURATION_HERO, DURATION_REVEAL, EASE_REVEAL, prefersReducedMotion } from "./tokens";
import { refreshScroll } from "./smoothScroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

const splits: SplitText[] = [];
const triggers: ScrollTrigger[] = [];

function killPageMotion(): void {
  splits.splice(0).forEach((s) => {
    try {
      s.revert();
    } catch {
      /* already gone */
    }
  });
  triggers.splice(0).forEach((t) => t.kill());
}

export async function playPageEnter(root: HTMLElement): Promise<void> {
  killPageMotion();
  if (prefersReducedMotion()) {
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-in"));
    root.querySelectorAll<HTMLElement>(".rule").forEach((el) => el.classList.add("is-on"));
    return;
  }

  await document.fonts.ready.catch(() => undefined);

  const hero = root.querySelector<HTMLElement>("[data-split]");
  if (hero) {
    const split = new SplitText(hero, { type: "chars,words", charsClass: "char" });
    splits.push(split);
    gsap.set(split.chars, { yPercent: 110, opacity: 0 });
    gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      duration: DURATION_HERO,
      ease: EASE_REVEAL,
      stagger: 0.028,
      overwrite: true,
    });
  }

  const rule = root.querySelector<HTMLElement>(".hero .rule, .case-hero .rule");
  if (rule) {
    gsap.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: EASE_REVEAL, delay: 0.15 });
  }

  const viewport = root.closest(".scroll-root") ?? window;
  const viewHeight = viewport instanceof HTMLElement ? viewport.clientHeight : window.innerHeight;

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    const inView = top < viewHeight * 0.92;
    const tween = gsap.fromTo(
      el,
      { y: 22, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION_REVEAL,
        ease: EASE_REVEAL,
        delay: inView ? 0.08 + i * 0.05 : 0,
        overwrite: true,
        scrollTrigger: inView
          ? undefined
          : {
              trigger: el,
              start: "top 88%",
              once: true,
              onEnter: () => el.classList.add("is-in"),
            },
        onStart: () => el.classList.add("is-in"),
      },
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    if (Number.isNaN(end)) return;
    const suffix = el.dataset.suffix ?? "";
    const prefix = el.dataset.prefix ?? "";
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: end,
      duration: 1.4,
      ease: EASE_REVEAL,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  root.querySelectorAll<SVGGeometryElement>("[data-draw]").forEach((el) => {
    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    const tween = gsap.to(el, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: EASE_REVEAL,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  ScrollTrigger.refresh();
  refreshScroll();
}

export function teardownPageMotion(): void {
  killPageMotion();
}
