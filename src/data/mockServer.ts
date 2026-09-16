import type { CaseStudy } from "./types";

export const mockServer: CaseStudy = {
  slug: "dynamic-mock-server",
  kicker: "Independent · Android tooling",
  title: "Dynamic Mock Server",
  flipId: "title-mock",
  dek: "A small Express server that reads its entire API from a JSON file and reloads routes when that file changes. I built it so Android work did not sit waiting on a backend that was not ready.",
  lenses: {
    backend: {
      dek: "Configuration as the API. Express reads endpoints.json, validates bodies, hot-reloads with chokidar. A desk tool, said as one.",
      frame:
        "Read this for the small idea: the file is the contract, reload is deploy, a bad POST is a 400. I would not ship the CORS-* process as a platform — that limit is on the page so a backend desk does not have to ask.",
      stackLead: ["Node.js", "Express", "JSON schema-ish validation"],
    },
    android: {
      dek: "I built it so Android work did not sit on a missing endpoint. Edit the JSON, save, hit Retrofit. Zero restarts.",
      frame:
        "The point was the phone on the desk. Stubbing inside the app leaks mock shape into production code. This kept Retrofit pointed at a laptop on the same Wi-Fi while the real service caught up.",
      stackLead: ["Node.js", "Express", "CORS"],
    },
  },
  role: "Solo — Node, Express, Android-facing mocks",
  timeframe: "2025 · public repo",
  chapters: [
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "Android feature work often blocked on an endpoint that did not exist yet. Stubbing inside the app leaks mock shape into production code. A separate mock server is better — if adding a route does not mean restarting the process and losing the session you were in the middle of.",
    "I wanted a file I could edit, save, and hit from Retrofit on the same Wi-Fi, with the contract (method, URL, request types, response body) sitting in one JSON document.",
  ],
  constraints: [
    "Local network, not the public internet. CORS open, no auth. That is correct for a device on the desk and wrong for anything else.",
    "Restarting Node was the thing to avoid. Endpoint changes had to be a file-watch, not a nodemon cycle.",
    "Validation had to be good enough that a bad POST from the app failed with 400, not with a 200 and a lie.",
  ],
  built: [
    "Express server. endpoints.json defines url, method, request schema, and response body. A Set keyed by method:url prevents duplicate registration.",
    "chokidar watches the JSON file, reloads, and registers new routes without killing the process.",
    "Type checks on query params and JSON bodies (string, number, boolean). Failures collect into a 400.",
    "Static HTML harness plus a Postman collection so you can poke the API without the Android client.",
    "GET /api/endpoints lists whatever is currently loaded, which is the discovery story for the app.",
  ],
  hardParts: [
    {
      title: "Reload is the feature",
      body: [
        "Nodemon restarts the process. That is fine for server.js edits and fatal for ‘I just added /api/watch/ping.’ chokidar fires on endpoints.json; loadEndpoints() re-reads, skips keys already in the registry, and mounts the rest. The Android app keeps its base URL.",
      ],
    },
    {
      title: "What I would not ship as-is",
      body: [
        "The registry is in-memory, CORS is *, there is no auth, no rate limit, no clustered deployment. A serious version would store endpoints in a database, issue tokens to devices, and generate OpenAPI from the same schema. This repo is a desk tool. I am not dressing it up as a platform.",
      ],
    },
  ],
  metrics: [
    { value: "0", numeric: 0, label: "restarts required to add a route" },
    { value: "1", numeric: 1, label: "JSON file as the source of truth" },
  ],
  outcomes: [
    "It unblocked Android work: new contracts lived in git, the phone talked to a laptop, and the real backend could catch up without stalling the UI.",
    "The interesting idea is still the small one — configuration as the API, file-watch as deploy.",
  ],
  stack: ["Node.js", "Express", "chokidar", "CORS", "JSON schema-ish validation"],
  sources: [
    { label: "GitHub — RAVImitte/DynamicMockServer", href: "https://github.com/RAVImitte/DynamicMockServer" },
  ],
};
