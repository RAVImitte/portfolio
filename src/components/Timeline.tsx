import { useMemo, useState, type CSSProperties } from "react";
import type { TimelineEntry, TimelineKind } from "../data/history";
import { useRole } from "../role/RoleContext";
import { InkLink } from "./InkLink";

const filters: { id: "all" | TimelineKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "milestone", label: "Honors" },
];

const kindLabel: Record<TimelineKind, string> = {
  work: "Work",
  education: "Education",
  milestone: "Milestone",
};

export function Timeline({
  entries,
  showFilters = true,
  showSkills = true,
}: {
  entries: TimelineEntry[];
  showFilters?: boolean;
  showSkills?: boolean;
}) {
  const { role } = useRole();
  const [filter, setFilter] = useState<"all" | TimelineKind>("all");
  const visible = useMemo(() => {
    const resolved = entries.map((entry) => {
      const overlay = entry.editions?.[role];
      if (!overlay) return entry;
      return {
        ...entry,
        summary: overlay.summary ?? entry.summary,
        skills: overlay.skills ?? entry.skills,
        tracks: overlay.tracks ?? entry.tracks,
      };
    });
    if (filter === "all") return resolved;
    if (filter === "milestone") {
      return resolved.filter((e) => e.kind === "milestone" || (e.honors && e.honors.length > 0));
    }
    return resolved.filter((e) => e.kind === filter);
  }, [entries, filter, role]);

  return (
    <div className="tl">
      <div className="tl-toolbar">
        {showFilters ? (
          <div className="tl-filters" role="group" aria-label="History filters">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                className={filter === f.id ? "tl-filter is-on" : "tl-filter"}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="tl-legend" aria-hidden="true">
          <span className="tl-node is-now" />
          Now
          <span className="tl-node" />
          Past
        </div>
      </div>

      <ol className="tl-list">
        {visible.map((entry, i) => (
          <li
            className={`tl-item${entry.current ? " is-current" : ""}${i === visible.length - 1 ? " is-last" : ""}`}
            key={entry.id}
            data-reveal="fade-up"
            style={{ ["--reveal-i" as string]: Math.min(i, 4) } as CSSProperties}
          >
            <div className="tl-when">
              <span className="tl-year">{entry.current ? "Now" : entry.year}</span>
              <span className="tl-duration">{entry.duration}</span>
            </div>
            <div className="tl-rail" aria-hidden="true">
              <span className={entry.current ? "tl-node is-now" : "tl-node"} />
            </div>
            <article className="tl-card">
              <header className="tl-card-head">
                <div>
                  <span className={`tl-kind kind-${entry.kind}`}>{kindLabel[entry.kind]}</span>
                  {entry.current ? <span className="tl-live">Present</span> : null}
                  <h2>
                    {entry.org}
                    <span>{entry.title}</span>
                  </h2>
                </div>
                <p className="tl-meta">
                  <span>{entry.when}</span>
                  <span className="tl-dot" aria-hidden="true">
                    ·
                  </span>
                  <span>{entry.place}</span>
                </p>
              </header>
              {entry.summary ? (
                Array.isArray(entry.summary) ? (
                  entry.summary.map((line) => (
                    <p className="tl-summary" key={line.slice(0, 32)}>{line}</p>
                  ))
                ) : (
                  <p className="tl-summary">{entry.summary}</p>
                )
              ) : null}
              {showSkills && entry.skills?.length ? (
                <div className="stack">
                  {entry.skills.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              ) : null}
              {entry.tracks?.length ? (
                <ul className="tl-links">
                  {entry.tracks.map((track) => (
                    <li key={track.title}>
                      {track.href ? (
                        <InkLink to={track.href} className="tl-case">
                          {track.title} →
                        </InkLink>
                      ) : (
                        <span>{track.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              {entry.honors?.length ? (
                <div className="tl-honors">
                  <p className="kicker">Honors</p>
                  <ul>
                    {entry.honors.map((h) => (
                      <li key={h.title}>
                        <strong>{h.title}</strong>
                        <span> — {h.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
