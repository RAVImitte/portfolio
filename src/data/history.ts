import type { Role } from "./role";

export type TimelineKind = "work" | "education" | "milestone";

export type TimelineTrack = {
  title: string;
  bullets?: string[];
  href?: string;
  hrefLabel?: string;
};

export type TimelineHonor = {
  title: string;
  detail: string;
};

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  year: string;
  when: string;
  duration: string;
  place: string;
  org: string;
  title: string;
  current?: boolean;
  summary?: string | string[];
  skills?: string[];
  tracks?: TimelineTrack[];
  honors?: TimelineHonor[];
  editions?: Partial<
    Record<
      Role,
      {
        summary?: string | string[];
        skills?: string[];
        tracks?: TimelineTrack[];
      }
    >
  >;
};

export const history: TimelineEntry[] = [
  {
    id: "samsung",
    kind: "work",
    year: "2023",
    when: "Mar 2023 – present",
    duration: "3 yrs+",
    place: "Bangalore, India",
    org: "Samsung",
    title: "Senior Software Engineer",
    current: true,
    summary:
      "Backend platforms and connected-device software — Living Labs (10-service mesh + GraphQL BFF), Find My Mobile across Android / Wear / XR, and a Wear OS on-device LLM prototype.",
    skills: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "GraphQL",
      "PostgreSQL",
      "Android",
      "Wear OS",
      "Android XR",
      "AWS",
    ],
    tracks: [
      {
        title: "Living Labs — backend",
        href: "/work/living-labs",
        hrefLabel: "Case study",
      },
      {
        title: "Find My Mobile — Android / Wear / XR",
        href: "/work/find-my-mobile",
        hrefLabel: "Case study",
      },
      {
        title: "Wearable Intelligence — Wear OS POC",
        href: "/work/wearable-intelligence",
        hrefLabel: "Case study",
      },
    ],
    editions: {
      backend: {
        summary:
          "Living Labs backend end-to-end — ten microservices, a GraphQL BFF cutting client calls by 45%, and an SQS→Parquet pipeline. Plus Find My Mobile: the device-to-device path for the frequent commands.",
        skills: [
          "Java",
          "Spring Boot",
          "GraphQL",
          "PostgreSQL",
          "AWS",
          "Kotlin",
          "Android",
          "Wear OS",
          "Android XR",
        ],
        tracks: [
          {
            title: "Living Labs — backend",
            href: "/work/living-labs",
            hrefLabel: "Case study",
          },
          {
            title: "Find My Mobile — the hop I removed",
            href: "/work/find-my-mobile",
            hrefLabel: "Case study",
          },
          {
            title: "Wearable Intelligence — on-device pipeline",
            href: "/work/wearable-intelligence",
            hrefLabel: "Case study",
          },
        ],
      },
      android: {
        summary:
          "Find My Mobile end-to-end on Android, Wear OS and Android XR (the XR path built from a blank page). Plus a Wear OS on-device LLM proof of concept and backend work on Living Labs.",
        skills: [
          "Kotlin",
          "Android",
          "Wear OS",
          "Android XR",
          "Java",
          "Spring Boot",
          "GraphQL",
          "PostgreSQL",
          "AWS",
        ],
        tracks: [
          {
            title: "Find My Mobile — Android / Wear / XR",
            href: "/work/find-my-mobile",
            hrefLabel: "Case study",
          },
          {
            title: "Wearable Intelligence — Wear OS POC",
            href: "/work/wearable-intelligence",
            hrefLabel: "Case study",
          },
          {
            title: "Living Labs — the APIs the clients call",
            href: "/work/living-labs",
            hrefLabel: "Case study",
          },
        ],
      },
    },
    honors: [
      {
        title: "Star of the Quarter",
        detail: "Galaxy Watch 8 commercialization.",
      },
      {
        title: "Team Awesome",
        detail: "Living Labs backend.",
      },
      {
        title: "Team Awesome",
        detail: "Find My Mobile.",
      },
      {
        title: "Project of the Year (R&D)",
        detail: "Project Moohan / VST, Android XR.",
      },
      {
        title: "SWC Professional + Advanced",
        detail: "Samsung software competency.",
      },

    ],
  },
  {
    id: "dazn",
    kind: "work",
    year: "2022",
    when: "Nov 2022 – Feb 2023",
    duration: "4 mo",
    place: "Hyderabad, India",
    org: "DAZN",
    title: "Associate Software Engineer",
    summary:
      "Monitored live-sports streaming performance in New Relic Dashboards, joined incident investigations, and wrote up post-mortems.",
    skills: ["New Relic", "SQL", "React", "TypeScript"],
  },
  {
    id: "cognizant",
    kind: "work",
    year: "2022",
    when: "Feb 2022 – Aug 2022",
    duration: "7 mo",
    place: "Hyderabad, India",
    org: "Cognizant",
    title: "Software Engineering Intern",
    summary: "Software engineering internship — built Salesforce CRM workflows with Apex and Visualforce.",
    skills: ["Salesforce", "Apex", "Visualforce", "CRM"],
  },
];

export const schoolHistory: TimelineEntry[] = [
  {
    id: "aws",
    kind: "milestone",
    year: "2024",
    when: "2024",
    duration: "Certs",
    place: "Amazon Web Services",
    org: "AWS",
    title: "Developer & Data Engineer — Associate",
    summary: "Two associate certifications in the same year.",
    skills: ["AWS Certified Developer", "AWS Certified Data Engineer"],
  },
  {
    id: "osmania",
    kind: "education",
    year: "2018",
    when: "2018 – 2022",
    duration: "4 yrs",
    place: "Hyderabad, India",
    org: "Osmania University",
    title: "B.Tech, Computer Science & Engineering",
    summary: [
      "Graduated with an 8 CGPA.",
      "Completed additional Coursera specializations in Android and Machine Learning.",
    ],
    skills: ["CSE", "8 CGPA"],
  },
];

/** Jobs, certs, school — newest first. One rail. */
export const record: TimelineEntry[] = [
  history[0],
  schoolHistory[0],
  ...history.slice(1),
  schoolHistory[1],
];
