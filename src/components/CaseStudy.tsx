import { useEffect, useMemo, useRef, useState } from "react";
import type { CaseStudy as Case, Metric } from "../data/types";
import type { Role } from "../data/role";
import { useRole } from "../role/RoleContext";
import { Diagram } from "./Diagram";
import { InkLink } from "./InkLink";
import { projectBriefs } from "../data/projectBriefs";import { CaseHeroArt } from "./CaseHeroArt";
type DiagramKind = "bff" | "fmm" | "etl" | "wear" | "pairing" | "notify" | "agent" | "mock";

function metricFocus(m: Metric, role: Role): boolean {
  if (!m.focus) return false;
  return typeof m.focus === "string" ? m.focus === role : m.focus.includes(role);
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

function AnimatedMetricNumber({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasNumeric = typeof metric.numeric === "number";
  const prefix = metric.prefix ?? "";
  const suffix = metric.suffix ?? "";
  const [display, setDisplay] = useState<string>(() =>
    hasNumeric && !prefersReducedMotion() ? `${prefix}0${suffix}` : metric.value,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasNumeric || prefersReducedMotion()) {
      setDisplay(metric.value);
      return;
    }
    const target = metric.numeric as number;
    let raf = 0;
    let started = false;

    const run = () => {
      const duration = 1200;
      const startedAt = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const n = target * eased;
        if (t < 1) {
          setDisplay(`${prefix}${Math.round(n)}${suffix}`);
          raf = requestAnimationFrame(step);
        } else {
          // Land exactly on the original string so formatting quirks (e.g. "10K", "20+") match.
          setDisplay(metric.value);
        }
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [metric, hasNumeric, prefix, suffix]);

  return (
    <div className="num" ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </div>
  );
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
  const brief = projectBriefs[data.slug];
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
    document.title = `${data.title} — Ravi Mitte`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", `${data.title}: ${lens.dek}`);
  }, [data.title, lens.dek]);

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
    <article className="case-page secondary-page">
      <header className="case-hero wrap">
        <InkLink className="case-back" to="/">← Selected work</InkLink>
        <div className="case-hero-grid">
          <div className="case-hero-body">
            <p className="kicker">{data.kicker}</p>
            <h1 data-flip-id={data.flipId}>
              {data.title}
            </h1>
            <div className="rule" data-reveal="rule" />
            <p className="case-dek">{lens.dek}</p>
            <aside className="case-frame">
              <p>{lens.frame}</p>
            </aside>
            <div className="case-meta">
              <span>{data.role}</span>
              <span>{data.timeframe}</span>
            </div>
          </div>
          <CaseHeroArt slug={data.slug} />
        </div>
        {brief && <section className="case-summary" aria-label="Project summary">
          <p className="kicker">{brief.status}</p>
          <dl>
            <div><dt>Problem</dt><dd>{brief.problem}</dd></div>
            <div><dt>My contribution</dt><dd>{brief.contribution}</dd></div>
            <div><dt>Result & scope</dt><dd>{brief.result}</dd></div>
          </dl>
        </section>}
      </header>

      <div className="wrap case-layout">
        <nav className="spy" aria-label="On this page">
          {data.chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={active === c.id ? "is-active" : ""}
            >
              {c.label}
            </a>
          ))}
        </nav>

        <div className="prose">
          <h2 id="problem">Problem</h2>
          {data.problem.map((p, i) => (
            <p key={p.slice(0, 24)}>
              {i === 0 ? <span className="drop">{p[0]}</span> : null}
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}

          <h2 id="constraints">Constraints</h2>
          <ul>
            {data.constraints.map((c) => (
              <li key={c.slice(0, 32)}>
                {c}
              </li>
            ))}
          </ul>

          <h2 id="built">What I built</h2>
          {data.built.map((c) => (
            <p key={c.slice(0, 32)}>
              {c}
            </p>
          ))}

          <h2 id="architecture">Architecture</h2>
          {(diagrams.architecture ?? []).map((k) => (
            <Diagram key={k} kind={k} />
          ))}

          <h2 id="hard">Challenges</h2>
          {data.hardParts.map((part) => (
            <section key={part.title}>
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
          <p className="evidence-note">Figures below come from the project account. Measurement limitations are attached to each figure.</p>
          <div className="metrics">
            {metrics.map(({ m, hit }) => (
              <div className={hit ? "metric is-focus" : "metric"} key={m.label}>
                <AnimatedMetricNumber metric={m} />
                <div className="label">{m.label}</div>
                <details className="metric-evidence">
                  <summary>Source & scope</summary>
                  <p>{data.slug === "zero-miles" && m.value === "75%"
                    ? "Architecture-derived pairing round-trip comparison, not a production benchmark. The supplied account does not include a reproducible measurement or observation period."
                    : data.slug === "wearable-intelligence"
                    ? "Reported proof-of-concept result. Hardware, evaluation dataset and measurement period are not supplied; this is not a production outcome."
                    : data.slug === "living-labs" || data.slug === "find-my-mobile"
                    ? "Reported in the supplied employment project account. Measurement logs, population and observation period are not included here; the figure has not been independently verified."
                    : "Reported in the supplied project account. Inventory and implementation figures are not measures of adoption or production performance. No independent verification is included here."}</p>
                  {data.sources?.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label}</a>)}
                </details>
              </div>
            ))}
          </div>
          {(() => {
            const recognitions: string[] = [];
            const plainOutcomes: string[] = [];
            data.outcomes.forEach((p) => {
              const match = /^Recognition:\s*(.+)$/i.exec(p);
              if (match) recognitions.push(match[1]);
              else plainOutcomes.push(p);
            });
            return (
              <>
                {plainOutcomes.map((p) => (
                  <p key={p.slice(0, 28)}>{p}</p>
                ))}
                {recognitions.length > 0 && (
                  <aside className="case-recognition" aria-label="Recognition" data-reveal="fade-up">
                    <span className="case-recognition-badge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2l2.6 5.9 6.4.8-4.7 4.5 1.2 6.4L12 16.9 6.5 19.6l1.2-6.4L3 8.7l6.4-.8L12 2z"/></svg>
                    </span>
                    <div>
                      <p className="case-recognition-label">Recognition{recognitions.length > 1 ? "s" : ""}</p>
                      {recognitions.map((r) => (
                        <p key={r} className="case-recognition-text">{r}</p>
                      ))}
                    </div>
                  </aside>
                )}
              </>
            );
          })()}

          <h2 id="stack">Stack</h2>
          <div className="stack">
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
