import { useRef, useState } from "react";
import type { HeroExhibit } from "../data/editions";
import { InkLink } from "./InkLink";
import { useParallaxField } from "../motion/useParallaxField";

/*
 * The desktop schematic is split into three stacked SVGs rather than one.
 * The split is by architectural tier, not by drawing primitive:
 *
 *   back   the route that was replaced        — recedes
 *   mid    surrounding context that did not change
 *   front  the components the decision touched — advances
 *
 * Each plane parallaxes at its own rate, so the thing Ravi actually changed
 * separates from the thing he did not. Drift is capped at a few pixels in CSS
 * so connectors never visibly detach from their nodes.
 */

function BackendDesktop() {
  return (
    <div className="sx-stage schematic-desktop" aria-hidden="true">
      <svg className="sx-layer sx-layer--back" viewBox="0 0 720 270" focusable="false">
        <path className="schematic-path schematic-path--previous" d="M97 119V46H490V210H531M490 124H531M490 167H531" />
        <text className="schematic-route-label" x="246" y="37">Existing REST access · previous route</text>
      </svg>
      <svg className="sx-layer sx-layer--mid" viewBox="0 0 720 270" focusable="false">
        <path className="schematic-datum" d="M52 158H674" />
        <rect className="schematic-group" x="506" y="70" width="178" height="176" rx="10" />
        <text className="schematic-subtext" x="595" y="94" textAnchor="middle">Representative services</text>
        <rect className="schematic-node" x="531" y="108" width="128" height="32" rx="8" />
        <rect className="schematic-node" x="531" y="151" width="128" height="32" rx="8" />
        <rect className="schematic-node" x="531" y="194" width="128" height="32" rx="8" />
        <text className="schematic-subtext" x="595" y="129" textAnchor="middle">Service A</text>
        <text className="schematic-subtext" x="595" y="172" textAnchor="middle">Service B</text>
        <text className="schematic-subtext" x="595" y="215" textAnchor="middle">Service C</text>
      </svg>
      <svg className="sx-layer sx-layer--front" viewBox="0 0 720 270" focusable="false">
        <path className="schematic-path schematic-path--selected" d="M158 155H250M414 155H474V124H531M474 155V167H531M474 167V210H531" />
        <rect className="schematic-node" x="36" y="119" width="122" height="72" rx="8" />
        <text x="97" y="161" textAnchor="middle">Client</text>
        <rect className="schematic-node schematic-node--focus" x="250" y="105" width="164" height="100" rx="8" />
        <text x="332" y="148" textAnchor="middle">GraphQL</text>
        <text className="schematic-subtext" x="332" y="171" textAnchor="middle">composition layer</text>
        <g className="schematic-marker" transform="translate(196 133)">
          <circle r="15" /><text y="5" textAnchor="middle">01</text>
        </g>
      </svg>
    </div>
  );
}

function BackendMobile() {
  return (
    <svg className="schematic-mobile" viewBox="0 0 320 300" aria-hidden="true" focusable="false">
      <rect className="schematic-node" x="82" y="18" width="156" height="54" rx="8" />
      <text x="160" y="50" textAnchor="middle">Client</text>
      <rect className="schematic-node schematic-node--focus" x="64" y="118" width="192" height="66" rx="8" />
      <text x="160" y="146" textAnchor="middle">GraphQL composition</text>
      <text className="schematic-subtext" x="160" y="166" textAnchor="middle">layer</text>
      <rect className="schematic-group" x="56" y="230" width="208" height="54" rx="10" />
      <text className="schematic-subtext" x="160" y="253" textAnchor="middle">Representative services</text>
      <text className="schematic-subtext" x="160" y="272" textAnchor="middle">A · B · C</text>
      <path className="schematic-path schematic-path--selected" d="M160 72V118M160 184V230" />
      <path className="schematic-path schematic-path--previous" d="M82 45H24V257H56" />
      <text className="schematic-route-label" x="34" y="104" transform="rotate(-90 34 104)">Previous REST route</text>
    </svg>
  );
}

