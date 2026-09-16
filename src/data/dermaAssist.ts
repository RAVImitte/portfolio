import type { CaseStudy } from "./types";

export const dermaAssist: CaseStudy = {
  slug: "derma-assist",
  kicker: "Independent · Agentic AI",
  title: "DermaAssist",
  flipId: "title-derma",
  dek: "An agent that builds a skincare routine the way a careful human would: it asks what it does not know, searches the live web, checks ingredients against a hard-coded knowledge base, then criticises its own draft.",
  lenses: {
    backend: {
      dek: "FastAPI, SSE, six tools, a 62-entry checker the model cannot veto, and a critic pass. The loop is the system.",
      frame:
        "Read this for the agent server: perceive → reason → act → verify, streamed as seven event types. Safety that matters is deterministic JSON, not a prompt. No LangChain. The Space is one Docker image.",
      stackLead: ["Python", "FastAPI", "SSE", "SQLite", "Docker"],
    },
    android: {
      dek: "Not a mobile app. The craft is a live trace so every tool call is visible — the opposite of a spinner that lies.",
      frame:
        "The backend is the story. What transfers to a client desk is the streaming UI: tokens, tool starts, tool ends, critique, diff, routine. useAgentStream is the other half of the agent, not a loading state.",
      stackLead: ["React", "TypeScript", "SSE"],
    },
  },
  role: "Solo — agent loop, FastAPI, React UI, Docker Space",
  timeframe: "2026 · Hugging Face Space",
  chapters: [
    { id: "problem", label: "Problem" },
    { id: "constraints", label: "Constraints" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "hard", label: "Hard parts" },
    { id: "outcomes", label: "Outcomes" },
  ],
  problem: [
    "Ask a chatbot for a skincare routine and it guesses. It does not know your country, your tretinoin, or your budget, and it will still name products. That is a language model completing a sentence, not an agent doing a job.",
    "DermaAssist is built to show the difference. The loop is perceive → reason → act → verify. The UI is a two-column workspace: conversation and routine on the left, a live reasoning trace on the right, so you can see every tool call.",
  ],
  constraints: [
    "No LangChain, no LlamaIndex, no vector database. The ReAct loop talks to the Mistral API directly.",
    "Safety that matters (retinoid + AHA, BPO + vitamin C, missing SPF) cannot be left to the model. That checker is deterministic, over a 62-entry ingredient knowledge base.",
    "The Space is a single Docker image: Node builds the UI, Python serves API and UI on port 7860. No CORS ballet.",
    "Free-tier rate limits are real. One routine fires several model calls. The backend paces and retries 429s; a mock-LLM flag exists for UI work.",
    "This is educational. It is not medical advice. Prescription actives should send the user back to a dermatologist — and the Anika persona exists to show that path.",
  ],
  built: [
    "Six tools on the agent: ask_user, web_search (Serper), get_ingredient_info, check_routine_conflicts, analyze_shelf_photo (Pixtral), plus the critic pass as a second model call.",
    "FastAPI backend with SSE on /api/agent/message. Event types: text, tool_call_start, tool_call_end, critique_start, critique_diff, routine, done.",
    "SQLite for sessions, messages, and routines. Personas attach a skin profile so the agent can skip the interview when you already know Maya, Ravi, or Anika.",
    "React 18 + TypeScript UI: chat, routine cards, ingredient chips, revision diff, photo upload, PDF export, live reasoning trace.",
    "Multi-stage Docker deploy to Hugging Face Spaces. SQLite lives on /tmp and resets on rebuild — fine for a demo, said plainly on this page.",
  ],
  hardParts: [
    {
      title: "Interview, don't guess",
      body: [
        "The agent is allowed to call ask_user. It decides whether it still needs concern, skin type, current routine, allergies, budget, or age, and it asks one question at a time. It stops when it has enough. That is a control loop. A form with six required fields is not.",
        "Load Persona is the opposite shortcut: attach a saved profile, type ‘build me a routine,’ and the interview is already done. Maya (US, oily, $30), Ravi (India, combination, ₹6000), Anika (UK, sensitive, on tretinoin) exist as demo rails, not as the product.",
      ],
    },
    {
      title: "The model proposes; a hard-coded layer verifies",
      body: [
        "Product names and prices come from Serper, not from the model's memory. Ingredient conflicts come from ingredients.json. The LLM never gets a veto over ‘retinoid + AHA is a bad idea.’ The chip popover in the UI is that layer, visible.",
        "After the draft, a second Mistral pass reviews the routine. The UI shows a before/after diff for every change. That is the critic — not a hidden rewrite.",
      ],
    },
    {
      title: "Vision is another tool, not a mode",
      body: [
        "A shelf photo goes in as image_b64 on the same message endpoint. Pixtral identifies bottles; the agent folds those products into the routine instead of inventing a replacement set. The reasoning trace renders analyze_shelf_photo as its own card.",
      ],
    },
    {
      title: "Streaming is the demo",
      body: [
        "If you only see the final routine, DermaAssist looks like every other wrapper. The SSE stream is the product: tokens, tool starts, tool ends, critique, diff, routine. The frontend hook useAgentStream is the other half of the agent, not a spinner.",
      ],
    },
  ],
  metrics: [
    { value: "5", numeric: 5, label: "agent behaviors that a chatbot does not have" },
    { value: "6", numeric: 6, label: "tools on the ReAct loop", focus: "backend" },
    { value: "62", numeric: 62, label: "entries in the ingredient knowledge base", focus: "backend" },
    { value: "7", numeric: 7, label: "SSE event types on the agent stream", focus: ["backend", "android"] },
  ],
  outcomes: [
    "The live Space is public. Free Spaces sleep after roughly 48 hours idle; the first visit wakes the container (on the order of 30 seconds). Open it a minute before you want to click around.",
    "I will not claim medical authority. The interesting system is the loop: interview, search, deterministic check, self-critique, vision — all visible in the trace.",
  ],
  stack: [
    "Python",
    "FastAPI",
    "Mistral (mistral-small-latest)",
    "Pixtral-12B",
    "Serper",
    "SQLite",
    "SSE",
    "React",
    "TypeScript",
    "Vite",
    "Docker",
    "Hugging Face Spaces",
  ],
  sources: [
    { label: "Hugging Face Space — ravimitte/DermAssist", href: "https://huggingface.co/spaces/ravimitte/DermAssist" },
    { label: "Live demo (may be asleep)", href: "https://ravimitte-dermassist.hf.space" },
  ],
  note: "Educational demo. Generated routines are not medical advice. The Space sleeps on the free tier; the first request after idle is a cold start.",
};
