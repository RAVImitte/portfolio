import { featuredFor, site } from "../data/site";
import { edition } from "../data/editions";
import { HeroVideo } from "../components/HeroVideo";
import { IndexList } from "../components/IndexList";
import { useRole } from "../role/RoleContext";
import { InkLink } from "../components/InkLink";
import { ContentionDemo } from "../components/ContentionDemo";

export function Home() {
  const { role } = useRole();
  const copy = edition[role];
  const items = featuredFor(role).slice(0, 3);
  const primary = site.resumes[copy.cvPrimary];

  return (
    <main id="main" className="page home-page">
      <section className="decision-hero wrap" aria-labelledby="home-title">
        <div className="decision-intro">
          <p className="decision-role">{site.role} · {site.location}</p>
          <h1 id="home-title">{role === "backend" ? <>Backend engineering.<br /><em>Microservices. Distributed systems. Idempotency. Production scale.</em></> : <>Android engineering.<br /><em>ANRs to zero. Reliability to 98%.</em></>}</h1>
          <p className="decision-lede">{copy.heroIntro}</p>
          <p className="decision-now">{copy.heroNow}</p>
          <ul className="credibility-row" aria-label="Professional highlights">
            <li>Samsung</li>
            <li>3+ years</li>
            <li>{role === "backend" ? "Production platforms" : "Android · Wear · XR"}</li>
            <li>AWS certified</li>
          </ul>
          <div className="decision-actions">
            <a className="btn btn-solid" href="#work">Explore selected work</a>
            <a className="btn" href={primary.href}>{primary.label}</a>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="hero-portrait-glow" aria-hidden="true" />
          <HeroVideo />
          <div className="hero-plate">
            <p className="hero-plate-name">{site.name}</p>
            <p className="hero-plate-role">{site.role} · {site.company}</p>
            <p className="hero-plate-meta">{site.location} · Open to conversations</p>
            <ul className="hero-plate-links" aria-label="Contact and profiles">
              <li>
                <a href={`mailto:${site.email}`} aria-label="Email">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="M3 6h18v12H3z"/><path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="m3 6 9 7 9-7"/></svg>
                </a>
              </li>
              <li>
                <a href={site.links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8h4.5v14H.24V8Zm7.55 0h4.31v1.92h.06c.6-1.13 2.07-2.32 4.26-2.32 4.56 0 5.4 3 5.4 6.9V22h-4.5v-6.9c0-1.65-.03-3.78-2.3-3.78-2.3 0-2.65 1.8-2.65 3.66V22h-4.5V8Z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="work" className="selected-work wrap">
        <div className="index-head">
          <span>{copy.indexHead}</span>
          <span>Three projects / Contributions & decisions</span>
        </div>
        <IndexList items={items} />
        <InkLink to="/work" className="work-archive-link">Explore all six projects →</InkLink>
      </section>

      <div className="wrap">
        <ContentionDemo />
      </div>
    </main>
  );
}
