import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import { stripEdition } from "../data/role";
import { useRole } from "../role/RoleContext";
import { InkLink } from "./InkLink";
import { ThemeToggle } from "../theme/ThemeToggle";
import { MotionToggle } from "../motion/MotionToggle";

export function Header() {
  const { pathname } = useLocation();
  const { role } = useRole();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resume = site.resumes[role];
  const inner = stripEdition(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const nav = document.getElementById("primary-navigation");
    const focusable = nav?.querySelectorAll<HTMLElement>("a, button");
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <InkLink to="/" className="brand">
        <span className="brand-mark" aria-hidden="true">RM</span>
        <span>Ravi Mitte</span>
      </InkLink>
      <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="primary-navigation" className={open ? "nav is-open" : "nav"} aria-label="Primary">
        {site.nav.map((item) => (
          <InkLink
            key={item.to}
            to={item.to}
            className={inner === item.to || (item.to !== "/" && inner.startsWith(item.to)) ? "is-active" : ""}
          >
            {item.label}
          </InkLink>
        ))}
        <a className="nav-contact" href={`mailto:${site.email}`}>Contact</a>
        <div className="nav-cvs">
          <a className="btn btn-solid" href={resume.href}>
            Resume
          </a>
        </div>
      </nav>
      <div className="header-cta">
        <MotionToggle />
        <ThemeToggle />
        <a className="btn btn-solid" href={resume.href}>
          Resume
        </a>
      </div>
    </header>
  );
}
