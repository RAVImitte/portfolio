import type { CSSProperties } from "react";

/** Slug-keyed hero illustration. Returns null for slugs that don't have one yet. */
export function CaseHeroArt({ slug }: { slug: string }) {
  if (slug === "living-labs") return <LivingLabsHeroArt />;
  if (slug === "find-my-mobile") return <FindMyMobileHeroArt />;
  if (slug === "wearable-intelligence") return <WearableHeroArt />;
  if (slug === "zero-miles") return <ZeroMilesHeroArt />;
  if (slug === "derma-assist") return <DermaAssistHeroArt />;
  if (slug === "dynamic-mock-server") return <MockServerHeroArt />;
  return null;
}

const SERVICE_X = [80, 130, 180, 230, 280] as const;

function delay(seconds: number): CSSProperties {
  return { animationDelay: `${seconds}s` };
}

/**
 * Living Labs closed loop: user → watch senses → phone queries → BFF composes
 * across 10 services → Postgres → SQS → ECS → Parquet → insight arcs back up
 * to the phone. Motion loops on a shared 6s cycle; wires flash in sequence via
 * per-element animation delays. Colors keyed to CSS custom properties so the
 * whole illustration flips with the light/dark theme.
 */
function LivingLabsHeroArt() {
  const arc = "M 244 424 C 90 424, 22 320, 22 236 C 22 142, 82 122, 148 138";
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="Living Labs closed loop: a wearable senses the user, data flows through a backend of ten services, and analytics returns an insight to the phone."
      >
        {/* Card frame + zone tints */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="164" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="182" width="340" height="212" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="402" width="340" height="146" rx="12" className="hero-art-zone hero-art-zone--analytics" />
        <text x="22" y="26" className="hero-art-zone-label">CLIENT</text>
        <text x="22" y="198" className="hero-art-zone-label">BACKEND</text>
        <text x="22" y="418" className="hero-art-zone-label">ANALYTICS</text>

        {/* USER */}
        <g className="hero-art-person">
          <circle cx="180" cy="42" r="7" />
          <path d="M 172 56 Q 180 50 188 56 L 186 68 L 174 68 Z" />
        </g>
        <text x="200" y="50" className="hero-art-label">USER</text>

        {/* WATCH */}
        <g transform="translate(180, 90)">
          <rect x="-4.5" y="-14" width="9" height="4" rx="1.5" className="hero-art-node" />
          <rect x="-4.5" y="10" width="9" height="4" rx="1.5" className="hero-art-node" />
          <circle r="10" className="hero-art-node" />
          <circle r="7" className="hero-art-watch-face" />
          <path d="M -4 0 L -2 -3 L 0 2 L 2 -3 L 4 0" className="hero-art-watch-pulse" />
          <rect x="9" y="-3" width="2" height="4" rx="1" className="hero-art-node" />
          <circle r="14" className="hero-art-pulse hero-art-pulse--watch" />
        </g>
        <text x="200" y="94" className="hero-art-label">WATCH</text>

        {/* WATCH → PHONE */}
        <path d="M 180 106 L 180 134" className="hero-art-wire" />
        <path d="M 180 106 L 180 134" pathLength="1" className="hero-art-flow" style={delay(0.5)} />
        <text x="186" y="122" className="hero-art-label hero-art-label--sm">SENSOR</text>

        {/* PHONE */}
        <g transform="translate(180, 156)">
          <rect x="-18" y="-22" width="36" height="44" rx="5" className="hero-art-node" />
          <rect x="-14" y="-16" width="28" height="30" rx="2" className="hero-art-phone-screen" />
          <rect x="-4" y="-19" width="8" height="1.5" rx=".7" className="hero-art-phone-detail" />
          <circle cx="0" cy="18" r="1.5" className="hero-art-phone-detail" />
          <circle r="16" className="hero-art-pulse hero-art-pulse--phone" />
          <path
            d="M -6 -3 L 0 3 L 6 -3 M 0 3 L 0 10 M -3 -8 L 3 -8"
            className="hero-art-phone-sparkle"
          />
        </g>
        <text x="204" y="160" className="hero-art-label">PHONE</text>

        {/* PHONE → BFF */}
        <path d="M 180 178 L 180 210" className="hero-art-wire" />
        <path d="M 180 178 L 180 210" pathLength="1" className="hero-art-flow" style={delay(1.1)} />
        <text x="186" y="196" className="hero-art-label hero-art-label--sm">1 QUERY</text>

        {/* BFF */}
        <g transform="translate(180, 226)">
          <rect x="-40" y="-16" width="80" height="32" rx="6" className="hero-art-node hero-art-node--accent" />
          <path d="M -26 -6 L -20 0 L -26 6 M -20 0 L -8 0" className="hero-art-glyph hero-art-glyph--accent" />
          <text x="6" y="4" className="hero-art-node-label">BFF</text>
          <rect x="-40" y="-16" width="80" height="32" rx="6" className="hero-art-pulse hero-art-pulse--bff" />
        </g>

        {/* VALKEY */}
        <g transform="translate(280, 226)">
          <rect x="-30" y="-14" width="60" height="28" rx="4" className="hero-art-node" />
          <text x="0" y="3" className="hero-art-node-label" textAnchor="middle">VALKEY</text>
        </g>
        <path d="M 220 226 L 250 226" className="hero-art-wire hero-art-wire--dashed" />

        {/* BFF fan-out → services */}
        {SERVICE_X.map((x, i) => (
          <g key={`fo-${i}`}>
            <path d={`M 180 242 L ${x} 284`} className="hero-art-wire" />
            <path d={`M 180 242 L ${x} 284`} pathLength="1" className="hero-art-flow" style={delay(1.7)} />
          </g>
        ))}

        {/* SERVICES */}
        {SERVICE_X.map((x, i) => (
          <g key={`s-${i}`} transform={`translate(${x}, 292)`}>
            <circle r="8" className="hero-art-node" />
            <circle r="3" className="hero-art-service-core" />
          </g>
        ))}
        <text x="308" y="296" className="hero-art-label hero-art-label--sm">···</text>
        <text x="180" y="316" className="hero-art-label" textAnchor="middle">10 SERVICES</text>

        {/* Services → Postgres converge */}
        {SERVICE_X.map((x, i) => (
          <g key={`cv-${i}`}>
            <path d={`M ${x} 300 L 180 346`} className="hero-art-wire" />
            <path d={`M ${x} 300 L 180 346`} pathLength="1" className="hero-art-flow" style={delay(2.4)} />
          </g>
        ))}

        {/* POSTGRES (cylinder) */}
        <g transform="translate(180, 360)">
          <ellipse cx="0" cy="-10" rx="22" ry="5" className="hero-art-node" />
          <path d="M -22 -10 L -22 10" className="hero-art-node-edge" />
          <path d="M 22 -10 L 22 10" className="hero-art-node-edge" />
          <path d="M -22 10 A 22 5 0 0 0 22 10" className="hero-art-node-edge" />
          <ellipse cx="0" cy="-3" rx="22" ry="5" className="hero-art-node-band" />
          <ellipse cx="0" cy="4" rx="22" ry="5" className="hero-art-node-band" />
          <ellipse cx="0" cy="-10" rx="22" ry="5" className="hero-art-pulse hero-art-pulse--postgres" />
        </g>
        <text x="180" y="386" className="hero-art-label" textAnchor="middle">POSTGRES · SAFE WRITES</text>

        {/* POSTGRES → SQS (elbow) */}
        <path d="M 180 374 L 180 394 L 96 394 L 96 428" className="hero-art-wire" />
        <path d="M 180 374 L 180 394 L 96 394 L 96 428" pathLength="1" className="hero-art-flow" style={delay(2.9)} />

        {/* SQS (message queue) */}
        <g transform="translate(96, 444)">
          <rect x="-18" y="-10" width="36" height="24" rx="4" className="hero-art-node" />
          <rect x="-13" y="-6" width="26" height="3" rx="1" className="hero-art-detail" />
          <rect x="-13" y="-1" width="26" height="3" rx="1" className="hero-art-detail" />
          <rect x="-13" y="4" width="26" height="3" rx="1" className="hero-art-detail" />
        </g>
        <text x="96" y="470" className="hero-art-label" textAnchor="middle">SQS</text>

        {/* SQS → ECS */}
        <path d="M 114 444 L 162 444" className="hero-art-wire" />
        <path d="M 114 444 L 162 444" pathLength="1" className="hero-art-flow" style={delay(3.2)} />

        {/* ECS (containers) */}
        <g transform="translate(180, 444)">
          <rect x="-18" y="-10" width="36" height="24" rx="3" className="hero-art-node" />
          <rect x="-14" y="-6" width="28" height="6" rx="1" className="hero-art-detail" />
          <rect x="-14" y="1" width="28" height="6" rx="1" className="hero-art-detail" />
          <circle cx="-10" cy="-3" r="1" className="hero-art-detail-dot" />
          <circle cx="-10" cy="4" r="1" className="hero-art-detail-dot" />
        </g>
        <text x="180" y="470" className="hero-art-label" textAnchor="middle">ECS · 0 → 10</text>

        {/* ECS → PARQUET */}
        <path d="M 198 444 L 246 444" className="hero-art-wire" />
        <path d="M 198 444 L 246 444" pathLength="1" className="hero-art-flow" style={delay(3.5)} />

        {/* PARQUET (columnar file) */}
        <g transform="translate(264, 444)">
          <rect x="-18" y="-10" width="36" height="24" rx="2" className="hero-art-node hero-art-node--parquet" />
          <path d="M -14 -5 L 14 -5" className="hero-art-detail" />
          <rect x="-13" y="-2" width="3" height="13" className="hero-art-column" />
          <rect x="-7" y="-2" width="3" height="13" className="hero-art-column" />
          <rect x="-1" y="-2" width="3" height="13" className="hero-art-column" />
          <rect x="5" y="-2" width="3" height="13" className="hero-art-column" />
          <rect x="-18" y="-10" width="36" height="24" rx="2" className="hero-art-pulse hero-art-pulse--parquet" />
        </g>
        <text x="264" y="470" className="hero-art-label" textAnchor="middle">PARQUET</text>

        {/* INSIGHT arc → Phone */}
        <path d={arc} className="hero-art-wire hero-art-wire--arc" />
        <path d={arc} pathLength="1" className="hero-art-flow hero-art-flow--insight" style={delay(4.0)} />
        <g transform="rotate(-90 24 260)">
          <text x="24" y="260" className="hero-art-label hero-art-label--arc">INSIGHT</text>
        </g>
      </svg>
    </div>
  );
}

