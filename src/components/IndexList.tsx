import type { CaseIndexItem } from "../data/site";
import type { CSSProperties } from "react";
import { InkLink } from "./InkLink";
import { projectBriefs } from "../data/projectBriefs";
import { SignatureDiagram } from "./SignatureDiagram";

const FULL_WIDTH = "Find My Mobile";

/**
 * Works out which cards span the full row, by walking the two-column flow
 * rather than guessing from :nth-child. A card goes wide when it is the lead
 * project, or when it would otherwise be left sitting alone on the last row —
 * which is edition-dependent, so it cannot be expressed as a static selector.
 */
function wideCards(items: CaseIndexItem[]): Set<number> {
  const wide = new Set<number>();
  let column = 0;
  items.forEach((item, i) => {
    if (item.title === FULL_WIDTH) {
      wide.add(i);
      column = 0;
      return;
    }
    if (i === items.length - 1 && column === 0) wide.add(i);
    column = (column + 1) % 2;
  });
  return wide;
}

export function IndexList({ items }: { items: CaseIndexItem[] }) {
  const wide = wideCards(items);
  return (
    <ol className="index-list">
      {items.map((item, i) => {
        const brief = projectBriefs[item.to.split("/").pop() ?? ""];
        const slug = item.to.split("/").pop();
        return (
          <li
            key={item.to}
            className={`project-item project-item--${slug}${wide.has(i) ? " is-wide" : ""}`}
            data-reveal="fade-up"
            style={{ ["--reveal-i" as string]: Math.min(i, 4) } as CSSProperties}
          >
            <InkLink to={item.to} className={item.lead ? "index-row is-lead" : "index-row"} flipId={item.flipId}>
              <span className="no">{item.no}</span>
              <span>
                <span className="kicker">{brief?.status ?? item.kicker}</span>
                <h2 data-flip-id={item.flipId}>{item.title}</h2>
                <span className="dek">{brief?.contribution ?? item.dek}</span>
                {brief && <span className="project-result">{brief.result}</span>}
              </span>
              <span className="arrow" aria-hidden="true">
                Read case ↗
              </span>
            </InkLink>
            {<SignatureDiagram title={item.title} />}
          </li>
        );
      })}
    </ol>
  );
}
