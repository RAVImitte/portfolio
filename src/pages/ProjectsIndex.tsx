import { featuredFor } from "../data/site";
import { edition } from "../data/editions";
import { IndexList } from "../components/IndexList";
import { useRole } from "../role/RoleContext";

export function ProjectsIndex() {
  const { role } = useRole();
  const copy = edition[role];
  const items = featuredFor(role).filter((item) => item.to.startsWith("/projects/"));

  return (
    <main id="main" className="page">
      <section className="hero wrap">
        <p className="kicker">{copy.projectsKicker}</p>
        <h1 data-split>Projects</h1>
        <div className="rule" style={{ margin: "1.2rem 0 1.4rem", maxWidth: "8rem" }} />
        <p className="lede">{copy.projectsLede}</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "5rem" }}>
        <IndexList items={items} />
      </section>
    </main>
  );
}
