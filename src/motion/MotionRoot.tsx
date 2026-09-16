import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  DURATION_COVER_IN,
  DURATION_COVER_OUT,
  EASE_COVER,
  prefersReducedMotion,
} from "./tokens";
import { initSmoothScroll, scrollToTop, getLenis, refreshScroll } from "./smoothScroll";
import { playPageEnter, teardownPageMotion } from "./reveals";
import { initPointerField } from "./pointerField";
import { pageTitle, transitionDir } from "../data/site";
import { pathOnly } from "../data/role";

type GoOpts = { flipId?: string };

type MotionApi = {
  go: (to: string, opts?: GoOpts) => void;
};

const MotionCtx = createContext<MotionApi>({ go: () => undefined });

export function useMotion(): MotionApi {
  return useContext(MotionCtx);
}

function setTransitioning(on: boolean): void {
  document.documentElement.classList.toggle("is-transitioning", on);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const coverRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const fibersRef = useRef<HTMLCanvasElement>(null);
  const nibRef = useRef<HTMLDivElement>(null);
  const marksRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef(location.pathname);
  const bootstrapped = useRef(false);
  const busy = useRef(false);
  const dirRef = useRef<1 | -1>(1);
  const coverTl = useRef<gsap.core.Timeline | null>(null);

  const parkLayers = useCallback((dir: 1 | -1) => {
    const from = dir * 100;
    gsap.set([inkRef.current, paperRef.current], { yPercent: from, force3D: true });
    gsap.set(titleRef.current, { y: 28, opacity: 0 });
    gsap.set(ruleRef.current, { scaleX: 0 });
  }, []);

  const playCoverIn = useCallback(
    (dir: 1 | -1, label: string) => {
      const cover = coverRef.current;
      const ink = inkRef.current;
      const paper = paperRef.current;
      if (!cover || !ink || !paper) return Promise.resolve();

      coverTl.current?.kill();
      if (titleRef.current) titleRef.current.textContent = label;
      dirRef.current = dir;
      cover.classList.add("is-on");
      cover.classList.toggle("from-top", dir < 0);
      parkLayers(dir);

      const tl = gsap.timeline({ defaults: { ease: EASE_COVER } });
      coverTl.current = tl;
      tl.to(ink, { yPercent: 0, duration: DURATION_COVER_IN }, 0);
      tl.to(paper, { yPercent: 0, duration: DURATION_COVER_IN }, 0.09);
      tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "expo.out" }, 0.28);
      tl.to(ruleRef.current, { scaleX: 1, duration: 0.45, ease: "expo.out" }, 0.34);
      return tl.then();
    },
    [parkLayers],
  );

  const playCoverOut = useCallback(() => {
    const cover = coverRef.current;
    const ink = inkRef.current;
    const paper = paperRef.current;
    if (!cover || !ink || !paper) return Promise.resolve();

    coverTl.current?.kill();
    const dest = dirRef.current * -100;
    const tl = gsap.timeline({
      defaults: { ease: EASE_COVER },
      onComplete: () => {
        cover.classList.remove("is-on", "from-top");
        parkLayers(1);
      },
    });
    coverTl.current = tl;
    tl.to(titleRef.current, { y: -22, opacity: 0, duration: 0.22, ease: "power2.in" }, 0);
    tl.to(ruleRef.current, { scaleX: 0, duration: 0.2, ease: "power2.in" }, 0);
    tl.to(ink, { yPercent: dest, duration: DURATION_COVER_OUT }, 0.04);
    tl.to(paper, { yPercent: dest, duration: DURATION_COVER_OUT }, 0.12);
    return tl.then();
  }, [parkLayers]);

  useEffect(() => {
    const stopScroll = initSmoothScroll(scrollerRef.current, pageRef.current);
    const stopPointer =
      fibersRef.current && nibRef.current && marksRef.current
        ? initPointerField(fibersRef.current, nibRef.current, marksRef.current)
        : () => undefined;
    parkLayers(1);
    return () => {
      stopScroll();
      stopPointer();
      coverTl.current?.kill();
    };
  }, [parkLayers]);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const update = () => {
      const scroller = scrollerRef.current;
      const lenis = getLenis();
      if (lenis && lenis.limit) {
        bar.style.width = `${(lenis.scroll / lenis.limit) * 100}%`;
        return;
      }
      const max = (scroller?.scrollHeight ?? document.documentElement.scrollHeight) - window.innerHeight;
      const y = scroller?.scrollTop ?? window.scrollY;
      bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    };
    const lenis = getLenis();
    if (lenis) lenis.on("scroll", update);
    scrollerRef.current?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  const go = useCallback(
    (to: string) => {
      const path = pathOnly(to);
      if (busy.current) return;
      if (path === location.pathname) return;
      if (prefersReducedMotion() || !coverRef.current) {
        navigate(to);
        return;
      }
      busy.current = true;
      setTransitioning(true);
      const dir = transitionDir(location.pathname, path);
      void playCoverIn(dir, pageTitle(path)).then(() => navigate(to));
    },
    [location.pathname, navigate, playCoverIn],
  );

  useEffect(() => {
    const page = pageRef.current;
    const pathChanged = pathRef.current !== location.pathname;
    pathRef.current = location.pathname;
    const covered = coverRef.current?.classList.contains("is-on") ?? false;

    const run = async () => {
      scrollToTop(true);
      refreshScroll();
      const entering = page ? playPageEnter(page) : Promise.resolve();
      if (covered && !prefersReducedMotion()) {
        await new Promise((r) => window.setTimeout(r, 90));
        await playCoverOut();
      }
      busy.current = false;
      setTransitioning(false);
      await entering;
      refreshScroll();
    };

    if (!bootstrapped.current) {
      bootstrapped.current = true;
      void run();
      return () => teardownPageMotion();
    }

    if (!pathChanged) {
      void (page && playPageEnter(page));
      return () => teardownPageMotion();
    }

    void run();
    return () => teardownPageMotion();
  }, [location.pathname, playCoverOut]);

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(location.hash.slice(1));
        el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      });
    }
  }, [location.hash]);

  return (
    <MotionCtx.Provider value={{ go }}>
      <div className="progress" ref={progressRef} />
      <div className="atm" aria-hidden="true">
        <canvas className="atm-field" ref={fibersRef} />
      </div>
      <div className="nib" ref={nibRef} aria-hidden="true" />
      <div className="nib-marks" ref={marksRef} aria-hidden="true" />
      <div className="cover" ref={coverRef} aria-hidden="true">
        <div className="cover-ink" ref={inkRef} />
        <div className="cover-paper" ref={paperRef}>
          <p className="cover-kicker">Ravi Mitte</p>
          <p className="cover-title" ref={titleRef}>
            Index
          </p>
          <span className="cover-rule" ref={ruleRef} />
        </div>
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-root" ref={scrollerRef}>
        <div className="scroll-content" ref={pageRef}>
          {children}
        </div>
      </div>
    </MotionCtx.Provider>
  );
}