function AndroidDesktop() {
  return (
    <div className="sx-stage schematic-desktop" aria-hidden="true">
      <svg className="sx-layer sx-layer--back" viewBox="0 0 720 270" focusable="false">
        <path className="schematic-path schematic-path--previous" d="M126 88C186 15 513 15 602 117" />
        <g className="schematic-cloud" transform="translate(322 30)">
          <path d="M18 42H79C96 42 101 19 84 13C77-2 53-5 43 9C27 2 10 14 12 29C-2 35 3 42 18 42Z" />
          <text x="48" y="63" textAnchor="middle">Cloud relay</text>
        </g>
        <text className="schematic-route-label" x="367" y="18" textAnchor="middle">Previous route</text>
      </svg>
      <svg className="sx-layer sx-layer--mid" viewBox="0 0 720 270" focusable="false">
        <path className="schematic-datum" d="M52 170H674" />
      </svg>
      <svg className="sx-layer sx-layer--front" viewBox="0 0 720 270" focusable="false">
        <rect className="schematic-device" x="70" y="88" width="112" height="144" rx="18" />
        <rect className="schematic-device-detail" x="100" y="105" width="52" height="86" rx="6" />
        <circle className="schematic-device-detail" cx="126" cy="211" r="5" />
        <text x="126" y="257" textAnchor="middle">Phone</text>
        <rect className="schematic-device" x="552" y="117" width="100" height="100" rx="24" />
        <path className="schematic-device-detail" d="M578 117V88H626V117M578 217V246H626V217" />
        <rect className="schematic-device-detail" x="574" y="139" width="56" height="56" rx="15" />
        <text x="602" y="264" textAnchor="middle">Watch</text>
        <path className="schematic-path schematic-path--selected" d="M182 170H552" />
        <text className="schematic-route-label" x="367" y="154" textAnchor="middle">direct communication</text>
        <g className="schematic-marker" transform="translate(367 188)">
          <circle r="15" /><text y="5" textAnchor="middle">01</text>
        </g>
      </svg>
    </div>
  );
}

function AndroidMobile() {
  return (
    <svg className="schematic-mobile" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
      <rect className="schematic-device" x="108" y="18" width="104" height="104" rx="18" />
      <rect className="schematic-device-detail" x="133" y="34" width="54" height="62" rx="6" />
      <text x="160" y="145" textAnchor="middle">Phone</text>
      <rect className="schematic-device" x="115" y="222" width="90" height="76" rx="20" />
      <path className="schematic-device-detail" d="M138 222V203H182V222M138 298V317H182V298" />
      <text x="160" y="215" textAnchor="middle">Watch</text>
      <path className="schematic-path schematic-path--selected" d="M160 151V203" />
      <path className="schematic-path schematic-path--previous" d="M108 70H40V260H115" />
      <g className="schematic-cloud" transform="translate(8 137)">
        <path d="M12 31H67C82 31 85 12 71 8C64-3 43-4 35 7C21 2 7 12 9 23C-2 27 1 31 12 31Z" />
        <text x="39" y="50" textAnchor="middle">Cloud relay</text>
      </g>
      <text className="schematic-route-label" x="173" y="182">direct communication</text>
    </svg>
  );
}

export function DecisionSchematic({ exhibit }: { exhibit: HeroExhibit }) {
  const [view, setView] = useState<"before" | "after">("after");
  const fieldRef = useRef<HTMLDivElement>(null);
  useParallaxField(fieldRef);

  const headingId = `schematic-${exhibit.kind}`;
  const descriptionId = `${headingId}-description`;
  const explanation = exhibit.kind === "backend"
    ? view === "before"
      ? "The client assembles data across service endpoints. Each consumer must coordinate the data it needs."
      : "The client requests composed data through GraphQL. Service calls still happen behind that contract; existing REST access remains."
    : view === "before"
      ? "The previous route takes supported phone–watch operations through a cloud relay."
      : "Supported operations use direct device communication. This path depends on the operation and connectivity conditions.";

  return (
    <figure className={`decision-schematic decision-schematic--${exhibit.kind} is-${view}`} aria-labelledby={headingId} aria-describedby={descriptionId}>
      <div className="schematic-field" ref={fieldRef}>
        <div className="schematic-topline">
          <span>{exhibit.no}</span>
          <span>Decision schematic</span>
        </div>
        <h2 id={headingId}>{exhibit.title}</h2>
        <div className="schematic-switch" aria-label="Compare architecture paths">
          <button type="button" aria-pressed={view === "before"} onClick={() => setView("before")}>Before</button>
          <button type="button" aria-pressed={view === "after"} onClick={() => setView("after")}>Selected design</button>
        </div>
        {exhibit.kind === "backend" ? (
          <><BackendDesktop /><BackendMobile /></>
        ) : (
          <><AndroidDesktop /><AndroidMobile /></>
        )}
        <div className="schematic-legend">
          {view === "after" ? "Selected architecture path" : "Previous architecture path"}
        </div>
      </div>
      <div className="schematic-caption">
        <span className="schematic-decision-no" aria-hidden="true">01</span>
        <div>
          <p className="schematic-summary" aria-live="polite">{explanation}</p>
          <p className="schematic-limit">{exhibit.limitation}</p>
          <details className="decision-rationale">
            <summary>Why this boundary?</summary>
            <p>{exhibit.kind === "backend"
              ? "Keeping composition in each client spreads coordination across consumers. A composition layer centralizes that work, but also becomes responsible for downstream failures and contract changes. It moves complexity; it does not eliminate it."
              : "Removing the relay shortens the path for eligible operations. The direct path still has to handle connection availability and device lifecycle. This diagram does not imply that every remote-locate operation can bypass a server."}</p>
          </details>
          <InkLink className="schematic-case-link" to={exhibit.caseHref}>Read the case study →</InkLink>
        </div>
      </div>
      <p className="sr-only" id={descriptionId}>{exhibit.a11yDescription} {exhibit.limitation} The control switches the emphasized path.</p>
    </figure>
  );
}