const FMM_TARGET = { x: 180, y: 470 } as const;

/**
 * Find My Mobile production picture (as documented by Samsung, not this
 * project's specific optimization): the owner authenticates via Samsung
 * Account and initiates a command from a client; the SmartThings Find cloud
 * dispatches it two ways — SPP/FCM silent push for online targets, and a BLE
 * crowd-relay through nearby SmartThings-enabled devices for offline targets.
 * The target executes locate / ring / lock / erase and reports back.
 */
function FindMyMobileHeroArt() {
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="Samsung Find My Mobile production loop: owner authenticates via Samsung Account and issues a command from the SmartThings Find app or web portal; SmartThings Find cloud delivers via SPP/FCM silent push for online targets or a BLE crowd relay through nearby Samsung devices for offline targets; target device executes locate, ring, lock or erase."
      >
        {/* Card frame + 3 zones */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="150" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="168" width="340" height="232" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="408" width="340" height="140" rx="12" className="hero-art-zone hero-art-zone--client" />
        <text x="22" y="26" className="hero-art-zone-label">OWNER · INITIATES</text>
        <text x="22" y="184" className="hero-art-zone-label">SMARTTHINGS FIND · SERVER TIER</text>
        <text x="22" y="424" className="hero-art-zone-label">TARGET DEVICE</text>

        {/* Samsung Account identity badge */}
        <g transform="translate(230, 16)">
          <path d="M 0 0 L 6 -4 L 12 0 L 12 7 Q 12 11 6 13 Q 0 11 0 7 Z" className="hero-art-shield" />
          <path d="M 3 5 L 5 7 L 9 3" className="hero-art-shield-check" />
        </g>
        <text x="248" y="26" className="hero-art-label hero-art-label--sm">SAMSUNG ACCOUNT</text>

        {/* OWNER — person icon */}
        <g transform="translate(110, 74)" className="hero-art-person">
          <circle cx="0" cy="0" r="7" />
          <path d="M -8 14 Q 0 8 8 14 L 6 26 L -6 26 Z" />
          <circle r="18" className="hero-art-pulse hero-art-pulse--fmm-owner" />
        </g>
        <text x="110" y="122" className="hero-art-label hero-art-label--sm" textAnchor="middle">OWNER</text>

        {/* OWNER CLIENT — SmartThings Find app (phone) alternates with web portal (browser) */}
        <g transform="translate(210, 84)">
          <g className="hero-art-owner-client hero-art-owner-client--phone">
            <rect x="-14" y="-22" width="28" height="44" rx="5" className="hero-art-node" />
            <rect x="-11" y="-16" width="22" height="30" rx="2" className="hero-art-phone-screen" />
            <rect x="-4" y="-19" width="8" height="1.5" rx=".7" className="hero-art-phone-detail" />
            <circle cx="0" cy="18" r="1.5" className="hero-art-phone-detail" />
            <path d="M -5 -6 L -1 -2 L 5 -8" className="hero-art-app-glyph" />
          </g>
          <g className="hero-art-owner-client hero-art-owner-client--web">
            <rect x="-18" y="-20" width="36" height="40" rx="4" className="hero-art-node" />
            <rect x="-18" y="-20" width="36" height="9" className="hero-art-browser-bar" />
            <circle cx="-13" cy="-15.5" r="1" className="hero-art-phone-detail" />
            <circle cx="-9" cy="-15.5" r="1" className="hero-art-phone-detail" />
            <circle cx="-5" cy="-15.5" r="1" className="hero-art-phone-detail" />
            <rect x="-13" y="-8" width="26" height="3" rx="1" className="hero-art-detail" />
            <rect x="-13" y="-2" width="26" height="18" rx="1" className="hero-art-phone-screen" />
            <path d="M -5 4 L -1 8 L 6 -2" className="hero-art-app-glyph" />
          </g>
        </g>
        <text x="210" y="122" className="hero-art-label hero-art-label--sm" textAnchor="middle">
          SMARTTHINGS FIND
        </text>
        <text x="210" y="132" className="hero-art-label hero-art-label--sm" textAnchor="middle">
          APP · WEB PORTAL
        </text>

        {/* Owner → Client (subtle connector) */}
        <path d="M 122 82 L 194 84" className="hero-art-wire hero-art-wire--dashed" />

        {/* Client → Cloud wire */}
        <path d="M 210 132 L 180 200" className="hero-art-wire" />
        <path d="M 210 132 L 180 200" pathLength="1" className="hero-art-flow" style={delay(0.4)} />

        {/* SMARTTHINGS FIND CLOUD */}
        <g transform="translate(180, 236)">
          <path
            d="M -64 11 Q -73 0 -62 -11 Q -53 -28 -31 -22 Q -17 -36 6 -31 Q 31 -34 42 -20 Q 62 -17 62 -3 Q 70 8 62 17 Q 42 25 11 22 Q -8 31 -31 22 Q -56 28 -64 11 Z"
            className="hero-art-node hero-art-node--accent"
          />
          <text x="0" y="-8" className="hero-art-node-label" textAnchor="middle">SMARTTHINGS FIND</text>
          <text x="0" y="4" className="hero-art-node-label" textAnchor="middle">CLOUD</text>
          <text x="0" y="18" className="hero-art-label hero-art-label--sm" textAnchor="middle">ENCRYPTED · TWO-WAY</text>
          <path
            d="M -64 11 Q -73 0 -62 -11 Q -53 -28 -31 -22 Q -17 -36 6 -31 Q 31 -34 42 -20 Q 62 -17 62 -3 Q 70 8 62 17 Q 42 25 11 22 Q -8 31 -31 22 Q -56 28 -64 11 Z"
            className="hero-art-pulse hero-art-pulse--fmm-cloud"
          />
        </g>

        {/* Cloud → LEFT branch (online push) */}
        <path d="M 155 260 L 100 306" className="hero-art-wire" />
        <path d="M 155 260 L 100 306" pathLength="1" className="hero-art-flow" style={delay(1.1)} />

        {/* Cloud → RIGHT branch (offline BLE) */}
        <path d="M 205 260 L 260 306" className="hero-art-wire" />
        <path d="M 205 260 L 260 306" pathLength="1" className="hero-art-flow" style={delay(1.3)} />

        {/* LEFT — SPP + FCM silent push node */}
        <g transform="translate(100, 320)">
          <rect x="-32" y="-14" width="64" height="30" rx="4" className="hero-art-node" />
          <text x="0" y="-1" className="hero-art-node-label" textAnchor="middle">SPP</text>
          <text x="0" y="11" className="hero-art-node-label" textAnchor="middle">FCM</text>
        </g>
        <text x="100" y="358" className="hero-art-label hero-art-label--arc" textAnchor="middle">ONLINE</text>
        <text x="100" y="370" className="hero-art-label hero-art-label--sm" textAnchor="middle">SILENT PUSH</text>

        {/* RIGHT — BLE crowd (nearby devices) */}
        <g transform="translate(260, 320)">
          <path d="M -14 -10 Q -28 4 -14 18" className="hero-art-wave" />
          <path d="M 14 -10 Q 28 4 14 18" className="hero-art-wave" />
          <circle cx="-8" cy="0" r="4" className="hero-art-node" />
          <circle cx="8" cy="0" r="4" className="hero-art-node" />
          <circle cx="0" cy="10" r="4" className="hero-art-node" />
        </g>
        <text x="260" y="358" className="hero-art-label hero-art-label--arc" textAnchor="middle">OFFLINE</text>
        <text x="260" y="370" className="hero-art-label hero-art-label--sm" textAnchor="middle">BLE CROWD RELAY</text>

        {/* LEFT branch → Target */}
        <path d="M 100 336 L 180 440" className="hero-art-wire" />
        <path d="M 100 336 L 180 440" pathLength="1" className="hero-art-flow" style={delay(1.8)} />

        {/* RIGHT branch → Target */}
        <path d="M 260 336 L 180 440" className="hero-art-wire" />
        <path d="M 260 336 L 180 440" pathLength="1" className="hero-art-flow" style={delay(2.0)} />

        {/* TARGET DEVICE — icon rotates Phone → Watch → Glasses → VST each 1.5s */}
        <g transform={`translate(${FMM_TARGET.x}, ${FMM_TARGET.y})`}>
          <circle r="34" className="hero-art-pulse hero-art-pulse--fmm-target-1" />
          <circle r="34" className="hero-art-pulse hero-art-pulse--fmm-target-2" />
          <circle r="34" className="hero-art-pulse hero-art-pulse--fmm-target-3" />
          <circle r="34" className="hero-art-pulse hero-art-pulse--fmm-target-4" />

          <g className="hero-art-target-icon hero-art-target-icon--phone">
            <rect x="-22" y="-36" width="44" height="72" rx="6" className="hero-art-node hero-art-node--accent" />
            <rect x="-18" y="-28" width="36" height="52" rx="3" className="hero-art-phone-screen" />
            <rect x="-6" y="-32" width="12" height="1.5" rx=".7" className="hero-art-phone-detail" />
            <circle cx="0" cy="29" r="2" className="hero-art-phone-detail" />
          </g>

          <g className="hero-art-target-icon hero-art-target-icon--watch">
            <rect x="-12" y="-38" width="24" height="10" rx="3" className="hero-art-node" />
            <rect x="-12" y="28" width="24" height="10" rx="3" className="hero-art-node" />
            <circle r="26" className="hero-art-node hero-art-node--accent" />
            <circle r="20" className="hero-art-watch-face" />
            <path d="M -12 0 L -6 -8 L 0 6 L 6 -8 L 12 0" className="hero-art-watch-pulse" strokeWidth="2" />
            <rect x="26" y="-5" width="4" height="10" rx="1.5" className="hero-art-node" />
          </g>

          <g className="hero-art-target-icon hero-art-target-icon--glasses">
            <path d="M -34 0 L -22 0" className="hero-art-node-edge" strokeWidth="2" />
            <circle cx="-13" cy="0" r="11" className="hero-art-lens" strokeWidth="2" />
            <path d="M -2 0 L 2 0" className="hero-art-node-edge" strokeWidth="2" />
            <circle cx="13" cy="0" r="11" className="hero-art-lens" strokeWidth="2" />
            <path d="M 22 0 L 34 0" className="hero-art-node-edge" strokeWidth="2" />
          </g>

          <g className="hero-art-target-icon hero-art-target-icon--vst">
            <rect x="-32" y="-18" width="64" height="36" rx="10" className="hero-art-node hero-art-node--accent" />
            <ellipse cx="-14" cy="0" rx="10" ry="8" className="hero-art-lens" strokeWidth="2" />
            <ellipse cx="14" cy="0" rx="10" ry="8" className="hero-art-lens" strokeWidth="2" />
            <path d="M -32 -8 Q -40 0 -32 8" className="hero-art-node-edge" strokeWidth="1.6" />
            <path d="M 32 -8 Q 40 0 32 8" className="hero-art-node-edge" strokeWidth="1.6" />
          </g>
        </g>

        <text x="180" y="522" className="hero-art-label hero-art-label--found" textAnchor="middle">
          LOCATE · RING · LOCK · ERASE
        </text>
        <text x="180" y="540" className="hero-art-label hero-art-label--sm" textAnchor="middle">
          ANY DEVICE ON THE ACCOUNT · RESPONSE VIA SAME PATH
        </text>
      </svg>
    </div>
  );
}

