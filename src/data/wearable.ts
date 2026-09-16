import type { CaseStudy } from "./types";

export const wearable: CaseStudy = {
  slug: "wearable-intelligence",
  kicker: "Samsung · Wear OS proof of concept",
  title: "Wearable Intelligence",
  flipId: "title-wearable",
  dek: "A phone-and-Watch proof of concept: a small on-device model reads notifications and calendar text, extracts structured event attributes, and the Watch plays them back as cards that change with the life of the event.",
  lenses: {
    backend: {
      dek: "Extraction as a pipeline, not a prompt: unstructured text in, a small schema out, 30% faster than regex and generic models.",
      frame:
        "The model is on the phone. The interesting system is the contract between that extraction and the Watch: 7–10 attributes, five demo scenarios, a listener path. It is a POC — that distinction stays on this page.",
      stackLead: ["On-device LLM", "Background processing"],
    },
    android: {
      dek: "A Wear OS product: listener services, lifecycle-aware cards with 3–5 states, and an on-device model that has to finish before the wrist drops.",
      frame:
        "Read this for the wrist: cards that change from booking to day-of to post-event, carried by Wear OS listener services. The LLM is a means. The demo is a state machine a human can tap.",
      stackLead: ["Kotlin", "Android", "Wear OS", "Android Services"],
    },
  },
  role: "Senior Software Engineer — on-device LLM, Wear OS, phone-to-watch pipeline",
  timeframe: "Samsung · proof of concept",
  chapters: [
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "A Watch is a terrible place to read a 40-line notification. The useful part of that text is almost always a handful of fields: what, when, where, who, what to do next. Regex and generic models were either brittle or slow, and they did not know the difference between a booking confirmation and a day-of reminder.",
    "The POC had to feel native on Wear OS. Extracted events needed to become cards with states, not a dump of JSON on a round screen.",
  ],
  constraints: [
    "On-device. The model has to fit and run on the phone; the Watch is the display and the interaction, not the GPU.",
    "Unstructured input: notifications and calendar events, not a clean API.",
    "Five demo scenarios, not an infinite domain. Depth on those paths mattered more than a general assistant.",
    "Cards have a life cycle. A booking, a reminder, and a post-event note are the same event in different clothes.",
  ],
  built: [
    "An Android and Wear OS proof of concept that analysed notifications and calendar events with a lightweight on-device LLM, extracting 7–10 meaningful attributes from unstructured text.",
    "Domain-specific training data and an optimized on-device model for event-information extraction, cutting feature-extraction latency by 30% against earlier regex and generic-model baselines.",
    "An end-to-end phone-to-Watch intelligence pipeline across five demo scenarios, syncing extracted event data through Wear OS listener services.",
    "Lifecycle-aware Wear OS cards with 3–5 states per event type — status, content, messaging, and action buttons that change across booking confirmation, day-of reminders, and post-event updates.",
  ],
  hardParts: [
    {
      title: "Extraction is a product problem, not just a model problem",
      body: [
        "Seven to ten attributes is a deliberate ceiling. Enough to drive a card (title, time, place, people, action, confidence, source, a couple of domain fields), not so many that the Watch becomes a form. The training data was generated for this schema so the model was not asked to be a general summarizer.",
        "Latency dropped 30% versus regex and generic-model approaches. On a Watch pipeline, that is the difference between the card being there when the wrist rises and the card arriving after the user has already looked down.",
      ],
    },
    {
      title: "The Watch is a state machine",
      body: [
        "Wear OS listener services carry the structured event from the phone. The card is not a static tile. Each event type has three to five states: the booking confirmation is not the day-of reminder, and neither is the post-event note. Status, copy, and actions swap with the state.",
        "That is the demo. Not “an LLM on a Watch,” but a pipeline that turns messy text into a small number of states a human can act on with one tap.",
      ],
    },
  ],
  metrics: [
    { value: "7–10", label: "event attributes extracted from unstructured text", focus: ["backend", "android"] },
    { value: "30%", numeric: 30, suffix: "%", label: "lower extraction latency vs regex / generic models", focus: "backend" },
    { value: "5", numeric: 5, label: "end-to-end demo scenarios" },
    { value: "3–5", label: "card states per event type", focus: "android" },
  ],
  outcomes: [
    "The POC showed a complete loop: notification in, structured event out, Watch card that knows what stage of the event it is in. It is a proof of concept, not a shipped Galaxy feature — that distinction stays on this page.",
  ],
  stack: [
    "Kotlin",
    "Android",
    "Wear OS",
    "On-device LLM",
    "Android Services",
    "Background processing",
  ],
};
