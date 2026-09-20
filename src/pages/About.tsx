import { edition } from "../data/editions";
import { history, schoolHistory } from "../data/history";
import { site } from "../data/site";
import { Timeline } from "../components/Timeline";
import { useRole } from "../role/RoleContext";

export function About() {
  const { role } = useRole();
  const copy = edition[role];

  return (
    <main id="main" className="page secondary-page about-page">
      <section className="hero wrap secondary-hero about-intro">
        <div>
        <p className="kicker">{copy.aboutKicker}</p>
        <h1>Ravi Shankar Mitte</h1>
        <p className="lede">{copy.aboutLead}</p>
        <div className="about-story">
        {copy.aboutBody.map((p) => (
          <p key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
        </div>
        </div>
        <aside className="about-profile" aria-label="Professional details">
          <p className="kicker">At a glance</p>
          <dl>
            <div><dt>Role</dt><dd>{site.role}</dd></div>
            <div><dt>Based in</dt><dd>{site.location}</dd></div>
            <div><dt>Focus</dt><dd>{role === "backend" ? "Backend services & API design" : "Android & connected devices"}</dd></div>
          </dl>
          <a className="btn btn-solid" href={site.resumes[role].href}>{site.resumes[role].label} ↗</a>
          <a className="about-email" href={`mailto:${site.email}`}>{site.email}</a>
        </aside>
      </section>
      <section id="history" className="wrap about-section">
        <h2 className="section-title">Experience</h2>
        <Timeline entries={history} showFilters={false} showSkills={false} />
      </section>
      <section className="wrap about-section">
        <h2 className="section-title">Education & credentials</h2>
        <Timeline entries={schoolHistory} showFilters={false} showSkills={false} />
      </section>
      <section className="wrap about-section about-skills">
        <details open>
        <summary>Technical toolkit <span>Languages, platforms & tools</span></summary>
        {copy.skills.map((block) => (
          <div className="skill-block" key={block.label}>
            <h3>{block.label}</h3>
            <div className="stack">
              {block.items.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
        </details>
        <p className="about-public-work">Explore public projects on <a href={site.links.github}>GitHub ↗</a> and <a href={site.links.huggingface}>Hugging Face ↗</a>.</p>
      </section>
    </main>
  );
}