const WEAR_PILLS = ["TITLE", "TIME", "PLACE", "PEOPLE", "ACTION"] as const;
const WEAR_PILL_X = [60, 120, 180, 240, 300] as const;

/**
 * Wearable Intelligence pipeline: unstructured notification/calendar text on
 * the phone gets read by an on-device LLM, extracted into ~7–10 attributes
 * (five shown as pills), carried by a Wear OS listener service to the Watch,
 * where a lifecycle card rotates through three states (Booked → Today → Done).
 */
function WearableHeroArt() {
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="Wearable Intelligence pipeline: a small on-device LLM on the phone reads notification and calendar text and extracts 7 to 10 structured attributes; Wear OS listener services carry them to the Watch, which renders a lifecycle card that changes through three states — Booked, Today, and Done."
      >
        {/* Card frame + 3 zones */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="140" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="158" width="340" height="222" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="388" width="340" height="160" rx="12" className="hero-art-zone hero-art-zone--client" />
        <text x="22" y="26" className="hero-art-zone-label">INPUT · UNSTRUCTURED TEXT</text>
        <text x="22" y="174" className="hero-art-zone-label">ON-DEVICE EXTRACTION</text>
        <text x="22" y="404" className="hero-art-zone-label">WATCH · LIFECYCLE CARD</text>

        {/* NOTIFICATION (bell + badge) */}
        <g transform="translate(70, 78)">
          <path d="M -10 6 Q -10 -8 0 -12 Q 10 -8 10 6 L 12 8 L -12 8 Z" className="hero-art-node" />
          <path d="M -3 10 Q 0 14 3 10" className="hero-art-node-edge" />
          <circle cx="9" cy="-8" r="4" className="hero-art-badge" />
          <circle r="18" className="hero-art-pulse hero-art-pulse--wear-notif" />
        </g>
        <text x="70" y="108" className="hero-art-label hero-art-label--sm" textAnchor="middle">EVENTS</text>

        {/* CALENDAR (page + top bar + ring holes + date) */}
        <g transform="translate(180, 78)">
          <rect x="-14" y="-12" width="28" height="24" rx="3" className="hero-art-node" />
          <rect x="-14" y="-12" width="28" height="6" className="hero-art-browser-bar" />
          <rect x="-9" y="-15" width="2" height="6" rx="1" className="hero-art-node-edge" />
          <rect x="7" y="-15" width="2" height="6" rx="1" className="hero-art-node-edge" />
          <text x="0" y="7" className="hero-art-node-label" textAnchor="middle">15</text>
          <circle r="20" className="hero-art-pulse hero-art-pulse--wear-cal" />
        </g>
        <text x="180" y="108" className="hero-art-label hero-art-label--sm" textAnchor="middle">CALENDAR</text>

        {/* REMINDER (alarm clock) */}
        <g transform="translate(290, 78)">
          <circle cx="-9" cy="-11" r="3" className="hero-art-node" />
          <circle cx="9" cy="-11" r="3" className="hero-art-node" />
          <circle r="11" className="hero-art-node" />
          <path d="M -8 10 L -6 14" className="hero-art-node-edge" strokeWidth="1.6" />
          <path d="M 8 10 L 6 14" className="hero-art-node-edge" strokeWidth="1.6" />
          <path d="M 0 0 L 0 -6" className="hero-art-node-edge" strokeWidth="1.5" />
          <path d="M 0 0 L 5 2" className="hero-art-node-edge" strokeWidth="1.5" />
          <circle r="18" className="hero-art-pulse hero-art-pulse--wear-rem" />
        </g>
        <text x="290" y="108" className="hero-art-label hero-art-label--sm" textAnchor="middle">REMINDER</text>

        {/* Messy text lines */}
        <path d="M 40 124 Q 100 121 160 124 T 300 124" className="hero-art-text-line" />
        <path d="M 40 134 Q 110 131 170 134 T 320 134" className="hero-art-text-line" />
        <path d="M 60 144 Q 130 141 200 144 T 320 144" className="hero-art-text-line" />

        {/* Notification → Phone wire */}
        <path d="M 70 92 L 180 180" className="hero-art-wire" />
        <path d="M 70 92 L 180 180" pathLength="1" className="hero-art-flow" style={delay(0.4)} />

        {/* Calendar → Phone wire */}
        <path d="M 180 92 L 180 180" className="hero-art-wire" />
        <path d="M 180 92 L 180 180" pathLength="1" className="hero-art-flow" style={delay(0.5)} />

        {/* Reminder → Phone wire */}
        <path d="M 290 92 L 180 180" className="hero-art-wire" />
        <path d="M 290 92 L 180 180" pathLength="1" className="hero-art-flow" style={delay(0.6)} />

        {/* PHONE with on-device LLM chip */}
        <g transform="translate(180, 212)">
          <rect x="-20" y="-32" width="40" height="64" rx="5" className="hero-art-node hero-art-node--accent" />
          <rect x="-16" y="-26" width="32" height="46" rx="3" className="hero-art-phone-screen" />
          <rect x="-4" y="-29" width="8" height="1.5" rx=".7" className="hero-art-phone-detail" />
          <circle cx="0" cy="25" r="1.5" className="hero-art-phone-detail" />
          {/* LLM chip inside the screen */}
          <rect x="-11" y="-12" width="22" height="18" rx="3" className="hero-art-chip" />
          <line x1="-6" y1="-14" x2="-6" y2="-16" className="hero-art-chip-pin" />
          <line x1="0" y1="-14" x2="0" y2="-16" className="hero-art-chip-pin" />
          <line x1="6" y1="-14" x2="6" y2="-16" className="hero-art-chip-pin" />
          <line x1="-6" y1="8" x2="-6" y2="10" className="hero-art-chip-pin" />
          <line x1="0" y1="8" x2="0" y2="10" className="hero-art-chip-pin" />
          <line x1="6" y1="8" x2="6" y2="10" className="hero-art-chip-pin" />
          <text x="0" y="0" className="hero-art-chip-label" textAnchor="middle">LLM</text>
          <circle r="34" className="hero-art-pulse hero-art-pulse--wear-phone" />
        </g>

        {/* Phone → 5 attribute pills (fan-out) */}
        {WEAR_PILL_X.map((x, i) => {
          const d = `M 180 246 L ${x} 274`;
          return (
            <g key={`fo-${i}`}>
              <path d={d} className="hero-art-wire" />
              <path d={d} pathLength="1" className="hero-art-flow" style={delay(1.1 + i * 0.1)} />
            </g>
          );
        })}

        {/* Attribute pills */}
        {WEAR_PILL_X.map((x, i) => (
          <g key={WEAR_PILLS[i]} transform={`translate(${x}, 282)`}>
            <rect x="-22" y="-7" width="44" height="14" rx="7" className="hero-art-pill" />
            <text x="0" y="3" className="hero-art-pill-label" textAnchor="middle">{WEAR_PILLS[i]}</text>
          </g>
        ))}

        {/* Metric callout */}
        <text x="180" y="308" className="hero-art-label hero-art-label--arc" textAnchor="middle">~30% FASTER</text>
        <text x="180" y="320" className="hero-art-label hero-art-label--sm" textAnchor="middle">7–10 ATTRIBUTES PER EVENT</text>

        {/* Pills → Listener wire */}
        <path d="M 180 328 L 180 346" className="hero-art-wire" />
        <path d="M 180 328 L 180 346" pathLength="1" className="hero-art-flow" style={delay(1.7)} />

        {/* WEAR OS LISTENER service node */}
        <g transform="translate(180, 358)">
          <rect x="-60" y="-12" width="120" height="22" rx="6" className="hero-art-listener" />
          <text x="0" y="3" className="hero-art-node-label" textAnchor="middle">WEAR OS LISTENER</text>
        </g>

        {/* Listener → Watch wire */}
        <path d="M 180 370 L 180 436" className="hero-art-wire" />
        <path d="M 180 370 L 180 436" pathLength="1" className="hero-art-flow" style={delay(2.0)} />

        {/* WATCH with rotating lifecycle state */}
        <g transform="translate(180, 470)">
          <rect x="-14" y="-46" width="28" height="12" rx="3" className="hero-art-node" />
          <rect x="-14" y="34" width="28" height="12" rx="3" className="hero-art-node" />
          <circle r="34" className="hero-art-node hero-art-node--accent" />
          <circle r="28" className="hero-art-watch-face" />
          <rect x="34" y="-5" width="4" height="10" rx="1.5" className="hero-art-node" />

          {/* Rotating lifecycle state */}
          <g className="hero-art-wear-state hero-art-wear-state--1">
            <text x="0" y="-4" className="hero-art-wear-state-title" textAnchor="middle">BOOKED</text>
            <text x="0" y="10" className="hero-art-wear-state-sub" textAnchor="middle">CONFIRMED</text>
          </g>
          <g className="hero-art-wear-state hero-art-wear-state--2">
            <text x="0" y="-4" className="hero-art-wear-state-title" textAnchor="middle">TODAY</text>
            <text x="0" y="10" className="hero-art-wear-state-sub" textAnchor="middle">T − 0:15</text>
          </g>
          <g className="hero-art-wear-state hero-art-wear-state--3">
            <text x="0" y="-4" className="hero-art-wear-state-title" textAnchor="middle">DONE</text>
            <text x="0" y="10" className="hero-art-wear-state-sub" textAnchor="middle">POST-EVENT</text>
          </g>

          <circle r="38" className="hero-art-pulse hero-art-pulse--wear-watch" />
        </g>

        <text x="180" y="530" className="hero-art-label hero-art-label--found" textAnchor="middle">3–5 STATES</text>
        <text x="180" y="542" className="hero-art-label hero-art-label--sm" textAnchor="middle">5 DEMO SCENARIOS</text>
      </svg>
    </div>
  );
}

