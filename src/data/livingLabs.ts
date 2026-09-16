import type { CaseStudy } from "./types";

export const livingLabs: CaseStudy = {
  slug: "living-labs",
  kicker: "Samsung · Backend",
  title: "Living Labs",
  flipId: "title-living-labs",
  dek: "I owned backend services on a production health platform: service boundaries, API contracts, a GraphQL BFF that made the clients quieter, and an ETL path that turned siloed JSON into analytics-ready Parquet.",
  lenses: {
    backend: {
      dek: "Ten microservices, a GraphQL BFF, idempotent REST, and an SQS-to-Parquet pipeline I still watch in Grafana.",
      frame:
        "Read this for service boundaries, the BFF that is not a second monolith, concurrent writes that stay idempotent, and the ETL path that cannot drop a record. The numbers are from the production mesh.",
      stackLead: ["Java", "Spring Boot", "GraphQL", "PostgreSQL", "AWS SQS", "ECS"],
    },
    android: {
      dek: "I owned the contracts a client actually calls — GraphQL and REST — so a page is one query, not a fan-out against ten services.",
      frame:
        "This is a backend platform. The Android-relevant claim is the contract: 45% fewer client round-trips and 60% smaller payloads, with REST consumers left unbroken. The rest of the page is how that surface was built.",
      stackLead: ["REST", "GraphQL", "Microservices"],
    },
  },
  role: "Senior Software Engineer — backend services, APIs, data pipeline, production ownership",
  timeframe: "March 2023 – present · Bangalore",
  chapters: [
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "Living Labs sits behind a family of clients that all needed the same health and lab data, but they did not need it in the same shape. Direct REST against a ten-service mesh meant each client assembled a page from several round-trips, paid for fields it would never render, and inherited every downstream timeout.",
    "On the data side, health events arrived as JSON across 22 schemas. Downstream analytics could not query that cheaply, and the integrations that did exist were siloed — one team, one dump, no shared contract. The platform had to serve interactive APIs and a reliable analytics feed without mixing those jobs in the same request path.",
  ],
  constraints: [
    "Ten microservices, not a monolith. Boundaries and contracts had to stay explicit as the surface grew.",
    "About 10,000+ users on the production path. Not hyperscale, but enough that p95 and cache hit-rate were visible in Grafana every week.",
    "Existing REST clients could not be broken. The GraphQL BFF had to sit beside REST, not replace it overnight.",
    "Health data is sticky: transactions had to be idempotent, concurrent writes had to be safe, and the ETL path could not drop records.",
    "The same engineer who designed the API also watched it in production — CI/CD across development, staging, and production, plus incident work in Grafana, CloudWatch, logs, and traces.",
  ],
  built: [
    "Backend services across the ten-service architecture: service boundaries, API contracts, PostgreSQL schema, and transactional workflows.",
    "A stateless GraphQL BFF, end to end, that consolidates downstream REST into a single client query while remaining compatible with the existing REST surface.",
    "REST APIs owned request/response models, validation, database integration, error handling, backward-compatible evolution, and concurrency-safe idempotent transactions.",
    "A health-data ETL pipeline: 22 schemas, JSON-to-Parquet, SQS-backed processing, ECS tasks that auto-scale from 0 to 10, replacing one-off integrations with one analytics-ready path.",
    "Production lifecycle: pipeline work across environments, incident investigation, and raising microservice test coverage from 45% to 85% with unit, integration, and failure-mode tests.",
  ],
  hardParts: [
    {
      title: "A BFF that does not become a second monolith",
      body: [
        "The GraphQL layer exists to cut chatter, not to hide a messy domain. Each field resolver maps onto a real downstream service with a contract I already owned on the REST side. Aggregation happens at the BFF; authorization and persistence stay in the services that own the tables.",
        "That split is why REST clients could keep calling the same endpoints. The BFF is an additional composition surface, not a rewrite. Measured result: 45% fewer client-side API calls and 60% smaller response payloads, with no flag day for existing consumers.",
      ],
    },
    {
      title: "Idempotent writes under concurrent clients",
      body: [
        "Health updates arrive more than once. Retries, double taps, and overlapping sessions are normal. The REST write path treats a logical operation as idempotent: a client-supplied key plus a transactional upsert, so a second delivery of the same event does not create a second row or a partial update.",
        "Validation lives with the request model, not in a controller comment. Invalid bodies fail closed. Backward-compatible evolution meant additive fields and explicit deprecation, not silent reinterpretation of existing JSON.",
      ],
    },
    {
      title: "p95 from 500 ms to 400 ms",
      body: [
        "A 20% cut on p95 is not a rewrite. It was three boring, measurable moves: tighten the hot PostgreSQL queries (the ones Grafana already blamed), stop the BFF from calling a downstream service that the query did not need, and put a service-specific cache in front of the read shapes that almost never change within a session.",
        "Valkey held those read-through entries. The validation was not a local benchmark — it was the same Grafana boards we used for incidents, before and after.",
      ],
    },
    {
      title: "ETL that cannot lose a record",
      body: [
        "Twenty-two schemas of health JSON are a poor warehouse format. The pipeline transforms to Parquet, which cut storage by about 80% and made columnar scans viable. Ingest is SQS: a failed transform returns the message, it does not vanish into a log line.",
        "ECS scales the workers from zero to ten tasks with the queue. When there is nothing to drain, we do not pay for a sitting fleet. The replacement for siloed dumps is this one path — same schemas, same encoding, same retry contract — not a folder of one-off jobs.",
      ],
    },
  ],
  metrics: [
    { value: "10", numeric: 10, suffix: "+", label: "microservices in the mesh", focus: "backend" },
    { value: "10K", numeric: 10, suffix: "K+", label: "users on the production path", focus: "backend" },
    { value: "45%", numeric: 45, suffix: "%", label: "fewer client API calls via the BFF", focus: ["backend", "android"] },
    { value: "60%", numeric: 60, suffix: "%", label: "smaller response payloads", focus: ["backend", "android"] },
    { value: "20%", numeric: 20, suffix: "%", label: "p95 latency cut (500 ms → 400 ms)", focus: "backend" },
    { value: "80%", numeric: 80, suffix: "%", label: "storage reduction, JSON → Parquet", focus: "backend" },
    { value: "85%", numeric: 85, suffix: "%", label: "microservice test coverage (from 45%)", focus: "backend" },
    { value: "22", numeric: 22, label: "health schemas in the ETL path", focus: "backend" },
  ],
  outcomes: [
    "Clients ask once and render. REST consumers were not migrated off a cliff. Analytics stopped living in side-channel dumps.",
    "The production loop is part of the job: CI/CD across development, staging, and production; incidents through Grafana, CloudWatch, logs, and traces; tests that include failure modes, not only the happy path.",
  ],
  stack: [
    "Java",
    "Spring Boot",
    "Microservices",
    "REST",
    "GraphQL",
    "PostgreSQL",
    "JPA / Hibernate",
    "OpenFeign",
    "AWS S3",
    "AWS SQS",
    "ECS",
    "Valkey",
    "Grafana",
    "CloudWatch",
    "Jenkins / CI/CD",
  ],
};
