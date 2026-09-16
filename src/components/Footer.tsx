import { edition } from "../data/editions";
import { site } from "../data/site";
import { useRole } from "../role/RoleContext";
import { InkLink } from "./InkLink";

export function Footer() {
  const { role } = useRole();
  const copy = edition[role];
  const resume = site.resumes[copy.cvPrimary];

  return (
    <footer className="site-footer">
      <div>
        <h2>Ravi Shankar Mitte</h2>
        <p>
          {copy.footerLine}
          <br />
          {site.location}
        </p>
      </div>
      <div className="col">
        <a className="ink-link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <a className="ink-link" href={site.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="ink-link" href={site.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="ink-link" href={site.links.huggingface} target="_blank" rel="noreferrer">
          Hugging Face
        </a>
      </div>
      <div className="col">
        <a className="ink-link" href={resume.href}>
          Resume
        </a>
        <InkLink to="/about" className="ink-link">
          About
        </InkLink>
        <p style={{ color: "var(--muted)", marginTop: "0.6rem" }}>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
