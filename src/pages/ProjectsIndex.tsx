import { featuredFor } from "../data/site";
import { edition } from "../data/editions";
import { IndexList } from "../components/IndexList";
import { useRole } from "../role/RoleContext";

export function ProjectsIndex({ all = false }: { all?: boolean }) {
  const { role } = useRole();
  const copy = edition[role];
  const items = featuredFor(role).filter((item) => all || item.to.startsWith("/projects/"));

  return (
    <main id="main" className="page secondary-page projects-page">
      <section className="hero wrap secondary-hero">
        <p className="kicker">{all ? "Project archive" : copy.projectsKicker}</p>
        <h1>{all ? "Work & experiments" : "Independent systems"}</h1>
        <div className="rule" data-reveal="rule" style={{ margin: "1.2rem 0 1.4rem", maxWidth: "8rem" }} />
        <p className="lede">{all ? "Backend platforms, connected devices and independent products. Each case explains the contribution, constraints and tradeoffs." : copy.projectsLede}</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "5rem" }}>
        <IndexList items={items} />
      </section>
    </main>
  );
}
