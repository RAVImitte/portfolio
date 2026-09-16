import type { CaseStudy } from "./types";

export const zeroMiles: CaseStudy = {
  slug: "zero-miles",
  kicker: "Independent · Flutter + Supabase",
  title: "Zero Miles",
  flipId: "title-zero-miles",
  dek: "A private space for two people. Pairing is a cryptographic token with a row lock. Authorization is Postgres RLS. Push is a webhook, not a request on the write path. I designed the product and the backend.",
  lenses: {
    backend: {
      dek: "No API process. Pairing is a PL/pgSQL RPC with FOR UPDATE. Auth is RLS. Push is a database webhook to FCM.",
      frame:
        "Read the SQL. Eleven tables, nineteen migrations, eight RPCs, a recursive-RLS bug I had to rewrite. Metrics for pairing hops are from the design of that path, not a production load test — said here so it is not said later.",
      stackLead: ["PostgreSQL", "Row-Level Security", "PL/pgSQL", "Deno Edge Functions"],
    },
    android: {
      dek: "A Flutter client for two people — streams instead of polling, FCM instead of a spinner, pairing that cannot double-spend a token.",
      frame:
        "Read this for the app: Flutter on Android and iOS, WebSocket streams on the live tables, FCM HTTP v1 from an edge function after the row is in. The hard lock lives in Postgres so two taps cannot make two couples.",
      stackLead: ["Flutter", "Dart", "WebSockets", "FCM HTTP v1"],
    },
  },
  role: "Solo — product, Flutter client, Postgres, edge functions",
  timeframe: "2026 · personal project, public repo",
  chapters: [
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "Long-distance couples already have chat. What they do not have is a small, exclusive room that is only theirs: one daily question, one photo they cannot see until they have posted their own, a mood, a tap that means kiss or sorry, a ping that means call me.",
    "The product constraint is intimacy. The engineering constraint is that two clients must never see the wrong partner’s data, must not redeem the same pairing token twice, and must hear about a love drop without polling a server.",
  ],
  constraints: [
    "Two users per couple. Multi-tenant isolation is the whole authorization model.",
    "No traditional API process. The backend is Postgres (PostgREST + RLS + RPCs), Deno edge functions, and pg_cron.",
    "Pairing tokens are secrets. They are stored as SHA-256 hashes, not plaintext.",
    "Mobile radios are expensive. Live state uses WebSocket streams, not HTTP polling.",
    "Honest about traffic: there is no production-user metric in the repo. Numbers below are from the design of the pairing and realtime paths, not from a live fleet.",
  ],
  built: [
    "Flutter client (Android and iOS) for pairing, daily questions, outfit/photo sharing, love drops, moods, connection signals, and later sanctuary-home scenes (V2/V3): puppets, talk banner, widget, voice drops, shared canvas.",
    "Eleven relational tables, nineteen versioned SQL migrations, eight PL/pgSQL RPCs, one Deno edge function for FCM, one nightly pg_cron job for daily questions.",
    "Row-level security on every table, with a dedicated migration to break recursive RLS.",
    "Couple pairing as a single atomic RPC: hash the token, lock the row, attach both profiles, invalidate the token.",
    "Database webhooks on love_drops, moods, and connection_signals that fire the edge function, which mints a Google OAuth2 token and calls FCM HTTP v1.",
  ],
  hardParts: [
    {
      title: "Pairing without a race",
      body: [
        "A pairing token is time-limited and single-use. Two taps at the same moment must not create two couples or leave the token half-spent. join_couple_with_token runs as one PL/pgSQL RPC under a transaction. It selects the hashed token FOR UPDATE, so the second redeemer waits, sees a spent row, and fails cleanly.",
        "The token never sits in the database in plaintext. Incoming raw tokens are digested with SHA-256 and compared to token_hash. Four sequential client queries (read token, check expiry, attach user, burn token) collapse into one round-trip — about 75% fewer network hops on that path.",
      ],
    },
    {
      title: "Authorization at the table, not in middleware",
      body: [
        "There is no Node layer to ‘check the session.’ PostgREST exposes the tables. RLS policies use auth.uid() so a user can read and write only rows that belong to their couple. Recursive policies were a real bug; a later migration rewrote them so Postgres would not chase its own SELECT during a policy check.",
        "RPCs that need to step outside the caller’s RLS (pairing, account deletion) are SECURITY DEFINER and still narrow: they do one job, then return. The client never gets a service role key.",
      ],
    },
    {
      title: "Push that is not on the write path",
      body: [
        "A love drop insert should be a short transaction. Notification is someone else’s problem. A database webhook fires the Deno function after the row is in. The function builds a localized payload, fetches an OAuth2 access token from the Firebase service account, and POSTs to FCM HTTP v1.",
        "If FCM is slow, the couple still has the row. The edge function logs webhook payload, token resolution, and FCM response. Secrets come from Deno.env, not from the repo.",
      ],
    },
    {
      title: "Realtime instead of polling",
      body: [
        "The Flutter repositories subscribe with Supabase .stream() on primary keys. Moods, drops, and pairing state arrive over the WebSocket. That is a 100% cut of empty HTTP polls on those features — a design number, not a production profiler screenshot, and it is labelled as such.",
      ],
    },
  ],
  metrics: [
    { value: "11", numeric: 11, label: "relational tables under RLS", focus: "backend" },
    { value: "19", numeric: 19, label: "versioned SQL migrations", focus: "backend" },
    { value: "8", numeric: 8, label: "PL/pgSQL RPCs", focus: "backend" },
    { value: "75%", numeric: 75, suffix: "%", label: "fewer round-trips on pairing", focus: ["backend", "android"] },
    { value: "20+", numeric: 20, suffix: "+", label: "API surfaces (REST + RPC + edge)", focus: "android" },
  ],
  outcomes: [
    "V1 is the private loop: pair, ask, show, tap, ping. V2 added the couple scene, talk banner, moods, Android widget, voice, shared canvas. V3 (3.0.0+3, 8 Sep 2026) shipped sanctuary home — living windows, dock, love-note cloud, overlapping puppets.",
    "Limits I will say out loud: the public repo has no backend test suite, and I do not claim production MAU. The interesting engineering is the pairing lock, the RLS model, and the webhook-to-FCM path — all of which you can read in SQL and TypeScript without leaving this page.",
  ],
  stack: [
    "Flutter",
    "Dart",
    "PostgreSQL",
    "Supabase",
    "PostgREST",
    "Row-Level Security",
    "PL/pgSQL",
    "Deno Edge Functions",
    "pg_cron",
    "FCM HTTP v1",
    "WebSockets",
  ],
  sources: [
    { label: "GitHub — RAVImitte/Zer0Mi1es", href: "https://github.com/RAVImitte/Zer0Mi1es" },
  ],
  note: "Metrics for pairing round-trips and polling are from the architecture of those paths, not from a production load test.",
};
