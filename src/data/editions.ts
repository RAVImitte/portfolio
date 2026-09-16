import type { Role } from "./role";
import type { SkillBlock } from "./types";

export type EditionCopy = {
  documentTitle: string;
  description: string;
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

const languagesBackend = ["Java", "Kotlin", "Python", "SQL", "TypeScript", "JavaScript", "Dart"];
const languagesAndroid = ["Kotlin", "Java", "Dart", "Python", "SQL", "TypeScript", "JavaScript"];

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
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "AWS S3", "Parquet"],
  },
  {
    label: "Cloud & delivery",
    items: ["AWS", "SQS", "ECS", "Lambda", "Docker", "Jenkins", "CI/CD"],
  },
  {
    label: "Observability & test",
    items: ["Grafana", "CloudWatch", "New Relic", "JUnit", "Mockito"],
  },
  {
    label: "Mobile",
    items: [
      "Android",
      "Wear OS",
      "Android XR",
      "Flutter",
      "Android Services",
      "Background processing",
      "Cross-device communication",
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
      "Background processing",
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
    items: ["SQLite", "AWS", "SQS", "ECS", "Docker", "CI/CD"],
  },
  {
    label: "Observability & test",
    items: ["Grafana", "CloudWatch", "JUnit", "Mockito", "New Relic"],
  },
];

export const edition: Record<Role, EditionCopy> = {
  backend: {
    documentTitle: "Ravi Shankar Mitte — Backend",
    description:
      "Ravi Shankar Mitte — Senior Software Engineer, backend. Java, Spring, GraphQL, PostgreSQL, AWS. Samsung Living Labs, plus independent systems.",
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
      "I write services that have to survive other people’s retries — contracts, queues, and the night the dashboard goes red.",
    aboutBody: [
      "Most of my time is Samsung in Bangalore: a ten-service health platform I still watch in Grafana. The device work is on the index because it shipped; it is not the sentence this page leads with.",
      "The six long pieces are on the index. Independent work also has its own Projects page. This page is the person, the tenure, school, and the skill list. Phone number stays on the PDFs.",
    ],
    footerLine: "Backend · Samsung",
    cvPrimary: "backend",
    skills: backendSkills,
  },
  android: {
    documentTitle: "Ravi Shankar Mitte — Android",
    description:
      "Ravi Shankar Mitte — Senior Software Engineer, Android / Wear OS / Android XR. Find My Mobile, Wearable Intelligence, Flutter systems.",
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
      "I write software that has to survive a bad radio — phones, watches, glasses, and the process that is still alive when the activity is not.",
    aboutBody: [
      "Most of my time is Samsung in Bangalore: Find My Mobile on Watch and on Android XR glasses, plus a Wear OS intelligence POC. The health-platform backend is on the index because I still own it; it is not the sentence this page leads with.",
      "The six long pieces are on the index. Independent work also has its own Projects page. This page is the person, the tenure, school, and the skill list. Phone number stays on the PDFs.",
    ],
    footerLine: "Android / Wear / XR · Samsung",
    cvPrimary: "android",
    skills: androidSkills,
  },
};
