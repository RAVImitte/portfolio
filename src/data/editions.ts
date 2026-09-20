import type { Role } from "./role";
import type { SkillBlock } from "./about";

export type EditionCopy = {
  documentTitle: string;
  description: string;
  identityLine: string;
  heroTitle: string;
  heroIntro: string;
  heroNow: string;
  heroExhibit: HeroExhibit;
  kicker: string;
  lede: string;
  meta: string[];
  indexHead: string;
  indexSub: string;
  projectsKicker: string;
  projectsLede: string;
  aboutKicker: string;
  aboutLead: string;
  aboutBody: string[];
  footerLine: string;
  cvPrimary: Role;
  skills: SkillBlock[];
};

export type HeroExhibit = {
  kind: "backend" | "android";
  no: "01";
  title: string;
  caseHref: string;
  summary: string;
  limitation: string;
  a11yDescription: string;
};

const languagesBackend = ["Java", "Python", "SQL", "TypeScript", "JavaScript"];
const languagesAndroid = ["Kotlin", "Java", "Dart", "Python", "SQL", "JavaScript"];

const backendSkills: SkillBlock[] = [
  { label: "Languages", items: languagesBackend },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Microservices",
      "REST",
      "GraphQL",
      "OpenFeign",
      "JPA / Hibernate",
      "Node.js",
      "FastAPI",
    ],
  },
  {
    label: "Distributed systems",
    items: ["Event-driven architecture", "Asynchronous processing", "Concurrency", "Idempotency", "Caching"],
  },
  {
    label: "Data & storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "AWS S3"],
  },
  {
    label: "Cloud & delivery",
    items: ["AWS", "SQS", "ECS", "Lambda", "Docker", "Jenkins", "CI/CD"],
  },
  {
    label: "Observability & test",
    items: ["Grafana", "New Relic", "JUnit"],
  },
  {
    label: "Mobile",
    items: [
      "Android",
      "Android XR",
      "Flutter",
    ],
  },
];

const androidSkills: SkillBlock[] = [
  { label: "Languages", items: languagesAndroid },
  {
    label: "Mobile",
    items: [
      "Android",
      "Wear OS",
      "Android XR",
      "Flutter",
      "Android Services",
      "Cross-device communication",
    ],
  },
  {
    label: "Client systems",
    items: ["ANR / performance", "Device-to-device", "FCM", "WebSockets"],
  },
  {
    label: "Backend I still own",
    items: ["Spring Boot", "REST", "GraphQL", "PostgreSQL", "FastAPI", "Node.js"],
  },
  {
    label: "Data & cloud",
    items: ["SQLite", "AWS", "SQS", "CI/CD"],
  },
  {
    label: "Observability & test",
    items: ["Grafana", "JUnit", "Mockito", "New Relic"],
  },
];

export const edition: Record<Role, EditionCopy> = {
  backend: {
    documentTitle: "Ravi Shankar Mitte — Backend",
    description:
      "Ravi Shankar Mitte — Senior Software Engineer, backend. Java, Spring, GraphQL, PostgreSQL, AWS. Samsung Living Labs, plus independent systems.",
    identityLine: "Ravi Mitte",
    heroTitle: "Clear contracts. Reliable services.",
    heroIntro:
      "I’m Ravi Mitte, a senior software engineer in Bangalore. I design service boundaries and client contracts that stay understandable through retries, changing requirements, and the ordinary uncertainty of production.",
    heroNow: "Now · Living Labs backend · exploring Android XR",
    heroExhibit: {
      kind: "backend",
      no: "01",
      title: "Living Labs",
      caseHref: "/work/living-labs",
      summary: "Compose client data through GraphQL while existing REST clients keep working.",
      limitation: "Complexity moves to composition; existing REST access remains.",
      a11yDescription:
        "A client reaches representative services through a GraphQL composition layer. Existing REST access remains visible as a previous direct route.",
    },
    kicker: "Senior Software Engineer · Backend · Java / Spring · Microservices · Samsung",
    lede:
      "I design the services other clients have to live with — Java and Spring, GraphQL composition, idempotent writes, and the data path after the request is over.",
    meta: [
      "Currently · Living Labs backend",
      "Also · devices, when the path needs them",
      "Open record · this site, not a PDF dump",
    ],
    indexHead: "Selected work",
    indexSub: "Six pieces, written out",
    projectsKicker: "Independent",
    projectsLede:
      "Systems I designed and built outside Samsung: a Postgres-backed couple app, a FastAPI agent, and a mock server that kept clients moving. The essays are on each title.",
    aboutKicker: "About",
    aboutLead:
      "I’m a software engineer in Bangalore, working on backend platforms and the APIs that connect them to products.",
    aboutBody: [
      "At Samsung, my work spans Living Labs backend services, GraphQL composition and data pipelines, alongside experience with connected devices.",
      "Outside work, I build independent products and tools: Zero Miles, a Flutter app backed by Postgres; DermaAssist, an educational agent demo; and a mock server for mobile development.",
    ],
    footerLine: "Backend · Samsung",
    cvPrimary: "backend",
    skills: backendSkills,
  },
  android: {
    documentTitle: "Ravi Shankar Mitte — Android",
    description:
      "Ravi Shankar Mitte — Senior Software Engineer, Android / Wear OS / Android XR. Find My Mobile, Wearable Intelligence, Flutter systems.",
    identityLine: "Ravi Mitte",
    heroTitle: "Connected devices. Reliable experiences.",
    heroIntro:
      "I’m Ravi Mitte, a senior software engineer in Bangalore. I build Android and Wear experiences whose phone-to-device paths remain clear when connection quality, process lifetime, and user attention all change.",
    heroNow: "Now · Wear OS · Android XR",
    heroExhibit: {
      kind: "android",
      no: "01",
      title: "Find My Mobile",
      caseHref: "/work/find-my-mobile",
      summary: "Move supported phone–watch operations onto a direct device path.",
      limitation: "Applies to supported operations and connectivity conditions.",
      a11yDescription:
        "A phone and watch communicate over a selected direct device path. A cloud relay remains visible as the previous route for context.",
    },
    kicker: "Senior Software Engineer · Android / Wear / XR · Samsung",
    lede:
      "I ship on the devices people actually hold — Android, Wear OS, Android XR — and the Flutter systems I own when the product is mine.",
    meta: [
      "Currently · Find My Mobile, Wear, XR",
      "Also · backends I still own",
      "Open record · this site, not a PDF dump",
    ],
    indexHead: "Selected work",
    indexSub: "Six pieces, written out",
    projectsKicker: "Independent",
    projectsLede:
      "Systems I designed and built outside Samsung: a Flutter couple app, a mock server so Android never waited, and an agent with a live trace UI. The essays are on each title.",
    aboutKicker: "About",
    aboutLead:
      "I’m a senior engineer in Bangalore. I ship Android on the surfaces people actually hold — phones, watches, XR glasses — plus the backend and Flutter systems.",
    aboutBody: [
      "At Samsung, my work includes Find My Mobile, Android XR and a Wear OS intelligence proof of concept. That experience spans device communication, background processing and the services behind the interface.",
      "My independent projects let me work across the full product, from a Flutter client to transactional pairing in Postgres and notification delivery.",
    ],
    footerLine: "Android / Wear / XR · Samsung",
    cvPrimary: "android",
    skills: androidSkills,
  },
};
