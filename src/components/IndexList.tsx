import type { CaseIndexItem } from "../data/site";
import { InkLink } from "./InkLink";

export function IndexList({ items }: { items: CaseIndexItem[] }) {
  return (
    <ol className="index-list">
      {items.map((item) => (
        <li key={item.to} data-reveal>
          <InkLink to={item.to} className={item.lead ? "index-row is-lead" : "index-row"} flipId={item.flipId}>
            <span className="no">{item.no}</span>
            <span>
              <span className="kicker">
                {item.kicker}
                {item.lead ? <span className="lead-mark">Lead</span> : null}
              </span>
              <h2 data-flip-id={item.flipId}>{item.title}</h2>
              <span className="dek">{item.dek}</span>
            </span>
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </InkLink>
        </li>
      ))}
    </ol>
  );
}
