type Kind = "bff" | "fmm" | "etl" | "wear" | "pairing" | "notify" | "agent" | "mock";

const captions: Record<Kind, string> = {
  bff: "Fig. 01 — Clients talk to a GraphQL BFF; REST remains for existing consumers.",
  fmm: "Fig. 01 — Frequent Watch operations skip the cloud hop.",
  etl: "Fig. 02 — Health JSON becomes Parquet through SQS and autoscale workers.",
  wear: "Fig. 01 — Phone extracts; Watch renders lifecycle cards.",
  pairing: "Fig. 01 — One RPC: hash, lock, attach, burn.",
  notify: "Fig. 02 — Insert commits first; the webhook notifies later.",
  agent: "Fig. 01 — Perceive, reason, act, verify — streamed as SSE.",
  mock: "Fig. 01 — endpoints.json is the API; chokidar is deploy.",
};

function Nodes({ labels, accentAt }: { labels: string[]; accentAt?: number }) {
  return (
    <div className="flow">
      {labels.map((label, i) => (
        <span key={`${label}-${i}`} style={{ display: "contents" }}>
          {i > 0 ? (
            <span className="arrow-d" aria-hidden="true">
              →
            </span>
          ) : null}
          <span className={i === accentAt ? "node accent" : "node"}>{label}</span>
        </span>
      ))}
    </div>
  );
}

export function Diagram({ kind }: { kind: Kind }) {
  return (
    <figure className="diagram">
      {kind === "bff" ? <Nodes labels={["Android / web", "GraphQL BFF", "10 services", "PostgreSQL"]} accentAt={1} /> : null}
      {kind === "fmm" ? (
        <Nodes labels={["Galaxy Watch", "direct radio", "phone", "FMM"]} accentAt={1} />
      ) : null}
      {kind === "etl" ? (
        <Nodes labels={["22 JSON schemas", "SQS", "ECS 0–10", "Parquet / S3"]} accentAt={2} />
      ) : null}
      {kind === "wear" ? (
        <Nodes labels={["notification", "on-device LLM", "7–10 fields", "Wear card"]} accentAt={1} />
      ) : null}
      {kind === "pairing" ? (
        <Nodes labels={["raw token", "SHA-256", "FOR UPDATE", "couple row"]} accentAt={2} />
      ) : null}
      {kind === "notify" ? (
        <Nodes labels={["insert love_drop", "DB webhook", "Deno + OAuth2", "FCM v1"]} accentAt={1} />
      ) : null}
      {kind === "agent" ? (
        <Nodes labels={["ask / see", "ReAct + Mistral", "tools", "critic"]} accentAt={3} />
      ) : null}
      {kind === "mock" ? (
        <Nodes labels={["endpoints.json", "chokidar", "Express route", "Android"]} accentAt={1} />
      ) : null}
      <figcaption>{captions[kind]}</figcaption>
    </figure>
  );
}
