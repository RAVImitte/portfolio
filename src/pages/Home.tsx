import { featuredFor, site } from "../data/site";
import { edition } from "../data/editions";
import { IndexList } from "../components/IndexList";
import { useRole } from "../role/RoleContext";

export function Home() {
  const { role } = useRole();
  const copy = edition[role];
  const items = featuredFor(role);
  const primary = site.resumes[copy.cvPrimary];

  return (
    <main id="main" className="page">
      <section className="hero wrap">
        <p className="kicker">{copy.kicker}</p>
        <div className="hero-grid">
          <div>
            <h1 data-split>Ravi Shankar Mitte</h1>
            <div className="rule" style={{ margin: "1.2rem 0 1.4rem", maxWidth: "8rem" }} />
            <p className="lede">{copy.lede}</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href={`mailto:${site.email}`} data-magnetic>
                Email
              </a>
              <a className="btn" href={primary.href} data-magnetic>
                Resume
              </a>
            </div>
          </div>
          <div className="hero-meta">
            {copy.meta.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="wrap" style={{ paddingBottom: "5rem" }}>
        <div className="index-head">
          <span>{copy.indexHead}</span>
          <span>{copy.indexSub}</span>
        </div>
        <IndexList items={items} />
      </section>
    </main>
  );
}
