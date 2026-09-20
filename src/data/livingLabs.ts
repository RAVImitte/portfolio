import type { CaseStudy } from "./types";

export const livingLabs: CaseStudy = {
  slug: "living-labs",
  kicker: "Samsung · Backend",
  title: "Living Labs",
  flipId: "title-living-labs",
  dek: "I owned backend services on a live health platform — API contracts, a GraphQL BFF that cut client calls by 45%, and a pipeline that turned 22 JSON schemas into query-ready Parquet.",
  lenses: {
    backend: {
      dek: "Ten services on a live health platform. A GraphQL BFF, retry-safe writes, and an SQS→Parquet pipeline I still watch in Grafana.",
      frame:
        "Service boundaries, a BFF that stays thin, writes that survive retries, and an ingest path that doesn’t lose records. The numbers below come off the same production dashboards the team runs incidents on.",
      stackLead: ["Java", "Spring Boot", "GraphQL", "PostgreSQL", "AWS SQS", "ECS"],
    },
    android: {
      dek: "I owned the contracts a client actually calls — GraphQL and REST — so a screen is one query, not a fan-out across ten services.",
      frame:
        "This is a backend platform, but the part clients feel is the contract: 45% fewer round-trips, 60% smaller payloads, and existing REST callers untouched.",
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
    { id: "hard", label: "Challenges" },
    { id: "outcomes", label: "Outcomes" },
    { id: "stack", label: "Stack" },
  ],
  problem: [
    "Living Labs sits behind a family of clients that all needed the same health and lab data in different shapes. Talking to ten services directly meant every screen made several round-trips, paid for fields it would never render, and inherited every downstream timeout.",
    "On the data side, health events landed as JSON across 22 schemas. Analytics couldn’t query them cheaply, and every integration was a one-off dump — one team, one script, no shared contract. The platform had to serve interactive APIs and a reliable analytics feed without the two jobs colliding in the same request path.",
  ],
  constraints: [
    "Ten microservices, not a monolith. Boundaries and contracts had to stay explicit as the surface grew.",
    "10,000+ users on the production path. Not hyperscale, but enough that p95 and cache hit-rate moved on the weekly Grafana review.",
    "Existing REST clients couldn’t break. The GraphQL BFF had to sit beside REST, not replace it overnight.",
    "Health data is sticky: writes had to be safe to retry, concurrent updates had to be safe, and the ingest path couldn’t drop a record.",
    "Whoever shipped it, watched it — same engineer across CI/CD, incidents, Grafana, CloudWatch, and traces.",
  ],
  built: [
    "Backend services across the ten-service mesh: boundaries, API contracts, PostgreSQL schema, and transactional workflows.",
    "A stateless GraphQL BFF, end to end. One client query in, several downstream REST calls out — and the existing REST surface kept working.",
    "REST APIs: request and response models, validation on the model itself, database integration, error handling, additive versioning, and writes that survive retries under concurrent clients.",
    "A health-data pipeline: 22 JSON schemas transformed to Parquet, SQS-backed workers, ECS tasks that scale 0 → 10 with the queue. One path replaced a folder of one-off dumps.",
    "Production lifecycle: CI/CD across dev, staging, and prod; incidents in Grafana and CloudWatch; test coverage from 45% to 85% with unit, integration, and failure-mode tests.",
  ],
  hardParts: [
    {
      title: "A BFF that doesn’t become a second monolith",
      body: [
        "The BFF exists to cut round-trips, not to hide a messy domain. Every resolver maps to a real service I already owned on the REST side. Composition lives at the BFF; authorization and persistence stay in the services that own the tables.",
        "That split let REST clients keep their existing calls. The BFF is a new surface, not a rewrite. Result: 45% fewer client-side calls, 60% smaller payloads, and no flag day.",
      ],
    },
    {
      title: "Writes that survive retries",
      body: [
        "Health updates arrive twice all the time — retries, double taps, overlapping sessions. Every write takes a client-supplied key and lands as a transactional upsert, so a second delivery of the same event never creates a duplicate row or a half-written record.",
        "Validation sits on the request model, not buried in a controller. Invalid bodies fail closed. New fields land additively with explicit deprecation, so old clients never get silently reinterpreted.",
      ],
    },
    {
      title: "p95 from 500 ms to 400 ms",
      body: [
        "A 20% cut on p95 wasn’t a rewrite. Three boring moves: tighten the hot PostgreSQL queries Grafana was already blaming, stop the BFF from calling a downstream service the query didn’t need, and cache the read shapes that almost never change within a session.",
        "Valkey held the cache. Before and after came off the same Grafana boards the team runs incidents on — not a local benchmark.",
      ],
    },
    {
      title: "An ingest path that doesn’t lose records",
      body: [
        "Twenty-two schemas of health JSON make a bad warehouse. The pipeline lands them as Parquet — about 80% less storage and columnar scans that actually finish. Ingest runs off SQS: a failed transform returns the message to the queue, it doesn’t vanish into a log line.",
        "ECS scales workers 0 → 10 with the queue. When nothing needs draining, nothing runs. One path — same schemas, same encoding, same retry contract — replaced a folder of one-off jobs.",
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
    "Recognition: Team Awesome award — Living Labs backend platform, Samsung.",
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
