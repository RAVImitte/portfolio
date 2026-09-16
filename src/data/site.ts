import type { Role } from "./role";
import { stripEdition } from "./role";

export const site = {
  name: "Ravi Shankar Mitte",
  shortName: "Ravi Mitte",
  role: "Senior Software Engineer",
  company: "Samsung",
  location: "Bangalore, India",
  email: "ravimitte616@gmail.com",
  phone: "+91 70139 85445",
  links: {
    github: "https://github.com/RAVImitte",
    linkedin: "https://linkedin.com/in/ravimitte",
    huggingface: "https://huggingface.co/ravimitte",
  },
  resumes: {
    backend: { label: "Backend resume", href: "/resumes/backend.pdf" },
    android: { label: "Android resume", href: "/resumes/android.pdf" },
  },
  nav: [
    { to: "/", label: "Index" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
  ],
};

export type CaseIndexItem = {
  no: string;
  to: string;
  kicker: string;
  title: string;
  dek: string;
  flipId: string;
  lead?: boolean;
};

type PieceEdition = {
  no: string;
  kicker: string;
  dek: string;
  lead?: boolean;
};

type Piece = {
  to: string;
  title: string;
  flipId: string;
  editions: Record<Role, PieceEdition>;
};

const pieces: Piece[] = [
  {
    to: "/work/living-labs",
    title: "Living Labs",
    flipId: "title-living-labs",
    editions: {
      backend: {
        no: "01",
        kicker: "Samsung · Backend",
        dek: "Ten services, a GraphQL BFF, idempotent writes, and an SQS-to-Parquet pipeline on a live health platform.",
        lead: true,
      },
      android: {
        no: "05",
        kicker: "Samsung · APIs the clients call",
        dek: "I owned the contracts a page actually hits — GraphQL BFF and REST — so a screen is one query, not a fan-out.",
      },
    },
  },
  {
    to: "/work/find-my-mobile",
    title: "Find My Mobile",
    flipId: "title-fmm",
    editions: {
      backend: {
        no: "05",
        kicker: "Samsung · The hop I removed",
        dek: "The interesting backend story is the one I cut: frequent phone-to-Watch commands no longer travel through the server.",
      },
      android: {
        no: "01",
        kicker: "Samsung · Android / Wear / XR",
        dek: "Device-to-device Find My Mobile on Watch, then the same product on Android XR glasses from a blank page.",
        lead: true,
      },
    },
  },
  {
    to: "/work/wearable-intelligence",
    title: "Wearable Intelligence",
    flipId: "title-wearable",
    editions: {
      backend: {
        no: "06",
        kicker: "Samsung · On-device pipeline",
        dek: "Unstructured notification in, 7–10 attributes out. The Watch is the last mile, not the model host.",
      },
      android: {
        no: "02",
        kicker: "Samsung · Wear OS POC",
        dek: "A Wear OS card machine: on-device LLM extracts the event, listener services carry it, the wrist shows 3–5 states.",
        lead: true,
      },
    },
  },
  {
    to: "/projects/zero-miles",
    title: "Zero Miles",
    flipId: "title-zero-miles",
    editions: {
      backend: {
        no: "02",
        kicker: "Independent · Postgres is the backend",
        dek: "Pairing is a locked RPC, auth is RLS, push is a webhook — no Node process in the middle.",
        lead: true,
      },
      android: {
        no: "03",
        kicker: "Independent · Flutter",
        dek: "A Flutter app for two people — pairing, realtime streams, FCM — with the hard problems pushed into Postgres.",
        lead: true,
      },
    },
  },
  {
    to: "/projects/derma-assist",
    title: "DermaAssist",
    flipId: "title-derma",
    editions: {
      backend: {
        no: "03",
        kicker: "Independent · FastAPI agent",
        dek: "A ReAct loop with SSE: tools, a deterministic safety checker, and a critic pass — not a chat wrapper.",
        lead: true,
      },
      android: {
        no: "06",
        kicker: "Independent · Live trace UI",
        dek: "Not a mobile app. The craft is the same: a stream you can watch while the agent thinks, not a spinner that lies.",
      },
    },
  },
  {
    to: "/projects/dynamic-mock-server",
    title: "Dynamic Mock Server",
    flipId: "title-mock",
    editions: {
      backend: {
        no: "04",
        kicker: "Independent · Desk tooling",
        dek: "JSON-defined REST that hot-reloads. Configuration as the API, file-watch as deploy.",
      },
      android: {
        no: "04",
        kicker: "Independent · Android tooling",
        dek: "Edit endpoints.json, save, hit Retrofit on the same Wi-Fi. Android work never waited on a missing service.",
      },
    },
  },
];

export function featuredFor(role: Role): CaseIndexItem[] {
  return pieces
    .map((piece) => ({
      to: piece.to,
      title: piece.title,
      flipId: piece.flipId,
      ...piece.editions[role],
    }))
    .sort((a, b) => a.no.localeCompare(b.no, undefined, { numeric: true }));
}

export function pageTitle(path: string): string {
  const clean = stripEdition(path);
  const piece = pieces.find((item) => item.to === clean);
  if (piece) return piece.title;
  const nav = site.nav.find((item) => item.to === clean);
  if (nav) return nav.label;
  return site.shortName;
}

export function transitionDir(from: string, to: string): 1 | -1 {
  const fromPath = stripEdition(from);
  const toPath = stripEdition(to);
  const depth = (path: string) => path.split("/").filter(Boolean).length;
  if (toPath === "/") return -1;
  if (fromPath !== toPath && fromPath.startsWith(`${toPath}/`)) return -1;
  if (depth(toPath) < depth(fromPath)) return -1;
  return 1;
}
