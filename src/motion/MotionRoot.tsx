import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

type GoOpts = { flipId?: string };
type MotionApi = { go: (to: string, opts?: GoOpts) => void };

const MotionCtx = createContext<MotionApi>({ go: () => undefined });

export function useMotion(): MotionApi {
  return useContext(MotionCtx);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const go = useCallback(
    (to: string) => {
      // React Router's own `viewTransition` option only applies to the data
      // routers, and `@view-transition` in CSS is cross-document only — so on
      // this BrowserRouter the transition has to be driven here. flushSync
      // makes React commit the new route inside the callback, which is what
      // gives the API something to snapshot against.
      const start = document.startViewTransition?.bind(document);
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduce";

      if (!start || calm) {
        navigate(to);
        return;
      }

      start(() => {
        flushSync(() => navigate(to));
        // Reset scroll inside the transition so the incoming snapshot is taken
        // at the top of the page rather than animating a scroll jump.
        if (!to.includes("#")) window.scrollTo(0, 0);
      });
    },
    [navigate],
  );

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--page-progress", `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <MotionCtx.Provider value={{ go }}>
      <div className="progress" aria-hidden="true" />
      {children}
    </MotionCtx.Provider>
  );
}
