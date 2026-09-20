/**
 * Light / dark theme.
 *
 * `data-theme` on <html> is the single source of truth and is set before first
 * paint by an inline script in index.html, so there is no flash of the wrong
 * theme. Everything here only has to keep that attribute up to date.
 *
 * A persisted user choice always wins. Otherwise the site follows the user's
 * OS `prefers-color-scheme` preference and reacts if that preference changes
 * while the tab is open.
 */
export type Theme = "light" | "dark";

const KEY = "rm-theme";

function systemTheme(): Theme {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function defaultTheme(): Theme {
  return systemTheme();
}

export function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return storedTheme() ?? defaultTheme();
}

/** Applies the theme. `persist` marks it as a deliberate choice. */
export function applyTheme(theme: Theme, persist: boolean) {
  document.documentElement.dataset.theme = theme;
  if (!persist) return;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage blocked — the attribute is still correct for this visit */
  }
}

/**
 * Follow OS-level theme changes while the tab is open, but only when the user
 * has not made a deliberate choice yet. Returns a cleanup function.
 */
export function watchSystemTheme(onChange: (theme: Theme) => void): () => void {
  let mq: MediaQueryList;
  try {
    mq = window.matchMedia("(prefers-color-scheme: dark)");
  } catch {
    return () => {};
  }
  const handler = (event: MediaQueryListEvent) => {
    if (storedTheme() !== null) return;
    onChange(event.matches ? "dark" : "light");
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}
