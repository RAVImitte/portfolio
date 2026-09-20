/*
 * One diagram per project, and each one is a different *shape*.
 *
 * The previous treatment drew the same three-boxes-and-arrows strip for every
 * project, which is what made the cards read as interchangeable. A composition
 * layer, a row-lock contention, an event stream and a watch loop are not the
 * same shape, so they are not drawn as the same shape here.
 */

type Kind = "composition" | "contention" | "stream" | "extraction" | "loop" | "cut";

const KIND_BY_PROJECT: Record<string, { kind: Kind; label: string; note: string }> = {
  "Living Labs": {
    kind: "composition",
    label: "Client composition",
    note: "One contract in front. The same services behind it.",
  },
  "Find My Mobile": {
    kind: "cut",
    label: "",
    note: "For the frequent Watch → Phone commands when the two devices are paired and reachable on the same local network.",
  },
  "Zero Miles": {
    kind: "contention",
    label: "Transaction boundary",
    note: "Two requests, one token row. The transaction decides the winner.",
  },
  DermaAssist: {
    kind: "stream",
    label: "Execution events",
    note: "Tool calls and checks surface as they happen, not after.",
  },
  "Wearable Intelligence": {
    kind: "extraction",
    label: "On-device extraction",
    note: "Unstructured event in. Structured watch state out.",
  },
  "Dynamic Mock Server": {
    kind: "loop",
    label: "Development loop",
    note: "Edit the JSON, the route changes. No restart in the loop.",
  },
};

function Composition() {
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      <path className="sig-edge" d="M78 58H136" />
      <path className="sig-edge" d="M228 58H258V25H288M258 58H288M258 58V91H288" />
      <rect className="sig-node" x="4" y="40" width="74" height="36" rx="6" />
      <text className="sig-text" x="41" y="63" textAnchor="middle">Client</text>
      <rect className="sig-node sig-node--focus" x="136" y="34" width="92" height="48" rx="6" />
      <text className="sig-text" x="182" y="63" textAnchor="middle">GraphQL</text>
      <rect className="sig-node" x="288" y="14" width="68" height="22" rx="5" />
      <rect className="sig-node" x="288" y="47" width="68" height="22" rx="5" />
      <rect className="sig-node" x="288" y="80" width="68" height="22" rx="5" />
      <text className="sig-micro" x="322" y="29" textAnchor="middle">service</text>
      <text className="sig-micro" x="322" y="62" textAnchor="middle">service</text>
      <text className="sig-micro" x="322" y="95" textAnchor="middle">service</text>
    </svg>
  );
}

function Contention() {
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      <path className="sig-edge" d="M96 23H160V50H214" />
      <path className="sig-edge sig-edge--blocked" d="M96 93H160V66H214" />
      <rect className="sig-node" x="4" y="8" width="92" height="30" rx="5" />
      <text className="sig-text" x="50" y="28" textAnchor="middle">Request A</text>
      <rect className="sig-node" x="4" y="78" width="92" height="30" rx="5" />
      <text className="sig-text" x="50" y="98" textAnchor="middle">Request B</text>
      <rect className="sig-node sig-node--focus" x="214" y="36" width="142" height="44" rx="6" />
      <text className="sig-text" x="285" y="54" textAnchor="middle">token row</text>
      <text className="sig-micro" x="285" y="71" textAnchor="middle">locked · one winner</text>
      <text className="sig-micro sig-micro--blocked" x="176" y="86">waits</text>
    </svg>
  );
}

function Stream() {
  const events = [28, 52, 20, 64, 34, 56, 24, 44, 60];
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      <path className="sig-axis" d="M4 92H356" />
      {events.map((height, i) => (
        <rect
          key={i}
          className={i % 3 === 1 ? "sig-tick sig-tick--check" : "sig-tick"}
          x={16 + i * 38}
          y={92 - height}
          width="11"
          height={height}
          rx="3"
        />
      ))}
      <text className="sig-micro" x="4" y="110">t₀</text>
      <text className="sig-micro" x="356" y="110" textAnchor="end">streamed as they occur</text>
    </svg>
  );
}