/**
 * Zero Miles picture: two Flutter clients (Bear + Bunny) meet through an
 * atomic pairing RPC that locks a hashed token FOR UPDATE inside Postgres.
 * Postgres is the backend — RLS boundary, Realtime out to both phones, plus
 * a database webhook down to a JWT-verifying Deno edge function that mints an
 * OAuth2 token and POSTs FCM HTTP v1.
 */
function ZeroMilesHeroArt() {
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="Zero Miles architecture: two Flutter clients pair through an atomic PL/pgSQL RPC that locks a hashed token FOR UPDATE inside Postgres; row-level security bounds the whole database; realtime streams flow back to both phones and a database webhook drives a JWT-verified Deno edge function that pushes via FCM HTTP v1."
      >
        {/* Card frame + 3 zones */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="150" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="168" width="340" height="222" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="398" width="340" height="150" rx="12" className="hero-art-zone hero-art-zone--client" />
        <text x="22" y="26" className="hero-art-zone-label">TWO CLIENTS · FLUTTER</text>
        <text x="22" y="184" className="hero-art-zone-label">POSTGRES IS THE BACKEND</text>
        <text x="22" y="414" className="hero-art-zone-label">PUSH · WEBHOOK → EDGE → FCM</text>

        {/* BEAR phone */}
        <g transform="translate(90, 88)">
          <rect x="-18" y="-30" width="36" height="60" rx="5" className="hero-art-node hero-art-node--accent" />
          <rect x="-14" y="-22" width="28" height="42" rx="3" className="hero-art-phone-screen" />
          <rect x="-4" y="-26" width="8" height="1.5" rx=".7" className="hero-art-phone-detail" />
          <circle cx="0" cy="24" r="1.5" className="hero-art-phone-detail" />
          <text x="0" y="0" className="hero-art-chip-label" textAnchor="middle">BEAR</text>
          <circle r="26" className="hero-art-pulse hero-art-pulse--zm-bear" />
        </g>
        <text x="90" y="140" className="hero-art-label hero-art-label--sm" textAnchor="middle">FLUTTER</text>

        {/* BUNNY phone */}
        <g transform="translate(270, 88)">
          <rect x="-18" y="-30" width="36" height="60" rx="5" className="hero-art-node hero-art-node--accent" />
          <rect x="-14" y="-22" width="28" height="42" rx="3" className="hero-art-phone-screen" />
          <rect x="-4" y="-26" width="8" height="1.5" rx=".7" className="hero-art-phone-detail" />
          <circle cx="0" cy="24" r="1.5" className="hero-art-phone-detail" />
          <text x="0" y="0" className="hero-art-chip-label" textAnchor="middle">BUNNY</text>
          <circle r="26" className="hero-art-pulse hero-art-pulse--zm-bunny" />
        </g>
        <text x="270" y="140" className="hero-art-label hero-art-label--sm" textAnchor="middle">FLUTTER</text>

        {/* Bear → Postgres pair wire */}
        <path d="M 90 120 L 180 230" className="hero-art-wire" />
        <path d="M 90 120 L 180 230" pathLength="1" className="hero-art-flow" style={delay(0.4)} />

        {/* Bunny → Postgres pair wire */}
        <path d="M 270 120 L 180 230" className="hero-art-wire" />
        <path d="M 270 120 L 180 230" pathLength="1" className="hero-art-flow" style={delay(0.45)} />

        <text x="180" y="200" className="hero-art-label hero-art-label--sm" textAnchor="middle">PAIR · ATOMIC RPC</text>

        {/* RLS shield boundary — dashed blue outline around the Postgres area */}
        <rect x="26" y="212" width="308" height="170" rx="14" className="hero-art-rls-shield" />
        <text x="316" y="226" className="hero-art-label hero-art-label--arc" textAnchor="end">RLS</text>

        {/* POSTGRES cylinder */}
        <g transform="translate(180, 250)">
          <ellipse cx="0" cy="-10" rx="34" ry="7" className="hero-art-node hero-art-node--accent" />
          <path d="M -34 -10 L -34 10" className="hero-art-node-edge" />
          <path d="M 34 -10 L 34 10" className="hero-art-node-edge" />
          <path d="M -34 10 A 34 7 0 0 0 34 10" className="hero-art-node-edge" />
          <ellipse cx="0" cy="-3" rx="34" ry="7" className="hero-art-node-band" />
          <ellipse cx="0" cy="4" rx="34" ry="7" className="hero-art-node-band" />
          <ellipse cx="0" cy="-10" rx="34" ry="7" className="hero-art-pulse hero-art-pulse--zm-postgres" />
        </g>
        <text x="180" y="274" className="hero-art-label hero-art-label--sm" textAnchor="middle">POSTGRES</text>

        {/* pairing_tokens pill with FOR UPDATE hint */}
        <g transform="translate(180, 302)">
          <rect x="-90" y="-9" width="180" height="18" rx="9" className="hero-art-pill" />
          <text x="0" y="4" className="hero-art-pill-label" textAnchor="middle">pairing_tokens · FOR UPDATE</text>
          <rect x="-90" y="-9" width="180" height="18" rx="9" className="hero-art-pulse hero-art-pulse--zm-token" />
        </g>

        {/* Other table pills */}
        <g transform="translate(80, 328)">
          <rect x="-42" y="-7" width="84" height="14" rx="7" className="hero-art-pill" />
          <text x="0" y="3" className="hero-art-pill-label" textAnchor="middle">love_drops</text>
        </g>
        <g transform="translate(180, 328)">
          <rect x="-42" y="-7" width="84" height="14" rx="7" className="hero-art-pill" />
          <text x="0" y="3" className="hero-art-pill-label" textAnchor="middle">couples</text>
        </g>
        <g transform="translate(280, 328)">
          <rect x="-42" y="-7" width="84" height="14" rx="7" className="hero-art-pill" />
          <text x="0" y="3" className="hero-art-pill-label" textAnchor="middle">+9 MORE</text>
        </g>

        <text x="180" y="358" className="hero-art-label hero-art-label--arc" textAnchor="middle">12 TABLES · 29 MIGRATIONS · 11 RPCs</text>
        <text x="180" y="372" className="hero-art-label hero-art-label--sm" textAnchor="middle">pgcrypto SHA-256 · SECURITY DEFINER</text>

        {/* Realtime streams back to phones (curved dashed arcs) */}
        <path d="M 148 246 Q 90 200 90 130" className="hero-art-wire hero-art-wire--dashed" />
        <path d="M 148 246 Q 90 200 90 130" pathLength="1" className="hero-art-flow" style={delay(2.0)} />
        <path d="M 212 246 Q 270 200 270 130" className="hero-art-wire hero-art-wire--dashed" />
        <path d="M 212 246 Q 270 200 270 130" pathLength="1" className="hero-art-flow" style={delay(2.05)} />
        <text x="180" y="392" className="hero-art-label hero-art-label--sm" textAnchor="middle">REALTIME · WEBSOCKET → BOTH DEVICES</text>

        {/* Webhook wire: Postgres → Deno */}
        <path d="M 180 268 L 180 400 L 100 448" className="hero-art-wire" />
        <path d="M 180 268 L 180 400 L 100 448" pathLength="1" className="hero-art-flow" style={delay(2.8)} />

        {/* DENO edge function with JWT-verify glyph */}
        <g transform="translate(100, 458)">
          <rect x="-46" y="-16" width="92" height="32" rx="6" className="hero-art-node" />
          <path d="M -32 -8 L -27 -12 L -22 -8 L -22 -2 Q -22 3 -27 6 Q -32 3 -32 -2 Z" className="hero-art-shield" />
          <path d="M -30 -4 L -28 -1 L -24 -6" className="hero-art-shield-check" />
          <text x="8" y="-2" className="hero-art-node-label" textAnchor="middle">DENO</text>
          <text x="8" y="10" className="hero-art-node-label" textAnchor="middle">JWT ✓</text>
          <rect x="-46" y="-16" width="92" height="32" rx="6" className="hero-art-pulse hero-art-pulse--zm-deno" />
        </g>

        {/* Deno → FCM wire */}
        <path d="M 146 458 L 214 458" className="hero-art-wire" />
        <path d="M 146 458 L 214 458" pathLength="1" className="hero-art-flow" style={delay(3.6)} />

        {/* FCM node */}
        <g transform="translate(260, 458)">
          <rect x="-46" y="-16" width="92" height="32" rx="6" className="hero-art-node hero-art-node--accent" />
          <text x="0" y="-2" className="hero-art-node-label" textAnchor="middle">FCM</text>
          <text x="0" y="10" className="hero-art-node-label" textAnchor="middle">HTTP v1</text>
          <rect x="-46" y="-16" width="92" height="32" rx="6" className="hero-art-pulse hero-art-pulse--zm-fcm" />
        </g>

        {/* Push return indicator */}
        <text x="180" y="506" className="hero-art-label hero-art-label--found" textAnchor="middle">PUSH → BOTH DEVICES</text>
        <text x="180" y="522" className="hero-art-label hero-art-label--sm" textAnchor="middle">OAUTH2 · SERVICE ACCOUNT · CALLER JWT VERIFIED</text>
      </svg>
    </div>
  );
}

