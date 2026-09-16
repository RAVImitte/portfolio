import { useEffect, useMemo, useState, type MouseEvent } from "react";
import type { CaseStudy as Case, Metric } from "../data/types";
import type { Role } from "../data/role";
import { useRole } from "../role/RoleContext";
import { Diagram } from "./Diagram";
import { scrollToHash } from "../motion/smoothScroll";

type DiagramKind = "bff" | "fmm" | "etl" | "wear" | "pairing" | "notify" | "agent" | "mock";

function metricFocus(m: Metric, role: Role): boolean {
  if (!m.focus) return false;
  return typeof m.focus === "string" ? m.focus === role : m.focus.includes(role);
}

export function CaseStudy({
  data,
  diagrams,
}: {
  data: Case;
  diagrams: Partial<Record<"architecture" | "hard", DiagramKind[]>>;
}) {
  const { role } = useRole();
  const lens = data.lenses[role];
  const [active, setActive] = useState(data.chapters[0]?.id ?? "");

  const metrics = useMemo(() => {
    const ranked = data.metrics.map((m, i) => ({ m, i, hit: metricFocus(m, role) }));
    ranked.sort((a, b) => Number(b.hit) - Number(a.hit) || a.i - b.i);
    return ranked;
  }, [data.metrics, role]);

  const stack = useMemo(() => {
    const lead = new Set(lens.stackLead);
    const head = data.stack.filter((s) => lead.has(s));
    const tail = data.stack.filter((s) => !lead.has(s));
    return [...head, ...tail].map((name) => ({ name, lead: lead.has(name) }));
  }, [data.stack, lens.stackLead]);

  useEffect(() => {
    const nodes = data.chapters
      .map((c) => document.getElementById(c.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [data.chapters]);

  return (
    <article>
      <header className="case-hero wrap">
        <p className="kicker">{data.kicker}</p>
        <h1 data-split data-flip-id={data.flipId}>
          {data.title}
        </h1>
        <div className="rule" />
        <p className="case-dek">{lens.dek}</p>
        <aside className="case-frame">
          <p>{lens.frame}</p>
        </aside>
        <div className="case-meta">
          <span>{data.role}</span>
          <span>{data.timeframe}</span>
        </div>
      </header>

      <div className="wrap case-layout">
        <nav className="spy" aria-label="On this page">
          {data.chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={active === c.id ? "is-active" : ""}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                scrollToHash(c.id);
              }}
            >
              {c.label}
            </a>
          ))}
        </nav>

        <div className="prose">
          <h2 id="problem">Problem</h2>
          {data.problem.map((p, i) => (
            <p key={p.slice(0, 24)} data-reveal>
              {i === 0 ? <span className="drop">{p[0]}</span> : null}
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}

          <h2 id="constraints">Constraints</h2>
          <ul>
            {data.constraints.map((c) => (
              <li key={c.slice(0, 32)} data-reveal>
                {c}
              </li>
            ))}
          </ul>

          <h2 id="built">What I built</h2>
          {data.built.map((c) => (
            <p key={c.slice(0, 32)} data-reveal>
              {c}
            </p>
          ))}

          <h2 id="architecture">Architecture</h2>
          {(diagrams.architecture ?? []).map((k) => (
            <Diagram key={k} kind={k} />
          ))}

          <h2 id="hard">Hard parts</h2>
          {data.hardParts.map((part) => (
            <section key={part.title} data-reveal>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.45rem", margin: "1.6rem 0 0.6rem" }}>
                {part.title}
              </h3>
              {part.body.map((p) => (
                <p key={p.slice(0, 28)}>{p}</p>
              ))}
            </section>
          ))}
          {(diagrams.hard ?? []).map((k) => (
            <Diagram key={k} kind={k} />
          ))}

          <h2 id="outcomes">Outcomes</h2>
          <div className="metrics" data-reveal>
            {metrics.map(({ m, hit }) => (
              <div className={hit ? "metric is-focus" : "metric"} key={m.label}>
                <div
                  className="num"
                  data-count={m.numeric ?? undefined}
                  data-suffix={m.suffix}
                  data-prefix={m.prefix}
                >
                  {m.value}
                </div>
                <div className="label">{m.label}</div>
              </div>
            ))}
          </div>
          {data.outcomes.map((p) => (
            <p key={p.slice(0, 28)} data-reveal>
              {p}
            </p>
          ))}

          <h2>Stack</h2>
          <div className="stack" data-reveal>
            {stack.map((s) => (
              <span className={s.lead ? "chip is-lead" : "chip"} key={s.name}>
                {s.name}
              </span>
            ))}
          </div>

          {data.note ? <p className="note">{data.note}</p> : null}

          {data.sources?.length ? (
            <div className="sources">
              <p className="kicker">Source / live</p>
              {data.sources.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
