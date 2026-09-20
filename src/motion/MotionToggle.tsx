import { useEffect, useState } from "react";

const KEY = "rm-motion";

function initialPreference() {
  try { return localStorage.getItem(KEY) === "reduce"; } catch { return false; }
}

export function MotionToggle() {
  const [reduced, setReduced] = useState(initialPreference);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
    window.dispatchEvent(new Event("rm-motionchange"));
    try { localStorage.setItem(KEY, reduced ? "reduce" : "full"); } catch { /* Optional. */ }
  }, [reduced]);
  return (
    <button
      type="button"
      className="theme-toggle motion-toggle"
      aria-pressed={reduced}
      aria-label={reduced ? "Motion on" : "Motion off"}
      onClick={() => setReduced((value) => !value)}
      title={reduced ? "Motion on" : "Motion off"}
    >
      <span className="theme-toggle-track motion-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb motion-toggle-thumb">
          <svg viewBox="0 0 24 24" className="motion-icon motion-icon--play" focusable="false">
            <path d="m9 6 9 6-9 6V6Z" />
          </svg>
          <svg viewBox="0 0 24 24" className="motion-icon motion-icon--pause" focusable="false">
            <path d="M8 6h3.5v12H8zm4.5 0H16v12h-3.5z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
