export const projectBriefs: Record<string, { status: string; problem: string; contribution: string; result: string }> = {
  "living-labs": {
    status: "Samsung · Backend platform",
    problem: "Every screen made several REST calls across ten services, and existing REST clients couldn’t break.",
    contribution: "Built the API contracts and a GraphQL BFF that composes those services into one client query.",
    result: "45% fewer client calls, 60% smaller payloads, and no existing REST caller had to change.",
  },
  "find-my-mobile": {
    status: "Samsung · Android / Wear OS / Android XR",
    problem: "Every phone↔Watch command paid for a cloud round-trip it didn’t need.",
    contribution: "Rebuilt the phone↔Watch path as direct device-to-device, and shipped Find My Mobile on Android XR glasses from scratch.",
    result: "About 80% less latency, request success from 92% to 98%, ANRs to 0% on the refactored surface.",
  },
  "wearable-intelligence": {
    status: "Samsung · Proof of concept",
    problem: "A 40-line notification on a Watch is unreadable — only 7–10 fields actually matter.",
    contribution: "Built an on-device LLM that extracts those attributes on the phone, and Wear OS listener services that render them as lifecycle-aware cards.",
    result: "One pipeline end-to-end: 30% lower extraction latency, 5 demo scenarios, 3–5 card states per event type.",
  },
  "zero-miles": {
    status: "Independent · Flutter product",
    problem: "Two clients had to pair atomically, share private data, and never see each other’s rows.",
    contribution: "Built the Flutter client and put the hard invariants in Postgres — atomic pairing RPC, row-level security on every table, database-webhook FCM push.",
    result: "11 tables under RLS, 8 PL/pgSQL RPCs, ~75% fewer round-trips on the pairing path — no Node layer needed.",
  },
  "derma-assist": {
    status: "Independent · Educational demo",
    problem: "A skincare chatbot guesses; an agent needs to interview, search, verify against a hard-coded checker, and critique its own draft — with every step visible.",
    contribution: "Built the FastAPI ReAct loop (6 tools + critic pass), the deterministic 62-entry ingredient checker, and the React SSE trace UI.",
    result: "A seven-event stream shows every tool call; chip popovers surface conflicts; a critic diff shows what changed — all in one Hugging Face Space Docker image.",
  },
  "dynamic-mock-server": {
    status: "Independent · Development tool",
    problem: "Android feature work stalled when a promised endpoint wasn’t ready — and stubbing inside the app leaked mock shape into production code.",
    contribution: "Built a small Express server whose entire API lives in one endpoints.json; chokidar hot-reloads new routes with zero restarts.",
    result: "Add a route in git, save the file, hit it from Retrofit on the same Wi-Fi. Zero restarts, zero mock code in the shipped app.",
  },
};