const DERMA_TOOLS = [
  { x: 66,  y: 250, label: "ask_user" },
  { x: 180, y: 250, label: "web_search" },
  { x: 294, y: 250, label: "ingredient_info" },
  { x: 66,  y: 292, label: "check_conflicts" },
  { x: 180, y: 292, label: "shelf_photo" },
  { x: 294, y: 292, label: "critic_pass" },
] as const;

/**
 * DermaAssist picture: a ReAct agent loop that interviews via ask_user,
 * searches with Serper, verifies against a deterministic 62-entry ingredient
 * checker, sees shelves with Pixtral, and critiques its own draft — every
 * step streamed as one of seven SSE event types.
 */
function DermaAssistHeroArt() {
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="DermaAssist architecture: a user query enters a ReAct agent loop that runs six tools (ask_user, web_search, get_ingredient_info, check_routine_conflicts, analyze_shelf_photo, critic_pass); a deterministic 62-entry ingredient checker guards the verify step; every step streams as one of seven SSE event types; the output is a routine plus a critic diff."
      >
        {/* Card frame + 3 zones */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="130" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="148" width="340" height="248" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="404" width="340" height="144" rx="12" className="hero-art-zone hero-art-zone--client" />
        <text x="22" y="26" className="hero-art-zone-label">USER QUERY · SSE STREAM</text>
        <text x="22" y="164" className="hero-art-zone-label">REACT LOOP · 6 TOOLS · KB</text>
        <text x="22" y="420" className="hero-art-zone-label">OUTPUT · ROUTINE + CRITIC DIFF</text>

        {/* USER */}
        <g transform="translate(60, 80)" className="hero-art-person">
          <circle cx="0" cy="-6" r="7" />
          <path d="M -8 8 Q 0 2 8 8 L 6 20 L -6 20 Z" />
        </g>
        <text x="60" y="120" className="hero-art-label hero-art-label--sm" textAnchor="middle">USER</text>

        {/* CHAT BUBBLE */}
        <g transform="translate(210, 80)">
          <rect x="-70" y="-20" width="140" height="40" rx="10" className="hero-art-node" />
          <path d="M -60 20 L -66 28 L -50 20 Z" className="hero-art-node" />
          <text x="0" y="-4" className="hero-art-node-label" textAnchor="middle">build me a</text>
          <text x="0" y="8" className="hero-art-node-label" textAnchor="middle">skincare routine</text>
          <circle r="52" className="hero-art-pulse hero-art-pulse--da-user" />
        </g>

        {/* Wire: query → agent */}
        <path d="M 180 100 L 180 178" className="hero-art-wire" />
        <path d="M 180 100 L 180 178" pathLength="1" className="hero-art-flow" style={delay(0.4)} />
        <text x="188" y="140" className="hero-art-label hero-art-label--sm">SSE OPEN</text>

        {/* AGENT brain glyph */}
        <g transform="translate(180, 196)">
          <ellipse cx="0" cy="0" rx="32" ry="18" className="hero-art-node hero-art-node--accent" />
          <path d="M -20 -6 Q -12 -14 -4 -8 M -4 -8 Q 4 -14 12 -8 M 12 -8 Q 20 -14 22 -4" className="hero-art-glyph hero-art-glyph--accent" />
          <path d="M -20 4 Q -12 12 -4 6 M -4 6 Q 4 12 12 6 M 12 6 Q 20 12 22 2" className="hero-art-glyph hero-art-glyph--accent" />
          <text x="0" y="3" className="hero-art-chip-label" textAnchor="middle">AGENT</text>
          <ellipse cx="0" cy="0" rx="32" ry="18" className="hero-art-pulse hero-art-pulse--da-agent" />
        </g>

        {/* 6 tool pills — perceive/reason/act/verify */}
        {DERMA_TOOLS.map((tool, i) => (
          <g key={tool.label} transform={`translate(${tool.x}, ${tool.y})`}>
            <rect x="-48" y="-9" width="96" height="18" rx="9" className="hero-art-pill" />
            <text x="0" y="3" className="hero-art-pill-label" textAnchor="middle">{tool.label}</text>
            <rect x="-48" y="-9" width="96" height="18" rx="9" className={`hero-art-pulse hero-art-pulse--da-tool-${i + 1}`} />
          </g>
        ))}

        {/* Wires from agent to each tool row */}
        {DERMA_TOOLS.map((tool, i) => (
          <g key={`w-${i}`}>
            <path d={`M 180 214 L ${tool.x} ${tool.y - 9}`} className="hero-art-wire" />
            <path d={`M 180 214 L ${tool.x} ${tool.y - 9}`} pathLength="1" className="hero-art-flow" style={delay(1.4 + i * 0.15)} />
          </g>
        ))}

        {/* 62-entry checker shield around the verify column (check_conflicts) */}
        <rect x="20" y="278" width="94" height="30" rx="10" className="hero-art-rls-shield" />
        <text x="66" y="322" className="hero-art-label hero-art-label--arc" textAnchor="middle">KB</text>

        {/* Pixtral badge next to shelf_photo */}
        <text x="180" y="322" className="hero-art-label hero-art-label--sm" textAnchor="middle">PIXTRAL</text>

        {/* Critic emphasis */}
        <text x="294" y="322" className="hero-art-label hero-art-label--arc" textAnchor="middle">CRITIC PASS</text>

        {/* SSE event legend */}
        <text x="180" y="350" className="hero-art-label hero-art-label--arc" textAnchor="middle">7 SSE EVENTS</text>
        <text x="180" y="364" className="hero-art-label hero-art-label--sm" textAnchor="middle">text · tool_start · tool_end · critique · diff · routine · done</text>

        {/* Wire: agent → routine */}
        <path d="M 180 378 L 180 442" className="hero-art-wire" />
        <path d="M 180 378 L 180 442" pathLength="1" className="hero-art-flow" style={delay(3.8)} />

        {/* ROUTINE CARD */}
        <g transform="translate(180, 480)">
          <rect x="-90" y="-30" width="180" height="60" rx="8" className="hero-art-node hero-art-node--accent" />
          <text x="-80" y="-14" className="hero-art-chip-label">ROUTINE</text>
          <rect x="-80" y="-8" width="160" height="1" className="hero-art-detail" />
          <path d="M -76 4 L -72 8 L -66 -2" className="hero-art-shield-check" />
          <text x="-58" y="6" className="hero-art-pill-label">AM · cleanser · SPF</text>
          <path d="M -76 20 L -72 24 L -66 14" className="hero-art-shield-check" />
          <text x="-58" y="22" className="hero-art-pill-label">PM · retinol · moisturizer</text>
          <rect x="-90" y="-30" width="180" height="60" rx="8" className="hero-art-pulse hero-art-pulse--da-routine" />
        </g>

        <text x="180" y="530" className="hero-art-label hero-art-label--found" textAnchor="middle">CRITIC DIFF · 2 CHANGES</text>
      </svg>
    </div>
  );
}

