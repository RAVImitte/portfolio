import type { CaseStudy } from "./types";

export const findMyMobile: CaseStudy = {
  slug: "find-my-mobile",
  kicker: "Samsung · Android / Wear OS / Android XR",
  title: "Find My Mobile",
  flipId: "title-fmm",
  dek: "Find My Mobile is a commercial Samsung product. I took the most frequent phone-to-Watch operations off the server, rebuilt the communication path as device-to-device, and then owned the same feature on Android XR glasses from a blank page.",
  lenses: {
    backend: {
      dek: "The backend story is the hop I removed. Frequent phone-to-Watch commands no longer travel through the cloud.",
      frame:
        "Read this for the cut: device-to-device instead of server-mediated requests. Measured on the operations that actually fire — about 80% less latency, success from 92% to 98%. The rest of the page is how the devices hold that path.",
      stackLead: ["Android Services", "Kotlin"],
    },
    android: {
      dek: "Wear OS services, a Kotlin cut that took ANR to 0% on those components, and Find My Mobile on Android XR glasses from a blank page.",
      frame:
        "Read this for the shipping client: process lifetimes, battery, ANR, and an XR surface that is not a stretched phone layout. Architecture, design, development, and deploy of the glasses path were owned end to end.",
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
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "The operations people actually use — locate, ring, lock, the short list that fires from a Watch — were travelling phone → cloud → Watch. Every extra hop was latency, a failure surface, and a reason the request died when the network was merely bad rather than gone.",
    "The same product then had to exist on a first-of-its-kind Android XR device (Project Moohan / VST). There was no inherited phone UI to stretch. The glasses needed a communication architecture with the companion phone, designed for that form factor, not ported from a 6-inch activity.",
  ],
  constraints: [
    "This is a shipping Samsung feature, not a demo. Success rate and ANR are user-visible, not dashboard trivia.",
    "Wear OS and phone run different process lifetimes. A Watch request cannot assume the phone activity is in the foreground.",
    "Battery on both ends. A chatty keep-alive that looks fine on USB power fails in the field.",
    "Legacy Java in the hot path was a source of ANRs. Kotlin was the destination, not a style preference.",
    "XR had no prior FMM surface. Architecture, design, development, and deployment of that path were owned end to end.",
  ],
  built: [
    "Redesigned the end-to-end communication architecture for FMM phone-to-Watch operations: direct device-to-device instead of server-mediated requests.",
    "Owned architecture, design, development, and deployment of Find My Mobile for Android XR glasses, including the communication path between the XR device and the companion phone.",
    "Refactored legacy Java components to Kotlin and trimmed execution paths until ANR incidents on those components sat at 0%.",
    "Held 80%+ unit test coverage across FMM components with JUnit and Mockito through production releases.",
  ],
  hardParts: [
    {
      title: "Taking the server off the hot path",
      body: [
        "The frequent operations did not need a cloud round-trip to be correct. They needed the phone and the Watch to agree, quickly, on a short command. Direct device-to-device cut that path. Measured on the operations that actually fire: about 80% less latency, request success from 92% to 98%.",
        "The remaining 2% is the honest remainder — devices out of range, radios off, the cases a server could not have saved either. The win is that the common case no longer pays for a hop it does not use.",
      ],
    },
    {
      title: "ANR to zero is a path-length problem",
      body: [
        "ANRs on this surface were not mysterious. Legacy Java components did too much on the wrong thread, and the call graph had grown by accretion. Kotlin let us make the hot path explicit: work that blocks the main thread moved off it, and the remaining work got shorter.",
        "Runtime efficiency and battery followed the same cut. Fewer wakeups, less time with the radio up, less work after the user already has their answer. Tests (JUnit, Mockito) stayed above 80% so the next refactor did not reintroduce the hitch.",
      ],
    },
    {
      title: "XR is not a small phone",
      body: [
        "Project Moohan (VST) is a first-of-its-kind Android XR device. FMM on glasses cannot be a density-independent pixel of the phone app. The communication architecture between the XR device and the companion phone had to be designed for that pairing: who initiates, what lives on-device, what the user can actually confirm when they are looking through a display instead of tapping a list.",
        "I owned that feature from the ground up. The recognition (Project of the Year, R&D) is for the device programme; the engineering claim here is narrower and mine: the FMM surface and the phone–glasses path.",
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
    "Galaxy Watch 8 shipped with this work in the commercial path — Star of the Quarter for that commercialization, Team Awesome twice for FMM.",
    "The XR surface exists as a designed product path, not a stretched phone layout. Certificate of Appreciation, Project of the Year (R&D), for Moohan / VST.",
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
