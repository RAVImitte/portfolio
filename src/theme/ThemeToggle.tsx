import { useEffect, useState } from "react";
import { applyTheme, currentTheme, watchSystemTheme, type Theme } from "./theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(currentTheme());
    return watchSystemTheme((next) => {
      applyTheme(next, false);
      setTheme(next);
    });
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        applyTheme(next, true);
        setTheme(next);
      }}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb">
          <svg viewBox="0 0 24 24" className="theme-icon theme-icon--sun" focusable="false">
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
          </svg>
          <svg viewBox="0 0 24 24" className="theme-icon theme-icon--moon" focusable="false">
            <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
