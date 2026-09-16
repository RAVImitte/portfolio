import { edition } from "../data/editions";
import { record } from "../data/history";
import { site } from "../data/site";
import { Timeline } from "../components/Timeline";
import { useRole } from "../role/RoleContext";

export function About() {
  const { role } = useRole();
  const copy = edition[role];

  return (
    <main id="main" className="page">
      <section className="hero wrap">
        <p className="kicker">{copy.aboutKicker}</p>
        <h1 data-split>Ravi Shankar Mitte</h1>
        <div className="rule" style={{ margin: "1.2rem 0 1.4rem", maxWidth: "8rem" }} />
        <p className="lede">{copy.aboutLead}</p>
      </section>
      <section className="wrap prose" style={{ paddingBottom: "3rem" }}>
        {copy.aboutBody.map((p) => (
          <p key={p.slice(0, 24)} data-reveal>
            {p}
          </p>
        ))}
        <p data-reveal>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a>. Public work sits on{" "}
          <a href={site.links.github}>GitHub</a> and{" "}
          <a href={site.links.huggingface}>Hugging Face</a>.
        </p>
      </section>
      <section id="history" className="wrap" style={{ paddingBottom: "3rem" }}>
        <h2 className="section-title">History</h2>
        <Timeline entries={record} />
      </section>
      <section className="wrap" style={{ paddingBottom: "5rem" }}>
        <h2 className="section-title">Skills</h2>
        {copy.skills.map((block) => (
          <div className="skill-block" key={block.label} data-reveal>
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
      </section>
    </main>
  );
}