function Extraction() {
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      <path className="sig-edge" d="M112 58H146M214 58H264" />
      <rect className="sig-node" x="4" y="24" width="108" height="68" rx="6" />
      <path className="sig-ragged" d="M20 46H96M20 60H88M20 74H68" />
      <text className="sig-micro" x="58" y="16" textAnchor="middle">event</text>
      <path className="sig-node sig-node--focus" d="M146 34H214L188 58L214 82H146L172 58Z" />
      <text className="sig-micro" x="180" y="104" textAnchor="middle">on-device extraction</text>
      <rect className="sig-node" x="264" y="22" width="72" height="72" rx="16" />
      <rect className="sig-fill" x="280" y="42" width="40" height="8" rx="4" />
      <rect className="sig-fill" x="280" y="58" width="28" height="8" rx="4" />
      <text className="sig-micro" x="300" y="14" textAnchor="middle">watch state</text>
    </svg>
  );
}

function Loop() {
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      <path className="sig-edge" d="M102 44H128M222 44H248" />
      <path className="sig-edge sig-edge--return" d="M302 62V92H56V62" />
      <rect className="sig-node" x="4" y="26" width="98" height="36" rx="6" />
      <text className="sig-text" x="53" y="49" textAnchor="middle">Edit JSON</text>
      <rect className="sig-node sig-node--focus" x="128" y="26" width="94" height="36" rx="6" />
      <text className="sig-text" x="175" y="49" textAnchor="middle">Watcher</text>
      <rect className="sig-node" x="248" y="26" width="108" height="36" rx="6" />
      <text className="sig-text" x="302" y="49" textAnchor="middle">REST route</text>
      <text className="sig-micro" x="180" y="110" textAnchor="middle">no restart in the loop</text>
    </svg>
  );
}

function Cut() {
  return (
    <svg viewBox="0 0 360 116" role="presentation" focusable="false">
      {/* Old cloud detour (dashed, blocked) */}
      <path className="sig-edge sig-edge--blocked" d="M 84 46 Q 180 -6 276 46" />

      {/* Cloud rendered as three overlapping bumps */}
      <circle className="sig-cloud" cx="170" cy="16" r="9" />
      <circle className="sig-cloud" cx="184" cy="10" r="11" />
      <circle className="sig-cloud" cx="198" cy="16" r="9" />

      {/* Universal no-entry / prohibited symbol over the cloud */}
      <circle className="sig-forbid" cx="184" cy="12" r="15" />
      <line className="sig-forbid" x1="173" y1="23" x2="195" y2="1" />

      {/* Direct device-to-device link (solid focus, split around a paired-link glyph) */}
      <path className="sig-edge" d="M 84 58 H 154" />
      <path className="sig-edge" d="M 214 58 H 276" />

      {/* Wireless waves in the middle — Watch ↔ Phone paired direct radio */}
      <path className="sig-radio" d="M 158 66 Q 162 58 158 50" />
      <path className="sig-radio" d="M 164 70 Q 172 58 164 46" />
      <path className="sig-radio" d="M 210 66 Q 206 58 210 50" />
      <path className="sig-radio" d="M 204 70 Q 196 58 204 46" />
      <circle className="sig-radio-dot" cx="184" cy="58" r="3" />

      {/* Watch and Phone nodes */}
      <rect className="sig-node" x="4" y="42" width="80" height="32" rx="6" />
      <text className="sig-text" x="44" y="63" textAnchor="middle">Watch</text>
      <rect className="sig-node sig-node--focus" x="276" y="42" width="80" height="32" rx="6" />
      <text className="sig-text" x="316" y="63" textAnchor="middle">Phone</text>

      {/* Small paired-link icon under the direct line (two rings connected) */}
      <circle className="sig-link-ring" cx="178" cy="90" r="4" />
      <circle className="sig-link-ring" cx="190" cy="90" r="4" />
      <path className="sig-link-bar" d="M 181 90 H 187" />
    </svg>
  );
}

const SHAPES: Record<Kind, () => React.ReactElement> = {
  composition: Composition,
  contention: Contention,
  stream: Stream,
  extraction: Extraction,
  loop: Loop,
  cut: Cut,
};

export function SignatureDiagram({ title }: { title: string }) {
  const entry = KIND_BY_PROJECT[title];
  if (!entry) return null;
  const Shape = SHAPES[entry.kind];
  return (
    <figure className={`signature signature--${entry.kind}`}>
      {entry.label ? <span className="signature-label">{entry.label}</span> : null}
      <div className="signature-plate">
        <Shape />
      </div>
      <figcaption className="signature-note">{entry.note}</figcaption>
    </figure>
  );
}