/**
 * Dynamic Mock Server picture: endpoints.json is the API; chokidar watches it
 * and hot-reloads new routes into an Express registry without restarting the
 * process; the Android app on the same Wi-Fi keeps its Retrofit base URL and
 * hits new endpoints the moment the file saves.
 */
function MockServerHeroArt() {
  return (
    <div className="case-hero-art">
      <svg
        viewBox="0 0 360 560"
        role="img"
        aria-label="Dynamic Mock Server architecture: endpoints.json defines the whole API; chokidar watches the file; Express hot-reloads new routes into an in-memory registry with zero process restarts; an Android device on the same Wi-Fi hits the routes through Retrofit."
      >
        {/* Card frame + 3 zones */}
        <rect x="2" y="2" width="356" height="556" rx="18" className="hero-art-frame" />
        <rect x="10" y="10" width="340" height="160" rx="12" className="hero-art-zone hero-art-zone--client" />
        <rect x="10" y="178" width="340" height="222" rx="12" className="hero-art-zone hero-art-zone--backend" />
        <rect x="10" y="408" width="340" height="140" rx="12" className="hero-art-zone hero-art-zone--client" />
        <text x="22" y="26" className="hero-art-zone-label">SOURCE · CONFIG-AS-API</text>
        <text x="22" y="194" className="hero-art-zone-label">EXPRESS · HOT-RELOAD REGISTRY</text>
        <text x="22" y="424" className="hero-art-zone-label">DEVICE · SAME WI-FI · RETROFIT</text>

        {/* endpoints.json FILE */}
        <g transform="translate(150, 90)">
          <path d="M -48 -30 L 32 -30 L 48 -16 L 48 30 L -48 30 Z" className="hero-art-node hero-art-node--accent" />
          <path d="M 32 -30 L 32 -16 L 48 -16" className="hero-art-node-edge" />
          <text x="0" y="-14" className="hero-art-chip-label" textAnchor="middle" style={{ fontSize: 8, letterSpacing: 0 }}>endpoints.json</text>
          <rect x="-40" y="-6" width="72" height="1.5" className="hero-art-detail" />
          <rect x="-40" y="0" width="60" height="1.5" className="hero-art-detail" />
          <rect x="-40" y="6" width="66" height="1.5" className="hero-art-detail" />
          <rect x="-40" y="12" width="52" height="1.5" className="hero-art-detail" />
          <rect x="-40" y="18" width="66" height="1.5" className="hero-art-detail" />
          <path d="M -48 -30 L 32 -30 L 48 -16 L 48 30 L -48 30 Z" className="hero-art-pulse hero-art-pulse--mock-file" />
        </g>

        {/* chokidar EYE watcher */}
        <g transform="translate(268, 90)">
          <path d="M -22 0 Q 0 -18 22 0 Q 0 18 -22 0 Z" className="hero-art-node" />
          <circle r="7" className="hero-art-watch-face" />
          <circle r="3" className="hero-art-service-core" />
          <path d="M -22 0 Q 0 -18 22 0 Q 0 18 -22 0 Z" className="hero-art-pulse hero-art-pulse--mock-eye" />
        </g>
        <text x="268" y="130" className="hero-art-label hero-art-label--sm" textAnchor="middle">chokidar</text>

        {/* File → Server wire (chokidar triggers reload) */}
        <path d="M 150 122 L 180 214" className="hero-art-wire" />
        <path d="M 150 122 L 180 214" pathLength="1" className="hero-art-flow" style={delay(0.6)} />
        <text x="220" y="155" className="hero-art-label hero-art-label--sm">WATCH → RELOAD</text>

        {/* EXPRESS SERVER (rack style) */}
        <g transform="translate(180, 240)">
          <rect x="-40" y="-24" width="80" height="48" rx="6" className="hero-art-node hero-art-node--accent" />
          <rect x="-32" y="-16" width="64" height="8" rx="2" className="hero-art-detail" />
          <rect x="-32" y="-4" width="64" height="8" rx="2" className="hero-art-detail" />
          <rect x="-32" y="8" width="64" height="8" rx="2" className="hero-art-detail" />
          <circle cx="-24" cy="-12" r="1.4" className="hero-art-detail-dot" />
          <circle cx="-24" cy="0" r="1.4" className="hero-art-detail-dot" />
          <circle cx="-24" cy="12" r="1.4" className="hero-art-detail-dot" />
          <rect x="-40" y="-24" width="80" height="48" rx="6" className="hero-art-pulse hero-art-pulse--mock-server" />
        </g>
        <text x="180" y="278" className="hero-art-label hero-art-label--sm" textAnchor="middle">EXPRESS · Node.js</text>

        {/* Route pills */}
        <g transform="translate(180, 300)">
          <rect x="-90" y="-8" width="180" height="16" rx="8" className="hero-art-pill" />
          <text x="0" y="4" className="hero-art-pill-label" textAnchor="middle">GET /api/endpoints</text>
        </g>
        <g transform="translate(180, 322)">
          <rect x="-90" y="-8" width="180" height="16" rx="8" className="hero-art-pill" />
          <text x="0" y="4" className="hero-art-pill-label" textAnchor="middle">POST /api/watch/ping</text>
          <rect x="-90" y="-8" width="180" height="16" rx="8" className="hero-art-pulse hero-art-pulse--mock-route" />
        </g>
        <g transform="translate(180, 344)">
          <rect x="-90" y="-8" width="180" height="16" rx="8" className="hero-art-pill" />
          <text x="0" y="4" className="hero-art-pill-label" textAnchor="middle">+ N registered · Set&lt;method:url&gt;</text>
        </g>

        <text x="180" y="374" className="hero-art-label hero-art-label--arc" textAnchor="middle">0 RESTARTS · TYPE-CHECKED BODIES</text>

        {/* Server → Wi-Fi → Device */}
        <path d="M 180 400 L 180 440" className="hero-art-wire" />
        <path d="M 180 400 L 180 440" pathLength="1" className="hero-art-flow" style={delay(2.6)} />

        {/* Wi-Fi arcs */}
        <g transform="translate(180, 456)">
          <path d="M -28 0 Q 0 -18 28 0" className="hero-art-wave" />
          <path d="M -20 8 Q 0 -6 20 8" className="hero-art-wave" />
          <path d="M -10 14 Q 0 8 10 14" className="hero-art-wave" />
          <circle cx="0" cy="18" r="2" className="hero-art-detail-dot" />
        </g>
        <text x="180" y="490" className="hero-art-label hero-art-label--sm" textAnchor="middle">SAME WI-FI · RETROFIT</text>

        {/* ANDROID phone */}
        <g transform="translate(180, 512)">
          <rect x="-18" y="-16" width="36" height="32" rx="4" className="hero-art-node hero-art-node--accent" />
          <rect x="-14" y="-12" width="28" height="22" rx="2" className="hero-art-phone-screen" />
          <path d="M -6 -3 L -1 2 L 6 -5" className="hero-art-shield-check" />
          <rect x="-18" y="-16" width="36" height="32" rx="4" className="hero-art-pulse hero-art-pulse--mock-device" />
        </g>
        <text x="180" y="540" className="hero-art-label hero-art-label--found" textAnchor="middle">HTTP 200 · JSON</text>
      </svg>
    </div>
  );
}
