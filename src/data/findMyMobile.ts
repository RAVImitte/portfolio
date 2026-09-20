import type { CaseStudy } from "./types";

export const findMyMobile: CaseStudy = {
  slug: "find-my-mobile",
  kicker: "Samsung · Android / Wear OS / Android XR",
  title: "Find My Mobile",
  flipId: "title-fmm",
  dek: "Find My Mobile is a commercial Samsung product. I took the most frequent phone↔Watch operations off the cloud, rebuilt the path as direct device-to-device, and then owned the same feature on Android XR glasses from a blank page.",
  lenses: {
    backend: {
      dek: "The backend story is the hop I removed. Frequent phone↔Watch commands go direct — no cloud round-trip on the common case.",
      frame:
        "The cut: device-to-device instead of a server round-trip. Measured on the operations that actually fire — about 80% less latency, success 92% → 98%. The rest of the page is how the devices hold that path together.",
      stackLead: ["Android Services", "Kotlin"],
    },
    android: {
      dek: "Wear OS services, a Kotlin cut that took ANRs to 0% on those components, and Find My Mobile on Android XR glasses — shipped from a blank page.",
      frame:
        "The shipping client side: process lifetimes, battery, ANR, and an XR surface that isn’t a stretched phone layout. Architecture, design, development, and deploy of the glasses path — owned end to end.",
      stackLead: ["Kotlin", "Android", "Wear OS", "Android XR", "Android Services"],
    },
  },
  role: "Senior Software Engineer — Android, Wear OS, Android XR, cross-device communication",
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
    "The operations people actually use — locate, ring, lock — were travelling phone → cloud → Watch. Every extra hop was latency, a new failure surface, and a reason the request died when the network was merely bad, not gone.",
    "The same product then had to exist on a first-of-its-kind Android XR device (Project Moohan). There was no inherited phone UI to stretch. The glasses needed their own communication path to the companion phone — designed for the form factor, not ported from a 6-inch screen.",
  ],
  constraints: [
    "This is a shipping Samsung feature, not a demo. Success rate and ANR are user-visible, not dashboard trivia.",
    "Wear OS and phone run different process lifetimes. A Watch request can’t assume the phone is even in the foreground.",
    "Battery on both ends. A chatty keep-alive that looks fine on USB power fails in the field.",
    "Legacy Java in the hot path was a source of ANRs. Kotlin was the destination, not a style preference.",
    "XR had no prior FMM surface. Architecture, design, development, and deploy — owned end to end.",
  ],
  built: [
    "Redesigned the phone↔Watch communication path for the frequent FMM operations — direct device-to-device instead of a cloud round-trip.",
    "Owned Find My Mobile on Android XR glasses end to end — architecture, design, development, deploy, and the phone↔glasses path.",
    "Refactored legacy Java to Kotlin and trimmed the hot paths until ANRs on those components sat at 0%.",
    "Held 80%+ unit test coverage (JUnit, Mockito) across FMM components through production releases.",
  ],
  hardParts: [
    {
      title: "Taking the server off the hot path",
      body: [
        "The frequent operations don’t need a cloud round-trip to be correct. They need the phone and the Watch to agree, quickly, on a short command. Direct device-to-device is that path. Measured on the operations that actually fire: about 80% less latency, request success from 92% to 98%.",
        "The remaining 2% is the honest remainder — devices out of range, radios off, cases a server couldn’t have saved either. The win: the common case stopped paying for a hop it doesn’t need.",
      ],
    },
    {
      title: "ANR to zero is a path-length problem",
      body: [
        "ANRs on this surface weren’t mysterious. Legacy Java did too much on the wrong thread, and the call graph had grown by accretion. Kotlin let us make the hot path explicit: blocking work moved off the main thread, and what stayed on it got shorter.",
        "Runtime and battery followed the same cut — fewer wakeups, less radio-up time, less work after the user already had their answer. Tests (JUnit, Mockito) stayed above 80% so the next refactor couldn’t quietly reintroduce the hitch.",
      ],
    },
    {
      title: "XR is not a small phone",
      body: [
        "Project Moohan is a first-of-its-kind Android XR device. FMM on glasses can’t just be a scaled-up copy of the phone app. The phone↔glasses communication had to be designed for that pairing: who initiates, what lives on-device, what the user can actually confirm when they’re looking through a display instead of tapping a list.",
        "I owned that feature from the ground up. The Project of the Year (R&D) recognition is for the wider device programme; my engineering claim is narrower and mine: the FMM surface and the phone↔glasses path.",
      ],
    },
  ],
  metrics: [
    { value: "80%", numeric: 80, suffix: "%", label: "lower operation latency, phone ↔ Watch", focus: ["android", "backend"] },
    { value: "98%", numeric: 98, suffix: "%", label: "request success (from 92%)", focus: ["android", "backend"] },
    { value: "0%", numeric: 0, suffix: "%", label: "ANR incidents after the Kotlin cut", focus: "android" },
    { value: "80%", numeric: 80, suffix: "%+", label: "unit test coverage on FMM components", focus: "android" },
  ],
  outcomes: [
    "Galaxy Watch 8 shipped with this work in the commercial path.",
    "The XR surface exists as a designed product path, not a stretched phone layout.",
    "Recognition: Star of the Quarter — Galaxy Watch 8 commercialization.",
    "Recognition: Team Awesome — Find My Mobile.",
    "Recognition: Certificate of Appreciation, Project of the Year (R&D) — Moohan (Android XR).",
  ],
  stack: [
    "Kotlin",
    "Java",
    "Android",
    "Wear OS",
    "Android XR",
    "Android Services",
    "JUnit",
    "Mockito",
  ],
};
