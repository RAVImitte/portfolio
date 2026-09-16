import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../data/site";
import { stripEdition } from "../data/role";
import { useRole } from "../role/RoleContext";
import { InkLink } from "./InkLink";

export function Header() {
  const { pathname } = useLocation();
  const { role } = useRole();
  const [open, setOpen] = useState(false);
  const resume = site.resumes[role];
  const inner = stripEdition(pathname);
  const onHome = inner === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <InkLink to="/" className="brand">
        <img src="https://avatars.githubusercontent.com/u/53873101?v=4" alt="" width={28} height={28} />
        <span>Ravi Mitte</span>
      </InkLink>
      <button className="nav-toggle" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "nav is-open" : "nav"} aria-label="Primary">
        {site.nav.map((item) => (
          <InkLink
            key={item.to}
            to={item.to}
            className={inner === item.to || (item.to !== "/" && inner.startsWith(item.to)) ? "is-active" : ""}
          >
            {item.label}
          </InkLink>
        ))}
        {onHome ? null : (
          <div className="nav-cvs">
            <a className="btn btn-solid" href={resume.href} data-magnetic>
              Resume
            </a>
          </div>
        )}
      </nav>
      {onHome ? null : (
        <div className="header-cta">
          <a className="btn btn-solid" href={resume.href} data-magnetic>
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
