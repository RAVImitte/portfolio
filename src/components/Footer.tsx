import { edition } from "../data/editions";
import { site } from "../data/site";
import { useRole } from "../role/RoleContext";
import { InkLink } from "./InkLink";

type ProfileIconKind = "github" | "linkedin" | "huggingface";

function ProfileIcon({ kind }: { kind: ProfileIconKind }) {
  if (kind === "github") {
    return (
      <span className="profile-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.5 9.5 0 0 1 2.5.34c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
      </span>
    );
  }

  if (kind === "linkedin") {
    return (
      <span className="profile-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M6.5 8.3H3.2V21h3.3V8.3ZM4.85 3A1.94 1.94 0 1 0 4.85 6.88 1.94 1.94 0 0 0 4.85 3ZM21 13.72c0-3.82-2.04-5.6-4.76-5.6-2.2 0-3.18 1.21-3.73 2.06V8.3H9.2V21h3.31v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H21v-7.28Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="profile-icon profile-icon--face" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="7.2" />
        <circle cx="9.3" cy="10.5" r=".9" />
        <circle cx="14.7" cy="10.5" r=".9" />
        <path d="M8.8 14.1c.9 1.15 1.95 1.7 3.2 1.7s2.3-.55 3.2-1.7" />
      </svg>
    </span>
  );
}

export function Footer() {
  const { role } = useRole();
  const copy = edition[role];
  const resume = site.resumes[copy.cvPrimary];

  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <p className="kicker">Start a conversation</p>
        <h2>Let's build something that holds up.</h2>
        <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>
      </div>
      <div className="col" aria-label="Profiles">
        <a className="ink-link profile-link" href={site.links.github} target="_blank" rel="noreferrer">
          <ProfileIcon kind="github" /><span>GitHub</span>
        </a>
        <a className="ink-link profile-link" href={site.links.linkedin} target="_blank" rel="noreferrer">
          <ProfileIcon kind="linkedin" /><span>LinkedIn</span>
        </a>
        <a className="ink-link profile-link" href={site.links.huggingface} target="_blank" rel="noreferrer">
          <ProfileIcon kind="huggingface" /><span>Hugging Face</span>
        </a>
      </div>
      <div className="col" aria-label="Portfolio links">
        <a className="ink-link" href={resume.href}>
          {resume.label}
        </a>
        <InkLink to="/about" className="ink-link">
          About
        </InkLink>
        <p className="footer-meta">{copy.footerLine} &middot; {site.location}<br />&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
