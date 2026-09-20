# Ravi Mitte Portfolio Research and Redesign Blueprint

Prepared for Ravi Shankar Mitte · Research date 16 September 2026

Updated with distinctive interaction research and a model allocation plan on 16 September 2026. Sections 22–25 refine the earlier design and implementation recommendations; where a choice differs, the updated specification takes precedence.

## 1 Recommended direction

Build an elegant engineering portfolio that makes Ravi's strongest work understandable in three depths: a quick hiring summary, a concise project argument, and an optional technical investigation. Give it a distinctive visual identity through large typography, warm white surfaces, deep navy diagrams, and precise blue accents. The signature interaction should reveal how a system changes when an engineering decision changes. The work itself supplies the spectacle.

The recommended concept is **Systems in Motion**. This is an internal creative direction, not a slogan that must appear on the site. Its central idea is that Ravi understands the path between a user action, a device, a service, and a reliable result. That idea joins the backend and Android experience without presenting an unfocused list of technologies.

For employment, prioritize **Senior Backend Engineer** and **Senior Android Engineer** application journeys. Use a broader identity on the main homepage and explicit, shareable role pages for applications. Present AI work as additional engineering evidence; the supplied material does not justify repositioning the entire portfolio around production AI expertise or a Staff Engineer title.

The return to optimize is qualified employer conversations per hour invested, followed by interviews and suitable offers. Visual distinctiveness supports recall and perceived care; it does not establish compensation. The reviewed sources do not provide a controlled comparison proving that one portfolio style produces higher salaries. The recommendations below combine hiring guidance, adjacent UX research, observed examples, and project-specific judgment. Proposed budgets and success thresholds are planning decisions, not published industry averages.

### Scope and reading guide

This document specifies the research, positioning, content, visual system, page layouts, interaction behavior, accessibility, implementation, measurement, and build sequence. It is the research and planning deliverable; implementation follows this specification.

Read sections 2–5 for the evidence and hiring strategy, 6–12 for the creative and content design, and 13–20 for engineering, delivery, and verification. Section 21 contains the linked research register. All professional achievements in this document originate in the supplied portfolio and require the owner's confirmation before publication.

Read sections 22–23 for the more distinctive creative direction and its implementation details. Sections 24–25 assign work to Astra, Sol, Terra, and Luna and define a workflow that limits unnecessary Astra use.

## 2 Research findings and their limits

### 2.1 Hiring reviewers need an argument they can inspect

Nielsen Norman Group's portfolio article reports a survey of 204 UX professionals involved in hiring. It emphasizes relevant work, clear individual contribution, constraints, decision making, and results. It recommends a small set of substantive case studies and scannable presentation. This is direct evidence about UX hiring, not a study of backend engineering compensation. Its transferable lesson is to make the candidate's reasoning easy to evaluate. [S1](https://www.nngroup.com/articles/ux-design-portfolios/)

**Application to Ravi:** each featured project should answer what changed, what Ravi personally owned, why that approach was chosen, and how the outcome was assessed. A technically dense essay without an opening summary makes that assessment unnecessarily expensive.

### 2.2 Senior engineering evidence is broader than attractive output

Amazon's senior SDE preparation guide describes architectural thinking, stable and maintainable systems, technical leadership, coding, system design, and examples of past decisions. It asks candidates to prepare specific experiences and relevant data. This describes one employer's hiring process, not a requirement to maintain a portfolio. [S2](https://www.amazon.jobs/content/en/how-we-hire/sde-iii-interview-prep)

**Application to Ravi:** expose service boundaries, failure handling, testing, operational responsibility, and collaboration. Treat the portfolio as an interview aid and evidence index. Do not spend so much time building it that system design preparation, applications, and referrals stop.

### 2.3 Public repositories must be easy to evaluate

GitHub's job-search guidance recommends highlighting a few relevant projects, supplying clear READMEs, and making setup, demonstrations, testing, and code understandable. Its emphasis is a reviewer's limited attention. [S3](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume)

**Application to Ravi:** link a case study to a useful entry point in a repository, not only the repository root. For public projects, provide a working example and a short explanation of the most important invariant. For employer work, use an approved abstract diagram and a precise ownership statement.

### 2.4 Appearance helps perception but cannot replace usability

NN/g's aesthetic-usability discussion explains that attractive interfaces can be perceived as easier to use, even when usability problems exist. Its visual-design guidance discusses scale, hierarchy, balance, contrast, and grouping. Neither establishes a salary effect. [S4](https://www.nngroup.com/articles/aesthetic-usability-effect/) · [S5](https://www.nngroup.com/articles/principles-visual-design/)

**Application to Ravi:** invest in typography, composition, diagram quality, and responsive polish. Test whether people can find the resume and explain a project, rather than asking only whether the site looks impressive.

### 2.5 Best portfolio articles are inspiration sources

Creative Bloq's portfolio roundup illustrates different ways to express identity and let project work lead. It is editorial curation, not an employment-outcome dataset. Awwwards' portfolio collection is useful for discovering visual approaches, but awards and gallery inclusion do not establish hiring ROI. [S6](https://www.creativebloq.com/portfolios/examples-712368) · [S7](https://www.awwwards.com/websites/portfolio/?page=40&source=post_page---------------------------)

**Application to Ravi:** borrow principles such as coherent art direction and memorable project presentation. Do not copy a designer's site wholesale or assume an award-winning navigation experiment suits an engineering recruiter.

### 2.6 Fast delivery and inclusive interaction are part of the evidence

Google's Web Vitals guidance measures loading, responsiveness, and stability. W3C provides the accessibility requirements used later in this specification. These sources support implementation quality targets; they do not predict employment outcomes. [S11](https://web.dev/articles/vitals) · [S12](https://www.w3.org/WAI/WCAG22/quickref/)

**Application to Ravi:** the portfolio should itself demonstrate reliable engineering. Essential content must load before decorative behavior, navigation must work with a keyboard, and a disabled animation must never conceal the work.

## 3 Portfolio patterns compared

These are qualitative judgments for Ravi's existing evidence and likely target roles. They are not measured conversion rankings.

| Pattern | Main strength | Main cost or limitation | Expected fit for Ravi |
| --- | --- | --- | --- |
| Resume with project links | Fast to build and scan | Little explanation of decisions | Useful baseline but insufficient differentiation |
| Curated engineering case studies | Demonstrates ownership and judgment | Requires careful writing and evidence | Highest priority |
| Interactive technical explanations | Makes invisible backend work tangible | Can become a large implementation project | High value when limited to one strong module |
| Visual product gallery | Shows product finish immediately | Can hide technical contribution | Supporting treatment for device and Flutter work |
| Immersive 3D world | Memorable demonstration of graphics craft | Interaction and performance overhead | Optional experiment only; weak alignment to core roles |
| Technical publication archive | Shows explanation and sustained expertise | Long maintenance horizon | Add only when useful original writing exists |
| Generalist template with many skill badges | Easy breadth signaling | Weak evidence and interchangeable identity | Avoid as the primary story |

### Observed examples and what to transfer

**Brittany Chiang:** the homepage states a clear frontend specialty and connects experience to project evidence. Transfer the explicit identity, readable summaries, and direct routes to professional information. Ravi's distinction should come from systems and devices, not a reproduction of Brittany's appearance. No employment effect is inferred from the example. [S8](https://brittanychiang.com/)

**Josh W Comeau:** the site makes technical explanation a central product, including articles about SVG, animation, and layout. Transfer the practice of making an engineering idea understandable through a focused demonstration. Start with one explanation drawn from Ravi's own work; an empty or thin blog would weaken the result. [S9](https://www.joshwcomeau.com/)

**Bruno Simon:** the portfolio invites visitors to drive through an interactive world and provides game controls and quality settings. That experience demonstrates the creative development specialty it advertises. Transfer the alignment between presentation and skill. For Ravi, an explorable request path is a better match than making recruiters play a game to reach a resume. [S10](https://bruno-simon.com/)

### Priority by likely return on effort

1. Validate the strongest claims and rewrite two role-specific introductions.
2. Make two employer case studies excellent and one public project independently inspectable.
3. Make resume, role fit, and contact immediately available on mobile and desktop.
4. Establish distinctive typography, composition, and consistent technical diagrams.
5. Add one optional interactive explanation with a complete static equivalent.
6. Improve distribution and measure qualified conversations.
7. Expand motion, articles, and secondary experiments only after the core works.

## 4 Audit of the supplied portfolio

### Existing assets worth preserving

The repository is a React and TypeScript application using Vite, React Router, GSAP, and Lenis. Content is already separated into structured TypeScript files. It includes six detailed projects, employer history, role-specific copy, backend and Android URL editions, and two resume PDFs. These are valuable foundations. A framework replacement is not automatically a better investment.

The content already describes important engineering decisions: GraphQL composition beside existing REST APIs, transactional idempotency, queue-backed transformation, device communication, row locks, row-level security, and streamed agent events. Much of the differentiation is present; it needs clearer hierarchy and stronger evidence context.

### Observed weaknesses and required response

| Repository observation | Hiring or implementation implication | Planned response |
| --- | --- | --- |
| Home leads with a very large personal name and a six-item index | Specialization and outcomes receive less emphasis | Lead with role and contribution; feature three projects |
| Header labels include Index and Projects | Work discovery can be less explicit | Use Work, About, Resume, Contact |
| Role-prefixed routes exist but the inspected header has no role selector | Tailored editions may be hard to discover | Add visible links to Backend and Android editions |
| Case studies contain extensive technical prose | A short review may miss the strongest point | Add a 60-second summary and explicit evidence section |
| Metrics share one loose schema | Scope counts can look equivalent to impact | Introduce metric categories and publication status |
| Page transitions use cover layers and long motion tokens | Content visibility depends on orchestration | Remove blocking covers; content visible by default |
| Metadata changes primarily with role | Individual case studies lack distinct server-delivered previews | Generate route-specific HTML and social metadata |
| Wildcard routing redirects into an edition | Unknown paths may remain unknown after prefixing | Add an explicit 404 and finite redirect map |
| Fonts load from Google and the avatar from GitHub | Extra external requests and dependencies | Self-host approved assets and fonts |
| Mock-server copy describes both broad hot reload and duplicate-key skipping | Editing or deleting existing routes may not work as advertised | Inspect implementation before claiming full hot reload |

Files examined include `src/pages/Home.tsx`, `src/App.tsx`, `src/role/RoleContext.tsx`, `src/components/Header.tsx`, `src/components/Diagram.tsx`, `src/motion/MotionRoot.tsx`, `src/motion/tokens.ts`, `src/styles.css`, `src/data/*`, `index.html`, and `package.json`.

Stored screenshots in `.verify` show an editorial cream-and-red design. Some show a cover layer, and an older mobile capture shows horizontal clipping. Their content differs from the current source, so they are historical clues, not a current browser audit or proof of a live defect. The redesign acceptance criteria explicitly test both risks.

### Claims requiring reconciliation

**Living Labs:** verify whether the architecture contains exactly ten services or ten-plus; both representations occur. Confirm user-count definition, time window, comparable traffic for the 500 to 400 ms p95 result, payload comparison method, and storage measurement basis. Replace absolute claims such as an ETL path that cannot lose records with the actual retry, dead-letter, reconciliation, and retention behavior that can be supported.

**Find My Mobile:** confirm the operation set, device models, release, connectivity conditions, success denominator, and monitoring period. A change from 92% to 98% is **six percentage points**, not six percent. Do not imply zero ANRs across an entire product from an observation on selected components. Reconcile references to glasses, Project Moohan, and VST with the actual device and authorized public terminology.

**Wearable Intelligence:** retain the proof-of-concept label. Validate the 30% comparison, baseline implementations, hardware, dataset, and extraction quality before using latency as a headline. A model running on a phone and presenting results on a watch is not an LLM running on the watch.

**Zero Miles:** distinguish code inventory from user benefit. Four calls collapsed to one is a 75% reduction in call count for that path; it is not evidence of 75% lower latency. There is no supplied production adoption measure.

**DermaAssist:** reconcile five named tools plus a critic pass with the claim of six tools. Label the visible feed as tool activity or execution events; do not imply access to a model's private reasoning. A deterministic rule checker is not clinical validation. Avoid unverified provider sleep-duration promises.

**Awards and employment:** confirm names, dates, current employment, team versus individual recognition, and permission to describe employer work. Certifications earned in 2024 should not automatically be described as currently active. The site content is a source of candidate-provided claims, not independent corroboration.

## 5 Employment positioning and conversion strategy

### Target audience order

**Recruiter or referral reviewer:** needs name, seniority, relevant specialty, location, resume, and enough evidence to justify a conversation. The page should remain useful when only its first screen and one project are viewed.

**Engineering manager:** needs ownership scope, technical judgment, delivery, operating constraints, and collaboration. The portfolio should make it easy to identify questions worth exploring in an interview.

**Technical interviewer:** needs precise decisions, alternatives, failures, and evidence boundaries. Direct anchors should let Ravi share one relevant section before or after a conversation.

### Positioning for each entry point

| Entry | Primary message | First three projects | Resume |
| --- | --- | --- | --- |
| Main homepage | Senior engineer connecting reliable services and useful devices | Living Labs, Find My Mobile, Zero Miles | Two clearly labeled choices |
| Backend edition | Backend systems with explicit contracts and production ownership | Living Labs, Zero Miles, DermaAssist | Backend PDF |
| Android edition | Android and wearable systems with reliable cross-device behavior | Find My Mobile, Wearable Intelligence, Zero Miles | Android PDF |

Backend and Android are parallel evidence-based targeting options. Their relative compensation prospects depend on actual roles, location, company, level, and hiring demand. The document does not assert that either specialty pays more. Before an application campaign, compare real job descriptions and choose one primary cohort rather than continually changing the homepage identity.

### Conversion architecture

Use one prominent action per context. Homepage hero: **Explore selected work**. Header: **Resume**. Case-study conclusion: **Discuss this work**. Contact section: a visible email address and **Copy email**. GitHub and LinkedIn remain easy to find without competing with the main reading path.

Suggested short journey: referral link → relevant role page → strongest case summary → resume or email. Suggested deep journey: role page → case study → interactive explanation → evidence or code → conversation.

**What counts as ROI:** qualified conversations and interview opportunities attributable in part to the portfolio, relative to creation and maintenance effort. Page views, time on site, GitHub stars, and animation engagement are diagnostic signals, not the objective. A resume click indicates intent, not a downloaded file, interview, or offer.

## 6 Creative direction and design intuition

### The visual idea

Treat each project as a precise technical exhibit. A warm, readable editorial surface holds the story; a dark diagram surface reveals the system. Blue identifies the selected path or decision. Large titles provide personality, while tightly aligned metadata gives the work credibility and structure.

The visual rhythm is asymmetric but orderly: a generous headline opposite a system illustration, a large flagship project followed by two compact projects, then a calmer experience section. Avoid making every section an identical grid of rounded cards. A backend story should receive as much visual care as an app screenshot.

### Why this should feel distinctive

The repeated visual motif is a **path**: thin connectors, selected nodes, and annotated transitions. The same visual grammar appears in the hero, project artwork, case-study diagrams, and small navigation details. This derives from Ravi's work across services and devices rather than from generic developer imagery.

Use one striking moment per page. On the homepage, it is an explorable user-action path. On Living Labs, it is the before-and-after client request structure. On Find My Mobile, it is the route between the devices. The remaining page supports comprehension through typography and spacing.

### Alternatives considered

**Refined newsprint:** economical because it builds on the current palette and serif typography; suitable for an essay-first identity, but needs more visual engineering evidence. **Dark console throughout:** aligns with technical content but can become dense and generic. **Full cinematic 3D:** impressive for a graphics specialist but expensive and poorly matched to the principal hiring case. The recommended mixed light-and-dark approach offers stronger readability and space for a distinctive technical exhibit.

## 7 Visual system specifications

### Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#F6F5F1` | Main page background |
| `--surface` | `#FFFFFF` | Cards and raised reading surfaces |
| `--ink` | `#172033` | Main text and headings |
| `--muted` | `#526071` | Secondary text on light surfaces |
| `--accent` | `#2457D6` | Primary actions and selected states |
| `--accent-hover` | `#1943B5` | Primary action hover |
| `--accent-soft` | `#E8EEFC` | Selected chip background |
| `--line` | `#D9DEE7` | Decorative dividers |
| `--control-border` | `#7A8798` | Boundaries needed to identify controls |
| `--diagram` | `#101827` | Diagram background |
| `--diagram-text` | `#F4F7FC` | Main text on dark surfaces |
| `--diagram-muted` | `#B5C1D1` | Secondary text on dark surfaces |
| `--signal` | `#9DE5D5` | Active diagram path on dark surfaces |
| `--success` | `#176B4D` | Verified success state on light surfaces |
| `--warning` | `#8C4A09` | Caution text on light surfaces |

Use blue sparingly, primarily for interactive meaning. Mint is a diagram highlight, never small text on white. Decorative pale lines must not be the only visible boundary of an input or button. Verify every actual foreground/background pair, including hover and focus states. Colors identify states alongside text, shapes, and line styles.

### Typography

Use **Manrope** for headings and body, with **IBM Plex Mono** for small technical labels and code. Self-host licensed WOFF2 files with the license notices retained. Limit the initial font set to the sans variable file; load mono only when useful. System fallback: `ui-sans-serif, system-ui, sans-serif`; code fallback: `ui-monospace, monospace`.

| Style | Desktop | Mobile | Weight and leading |
| --- | --- | --- | --- |
| Hero heading | 72–88 px | 38–46 px | 600; 1.04 desktop, 1.1 mobile |
| Page title | 56–64 px | 36–42 px | 600; 1.12 |
| Section heading | 36–44 px | 28–32 px | 600; 1.18 |
| Card heading | 26–30 px | 23–26 px | 600; 1.25 |
| Lead paragraph | 20–22 px | 18 px | 400; 1.55 |
| Body | 17–18 px | 16–17 px | 400; 1.65 |
| Metadata | 13–14 px | 13–14 px | 500; 1.45 |
| Code | 14 px | 13–14 px | 400; 1.6 |

Use `clamp()` between endpoints; do not lock headings to viewport height. Keep paragraphs between 55 and 72 characters wide. Use at most two short uppercase metadata labels together. Use tabular numerals for comparisons. Never animate metrics upward from zero; the number should be immediately readable and stable.

### Layout tokens

Maximum page width: 1200 px. Desktop gutter: 48 px at 1024 px and above; tablet gutter: 32 px from 768 px; mobile gutter: 20 px, reducing to 16 px at 360 px and below. Base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.

Desktop uses 12 columns with 24 px gaps; tablet uses 8 columns; mobile uses 4 conceptual columns with 16 px gaps. Section padding is 96 px desktop, 64 px tablet, and 48 px mobile. Card padding is 32/24/20 px. Use 12 px card corners, 8 px controls, and 999 px only for small status chips. One-pixel borders and shallow shadows replace heavy glow effects.

### Imagery and graphic grammar

Create original SVG diagrams with consistent 1.5 px connectors, 8 px node corners, 14–16 px labels, and clear arrow direction. Use original screenshots for public apps, cropped to the relevant behavior. Label any recreated conceptual interface as illustrative. Employer artifacts must be approved for publication; generic diagrams should not reveal private endpoints, user data, or unreleased details.

Project covers: Living Labs uses a client-to-services composition; Find My Mobile uses two device outlines and alternative paths; Zero Miles uses two clients competing for one token; Wearable Intelligence uses notification-to-card stages; DermaAssist uses an ordered event trace; Dynamic Mock Server uses configuration-to-endpoint mapping. No stock laptop photographs, floating technology logos, or fake monitoring dashboards.

## 8 Information architecture and navigation

### Proposed route map

| Route | Purpose | Indexing decision |
| --- | --- | --- |
| `/` | Broad identity and best work | Self canonical |
| `/backend` | Application landing page for backend roles | Self canonical; substantively tailored |
| `/android` | Application landing page for Android roles | Self canonical; substantively tailored |
| `/work` | All six projects with category filters | Self canonical |
| `/work/living-labs` | Backend flagship | Self canonical |
| `/work/find-my-mobile` | Android flagship | Self canonical |
| `/work/zero-miles` | Independent product case | Self canonical |
| `/work/wearable-intelligence` | Explicitly labeled prototype | Self canonical |
| `/work/derma-assist` | Applied AI demonstration | Self canonical |
| `/work/dynamic-mock-server` | Developer-tool case | Self canonical |
| `/about` | Experience, working style, credentials | Self canonical |
| `/contact` | Direct email, LinkedIn, resume choices | Self canonical |
| `/privacy` | Plain explanation of actual analytics | Self canonical |
| Unknown route | Useful error with Home and Work links | HTTP 404 |

Use one canonical case study per project. The old role-prefixed case URLs should redirect permanently to the corresponding shared case, preserving supported section anchors. Existing `/projects/...` paths also redirect to `/work/...`. Root `/backend` and `/android` remain tailored landing pages. Implement redirects at the host where possible; do not depend only on client JavaScript.

A `from=backend` or `from=android` context may control the back link and resume choice on a shared case. It must not alter technical facts or create a separately indexed duplicate. Only accept these two enumerated values. When context is absent, offer both resume choices. Direct links must work without stored state. URL context takes priority over any remembered preference.

### Header and mobile menu

Desktop header: 72 px tall, wordmark on the left, Work and About in the center, Resume and Contact on the right. Use a solid light background and a subtle bottom border once scrolled. Keep primary information visible without hover. Wordmark links to `/` and includes the accessible name Ravi Mitte home.

Below 768 px: 64 px header, wordmark, direct Resume link, and Menu button. Opening Menu inserts a simple navigation panel below the header. The button exposes `aria-expanded` and `aria-controls`; Escape closes it and returns focus to the trigger. Selecting a link closes it. If implemented as a modal drawer instead, trap focus and make the background inert; do not mix modal and nonmodal behaviors.

Role selection belongs immediately under the homepage introduction as three real links: Overview, Backend, Android. Mark the active link with `aria-current="page"`. Changing editions changes route, heading, project order, and preferred resume; it does not trigger a theatrical transition.

## 9 Homepage specification

### Desktop composition

At a 1440 px viewport, center the 1200 px page with 120 px outer margins. Below the 72 px header, give the hero 72–88 px top padding. Use a 7-column text region and a 5-column system exhibit. The illustration aligns with the heading's upper half, rather than floating at the bottom of a mostly empty screen.

Hero order: role and location label; benefit-led heading; 45–65 word introduction; primary Work action; secondary Resume action; role edition links. The name remains prominent in the wordmark and introduction. Avoid making the name so large that the professional proposition falls out of the initial viewport.

At 1440 × 900, the hero and the start of selected work should be visible. This is a composition target, not a fixed-height constraint. Longer text, browser zoom, and font fallbacks must push content down naturally.

```text
┌──────────────────────────────────────────────────────────────────┐
│ Ravi Mitte                  Work   About       Resume   Contact   │
├──────────────────────────────────────────────────────────────────┤
│ SENIOR SOFTWARE ENGINEER             SYSTEM OVERVIEW              │
│                                                                  │
│ Reliable systems.                    [Device]                    │
│ From service to screen.                  │                       │
│                                      [Contract]──[Service]       │
│ Introduction and specialization.                   │             │
│                                               [Data]             │
│ [Explore selected work] [Resume]      View a decision →           │
│ Overview / Backend / Android                                     │
├──────────────────────────────────────────────────────────────────┤
│ Selected work                                                    │
│ [Living Labs illustration]    Outcome / ownership / case link     │
│ [Find My Mobile]              [Zero Miles]                        │
├──────────────────────────────────────────────────────────────────┤
│ How I approach engineering / concise experience / contact        │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile composition

At 390 px, use a 350 px content width and one vertical flow: label, headline, introduction, actions, role links, compact illustration, selected work. The headline should occupy approximately three lines, without forced line breaks that overflow narrower widths. Buttons stack below 360 px; otherwise they may share a row only if each remains readable and at least 44 px high.

The diagram becomes a short vertical sequence. Hide secondary illustration detail, not the explanation. The first project begins after a 40–48 px section gap. Do not force a 100vh hero; browser toolbars and short screens must not strand the work below artificial whitespace.

### Selected work

Feature three projects, with the flagship as a wide 7:5 visual-and-copy panel and the next two as equal cards below. On mobile all three become full-width vertical items. Each includes category and status, a 5–10 word project proposition, one ownership sentence, at most two validated outcomes, and a descriptive case-study link.

Card reading order: title → proposition → impact → ownership → action. Artwork has a fixed aspect ratio of 16:10 with explicit dimensions. The whole card may have one primary link using a stretched-link pattern, but extra source links must remain distinct interactive elements without nested anchors.

Follow with **How I work**, containing three short evidence-backed statements about contracts, failure behavior, and delivery. Then a compact experience strip and the contact section. Avoid a separate wall of skill logos, proficiency percentages, unverified testimonials, fabricated client badges, or an endless carousel.

### Contact block

Heading: **Have a systems problem worth solving?** Body: **For backend or Android engineering opportunities, email me with the role, team, and location.** Show `ravimitte616@gmail.com` as text and a mail link. Provide Copy email and LinkedIn. Do not add an availability badge, relocation commitment, notice period, or remote-work claim without confirmation.

## 10 Case study specification

### First screen

Show breadcrumb, project title, one-sentence outcome, status, employer or independent context, dates, personal ownership, and two or three primary metrics. The metric source note must be close enough to the number to prevent a misleading standalone impression. Follow with an original diagram or screenshot and a three-bullet summary.

Example summary structure: **Problem:** clients assembled data across multiple services. **My contribution:** API contracts and a composition layer alongside existing REST endpoints. **Result:** fewer calls and smaller payloads in the measured flows, with details below. Where a metric is not publication-ready, replace it with a concrete qualitative result rather than an empty number.

### Narrative order and content budgets

| Section | Required content | Suggested length |
| --- | --- | --- |
| Summary | Problem, ownership, result | 90–140 words |
| Context | User or business need and constraints | 120–180 words |
| Ownership | Personal decisions, team work, boundaries | 70–120 words |
| Architecture | Diagram plus explanation of boundaries | 150–250 words |
| Critical decision | Alternatives, choice, cost, failure behavior | 200–300 words |
| Results and evidence | Baselines, measurement, limitations | 120–220 words |
| Reflection | What changed in the engineer's thinking | 70–120 words |
| Sources and next action | Public artifacts or approved references | 3–5 links maximum |

Aim for roughly 800–1,200 words per flagship, with optional details outside the main narrative. This is a content budget, not a rule to fill space. The 60-second summary is a reading aid, not a guaranteed user behavior statistic.

Desktop case layout: 200 px sticky contents rail, 720 px maximum reading column, remaining width as whitespace. Keep sticky content below the header with `top: 96px`. Below 1024 px, move contents into an inline disclosure above the narrative. Section anchors use `scroll-margin-top: 96px`.

Do not put essential results inside closed accordions. Use native details elements for optional implementation notes and measurement methodology. Code examples should be short, explain a decision, and have a labeled copy button. Code blocks can scroll horizontally; the entire page cannot.

### Project by project editorial brief

**Living Labs — flagship backend story.** Working title: *A clearer contract between clients and services*. Lead with the GraphQL BFF and compatibility with REST. Explain one architectural boundary in depth. Put ETL in a second distinct section or related technical note so the case does not become a collection of unrelated successes. Required diagram: clients, BFF, representative service boundaries, data ownership, and a separate asynchronous pipeline. Distinguish measured improvements from descriptive scale. Required interview angle: how timeouts, partial failures, caching, and idempotency were handled. Only include mechanisms that actually existed.

**Find My Mobile — flagship device story.** Working title: *Shortening the path between phone and watch*. Lead with the removed server hop for the applicable operations, then show process-lifecycle constraints and the confirmed XR work. Required diagram: before and after, with eligible conditions clearly labeled. Required evidence: latency definition, operation population, success baseline, release scope, and ANR observation window. Required interview angle: out-of-range behavior, foreground/background lifecycle, retries, and battery tradeoffs. Never imply that direct communication solves all remote-locate scenarios.

**Zero Miles — independent ownership story.** Working title: *A private space for two, enforced in Postgres*. Explain the product in one sentence, then the pairing invariant and isolation model. Required artifacts: app screen, concise transaction diagram, public migration or function link, and concurrency test if available. Required interview angle: what happens when two requests redeem the same token. Keep Flutter visible for the Android edition while distinguishing it from native Android experience.

**Wearable Intelligence — prototype story.** Working title: *Turning a notification into a useful watch card*. Show one synthetic notification, extracted fields, and three lifecycle states. Keep Prototype visible in the card and title area. Required interview angle: why these fields, model execution location, failure handling, and evaluation. Replace unsupported performance comparisons with a clear demonstration until evidence is available.

**DermaAssist — AI systems demonstration.** Working title: *Making agent execution visible*. Focus on event streaming, tool boundaries, deterministic checks, and error states. Provide a recorded example with synthetic data, with an optional external live demo. Explain transient storage and operational limitations accurately. Avoid claims of clinical safety, private reasoning visibility, or production-scale usage. The portfolio preview should not accept health data or call a paid API.

**Dynamic Mock Server — compact tooling story.** Working title: *Keeping mobile development moving while APIs change*. Keep this case shorter, around 400–650 words. Show configuration, expected response, and one validation failure. Verify whether existing routes can update and disappear, or only new routes can register. The case should document the actual behavior and the local-development boundary.

## 11 Signature interactions

### 11.1 System overview on the homepage

Four conceptual nodes: Device, Contract, Service, Data. They are labeled illustrative, because no single supplied project necessarily contains the complete combined topology. Selecting a node reveals one sentence and a relevant project link. Default state remains an attractive static diagram with its explanatory caption.

Use native buttons in an HTML list associated with the SVG. Tab reaches four controls in meaningful order; Enter or Space selects. Pointer hover may preview a highlight but never reveals unique information. The chosen detail is ordinary nearby text, with a polite live announcement only on explicit activation. At mobile widths, use a vertical diagram and a detail region below it. A diagram selection must not unexpectedly scroll the page.

Budget: no canvas or WebGL dependency, no request loop while idle, no backend, and no more than about 15 KB compressed additional interaction code. The illustration remains visible without JavaScript. Implement this after the static homepage has passed comprehension testing.

### 11.2 Before and after request paths

On Living Labs, provide two buttons: **Before composition** and **With the BFF**. On selection, change the highlighted route and update a short explanation. Show measured figures only when approved. Animated packets are an explanatory visualization, not a live benchmark. Do not time them in a way that invents actual latency or implies exactly proportional speed.

State model: idle-before → selected-after → selected-before. Include a static side-by-side diagram for print and reduced-motion presentation. A network error simulation is a separate optional view and must be explicitly labeled conceptual; it must not pretend to reproduce private production behavior.

### 11.3 Pairing race explanation

Optional phase-two module for Zero Miles: **Run two requests** produces two visible tracks; one obtains the row lock, the other waits, then receives the supported terminal outcome. The actual project implementation must determine the labels. Provide Reset and a text transcript. This is a deterministic teaching simulation, not a database load test or browser connection to production.

### 11.4 Agent execution replay

Optional phase-two module: play a short, pre-recorded synthetic event sequence with Tool started, Tool completed, Review, and Result events. Allow pause, step, restart, and a full transcript. The module fetches no sensitive data and calls no live model. Show Recorded demonstration persistently. Live demo is an external action with its own availability caveat.

### Explicit exclusions for the first release

No mandatory intro, autoplay audio, scroll hijacking, custom cursor, magnetic buttons, AI chatbot about Ravi, login, command-line-only navigation, or global 3D scene. These features add work and can interfere with the stated hiring journey. A later creative experiment can live separately if it demonstrates a relevant skill.

## 12 Motion and component behavior

### Motion specification

| Behavior | Duration | Movement | Reduced motion |
| --- | --- | --- | --- |
| Link underline or color | 120–160 ms | No layout change | Instant |
| Button feedback | 140 ms | Color; optional 1 px press | Color only |
| Card hover | 180 ms | At most 3 px lift | Border change only |
| Diagram selection | 200–280 ms | Opacity and stroke emphasis | Instant selected state |
| Optional section entrance | 240 ms | At most 12 px | No entrance animation |
| Mobile menu | 180 ms | Opacity and small translation | Instant |

Use `cubic-bezier(0.2, 0.8, 0.2, 1)` for ordinary transitions. Do not animate content from `display:none` as the only route to visibility. Native scrolling is the default. There is no required route-transition delay. Cancel outstanding animation on navigation and component cleanup. Pause any optional repeating behavior when offscreen or the tab is hidden.

### Component state inventory

**Buttons:** default, hover, focus-visible, active, disabled where meaningful. Primary buttons are blue with white text, 44 px minimum height, 16 px horizontal padding, 8 px corner radius. Disabled appearance must remain readable, and disabled actions need an explanation when the reason is not obvious.

**Links:** underline within paragraphs; navigational links may use position and weight. Focus ring is at least 2 px with a 3 px offset; use a bright contrasting ring on dark diagram surfaces. External links should be clearly named; if they open a new tab, communicate that behavior and set appropriate rel attributes.

**Project filters:** All, Production, Independent, Prototype. These are buttons with pressed state. Keep a small visible count and a meaningful empty state. Filtering must not push focus into removed content. Filters are optional for six projects and can be omitted if the index remains clearer without them.

**Copy email:** default Copy email; after success, Copied for about two seconds with polite announcement; on clipboard failure, expose Select email and leave the address visible. Do not pretend a clipboard write succeeded.

**Resume:** show Backend resume PDF and Android resume PDF where both are offered. Verify actual files, update dates, and legible text extraction. A failed PDF request is a broken launch criterion, not a reason to show a fake success toast.

**Image failure:** retain layout using intrinsic size; replace unavailable optional artwork with a concise fallback caption. **Demo failure:** keep explanation, transcript, and source link available. **404:** say the page could not be found and offer Home and Work. **No JavaScript:** server-delivered text, navigation, resume links, and static diagrams remain complete.

## 13 Proposed copy and editorial rules

### Main homepage

Eyebrow: **Senior Software Engineer · Bangalore, India**

Headline: **Reliable systems. From service to screen.**

Introduction: **I'm Ravi Mitte. I build backend services and Android experiences, with work spanning health platforms, connected devices, and independent products. My focus is the engineering between a user action and a dependable result: clear contracts, reliable state, and software that is easier to operate.**

This copy reframes the supplied experience; it must be checked against Ravi's own voice and actual responsibilities. Keep the official name Ravi Shankar Mitte in the page title, About page, and resume identity.

### Backend edition

Headline: **Backend systems with clearer contracts and fewer surprises.**

Introduction: **I work with Java, Spring Boot, PostgreSQL, and AWS to build services, API contracts, and data pipelines. At Samsung, my work includes a health-platform backend and a GraphQL composition layer. In independent projects, I explore transactional state, authorization, and observable agent workflows.**

Primary project proposition: **Living Labs — simplifying how clients work with a multi-service platform.** Numeric proof is added only after the evidence ledger permits publication.

### Android edition

Headline: **Connected devices. Reliable experiences.**

Introduction: **I build Android and wearable software with attention to communication, process lifecycles, and performance. My Samsung work includes Find My Mobile and wearable prototypes. Independent projects let me explore the full product, from mobile interactions to the data contracts behind them.**

Add the confirmed XR device description once terminology and scope are reconciled. Avoid overstating shipment of a prototype or attributing an entire device program to one feature contribution.

### Voice rules

Use precise first-person ownership: I designed, implemented, investigated, or collaborated on. Use we for team outcomes and immediately explain Ravi's role. Explain a technical term on first use when the audience needs it. Replace defensive copy such as not a wrapper, not a demo, not a PDF dump, or a spinner that lies with the actual capability or limitation.

Avoid unqualified guarantees: cannot lose records, zero failures, perfectly safe, unlimited scale. Distinguish deployed production work, prototypes, public demos, and proposed improvements. Do not invent business revenue, adoption, testimonials, reporting relationships, mentorship, or leadership scope. When no numerical outcome exists, a concrete behavior and working artifact are valid evidence.

## 14 Evidence model and content schema

### Evidence ledger

Maintain a private working ledger before final copy is published. It contains claim ID, exact statement, project, metric definition, baseline, result, unit, affected population, time period, measurement method, corroborating artifact, owner contribution, publication permission, and review status. Do not ship private evidence references in a public JavaScript bundle.

| Claim | Existing value | Required clarification | Safe interim treatment |
| --- | --- | --- | --- |
| Living Labs API calls | 45% fewer | Flows, baseline, measurement window | BFF consolidates client requests |
| Living Labs p95 | 500 to 400 ms | Endpoints, traffic comparability, dates | Performance investigation and optimization |
| Living Labs storage | About 80% lower | Same data, encoding, compression, period | JSON-to-Parquet pipeline |
| FMM operation latency | About 80% lower | Operation set, hardware, conditions | Shorter eligible device communication path |
| FMM success | 92% to 98% | Denominator, release, observation window | Reliability improvement in defined operations |
| FMM ANR | 0% | Rate definition, component scope, observation period | Reduced blocking work in selected components |
| Zero Miles calls | Four to one | Verify transaction path in public code | One atomic pairing RPC |
| Wearable extraction | 30% lower latency | Dataset, hardware, baseline, accuracy | Prototype extraction pipeline |
| DermaAssist tools | Six | Five tools versus separate critic | Named tool capabilities without total |

Treat the supplied numerical claims as pending verification, not false. If approved, publish them with short scope notes. If evidence cannot be shown publicly, provide an approved methodology explanation without inventing a public source.

### Public content types

```ts
type RoleTrack = 'backend' | 'android';
type ProjectStatus = 'production' | 'independent' | 'prototype';
type MetricKind = 'outcome' | 'scope' | 'benchmark' | 'design-count';

interface PublicMetric {
  id: string;
  kind: MetricKind;
  label: string;
  value: string;
  baseline?: string;
  scope: string;
  methodSummary: string;
  period?: string;
  publicEvidenceUrl?: string;
}

interface ProjectContent {
  slug: string;
  title: string;
  proposition: string;
  status: ProjectStatus;
  organization?: string;
  dates: { start: string; end?: string };
  ownership: string;
  teamContext?: string;
  roleRelevance: RoleTrack[];
  summary: { problem: string; contribution: string; result: string };
  metrics: PublicMetric[];
  decisions: Array<{
    title: string;
    constraint: string;
    alternatives: string[];
    choice: string;
    tradeoff: string;
  }>;
  limitations: string[];
  artifacts: Array<{
    label: string;
    href: string;
    kind: 'code' | 'demo' | 'image' | 'document';
  }>;
}
```

Use a build step to generate this public content from approved records only. Internal fields such as publication permission, evidence filenames, confidential review notes, and unverified values belong outside `src` and the deployed public directory. Give outcomes, scope counts, and prototype benchmarks different labels and positions; never show them as interchangeable impact tiles.

## 15 Technical architecture and migration

### Recommended implementation

Keep React, TypeScript, and the structured content model. Use React Router's framework prerendering capability with its Vite integration to produce HTML for the finite route list, subject to a small compatibility spike against the installed versions. Its official documentation supports prerendering selected routes. This changes the current declarative SPA setup; it is not just a switch in the existing router. [S14](https://reactrouter.com/start/framework/rendering)

The important requirement is static HTML containing content and metadata, not a particular framework brand. If the migration proves disproportionate, use an explicit static generation step with a route manifest. Do not add a database, authentication, CMS, or server merely to serve six case studies. Verify the actual installed dependencies and lockfile before modifying versions; the declared package versions are not proof of compatibility.

Use CSS transitions and native browser behavior for ordinary interaction. Remove Lenis, pointer-field effects, and page-cover orchestration once their usage is eliminated. Retain GSAP only if a specific explanatory diagram needs it and the measured bundle budget permits it. Do not import an animation library into every route for a single optional module.

### Proposed file organization

```text
src/
  app/                 route manifest, page shell, error handling
  components/
    navigation/        header, menu, role links, breadcrumbs
    work/              project card, metric, status, source links
    diagrams/          static diagrams and optional interactions
    reading/           contents rail, code block, disclosure
  content/
    site.ts            identity and contact
    projects/          approved project records
    editions.ts        landing-page selection and copy
    experience.ts      confirmed chronology
  pages/               home, edition, work, case, about, contact, 404
  styles/              tokens, base, layout, components, print
  lib/                 metadata, route helpers, analytics interface
public/
  fonts/               licensed self-hosted files
  images/              compressed approved images and social cards
  resumes/             existing role-specific PDF paths
scripts/               content checks, route checks, build helpers
tests/                 meaningful behavior and accessibility tests
docs/                  research and implementation decisions
```

### Existing file migration map

| Current module | Planned change |
| --- | --- |
| `src/data/site.ts` | Preserve identity; replace index structure with selected-work records |
| `src/data/editions.ts` | Keep role copy; remove duplicated case-story framing |
| `src/data/types.ts` | Introduce explicit metric kinds and public evidence fields |
| `src/data/role.ts` | Replace universal role prefixing with landing-page/context helpers |
| `src/role/RoleContext.tsx` | Retain only explicit route context; avoid metadata side effects as the only SEO layer |
| `src/App.tsx` | Finite routes, shared cases, explicit not-found handling |
| `src/pages/Home.tsx` | New hero, role links, three selected projects, experience and contact |
| `src/components/IndexList.tsx` | Replace with project cards and compact archive rows |
| `src/components/CaseStudy.tsx` | Summary, ownership, contents, evidence, optional details |
| `src/components/Diagram.tsx` | Split into accessible project-specific diagrams |
| `src/motion/*` | Remove global pointer and cover effects; isolate essential animation |
| `src/styles.css` | Replace visual tokens and layout; add print and reduced-motion rules |
| `index.html` | Replace one-size metadata with generated page metadata |

### Rendering and routing acceptance

Every indexable route returns meaningful HTML before hydration. Direct requests to a case URL must return the correct page rather than a generic root shell. Back and forward navigation restore useful position. A new page moves focus to its main heading after client navigation, without stealing focus on ordinary interaction. Query-only context changes must not restart the whole page.

Maintain a route manifest for prerendering, sitemap generation, redirect verification, and internal-link checks. Unknown routes return a real 404 on the deployed host. Existing resume paths remain valid. Test old role-prefixed links and legacy project links individually, including fragments and campaign parameters.

## 16 Performance accessibility and discovery

### Performance budgets

These are proposed engineering budgets. Measure the finished build; they are not current measurements of this repository.

| Item | Target | Measurement approach |
| --- | --- | --- |
| LCP | At most 2.5 s at field p75 | Real visits, mobile and desktop separately |
| INP | At most 200 ms at field p75 | Real interaction data |
| CLS | At most 0.1 at field p75 | Real visits across templates |
| Initial route JavaScript | At most 150 KB gzip | Production asset analysis |
| Initial CSS | At most 35 KB gzip | Production asset analysis |
| Initial fonts | At most 100 KB transferred | Network panel |
| Above-fold imagery | At most 250 KB combined | Network panel |
| Optional diagram module | About 15 KB gzip additional | Chunk analysis |
| Initial page transfer | Prefer below 700 KB | Cold-cache load, excluding user-triggered media |

The first three values follow Google's published good-experience thresholds and p75 guidance. [S11](https://web.dev/articles/vitals) Bundle and asset budgets are project decisions. A Lighthouse score is a laboratory signal, not field compliance or proof of hiring performance. Low traffic may provide too little field data; document that limitation and use repeatable lab tests meanwhile.

Use AVIF or WebP with appropriate fallback for raster artwork, `srcset` and `sizes`, explicit width and height, lazy loading below the fold, and an eager LCP asset. Avoid autoplay video. Load a poster and play the clip only on request. Reserve image and font space to reduce layout shift. Serve hashed assets with long cache lifetimes and HTML with an update-appropriate policy.

### Accessibility acceptance

Target WCAG 2.2 AA. Use semantic headings, landmarks, visible focus, keyboard-operable controls, accessible names, and appropriate state announcements. Normal text contrast must reach 4.5:1; large text 3:1; meaningful control and graphic boundaries generally need 3:1. Relevant targets must satisfy the WCAG 2.2 target-size criterion; this design deliberately uses a more generous 44 × 44 px minimum for principal controls. [S12](https://www.w3.org/WAI/WCAG22/quickref/)

Test 200% zoom and 320 CSS px reflow. The only intentional horizontal scrolling is within code or a labeled diagram region where truly necessary; supply a text equivalent. All diagrams need captions and meaningful HTML descriptions. Decorative SVG paths are hidden from assistive technology. Reduced-motion users receive complete static states. No task depends on hover, drag, color alone, precise pointer movement, or a time limit.

Automated checking is necessary but insufficient. Manually complete the role-switch, project-reading, resume, menu, and contact journeys with a keyboard and a screen reader. Test mobile focus behavior and header obstruction at zoom.

### Search and sharing

Google documents how crawling and rendering interact with JavaScript sites; server-rendered or prerendered content also reduces reliance on later client execution. [S13](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) Each route needs a unique title, description, canonical URL, and a 1200 × 630 social image delivered in its HTML. Add a sitemap and robots file matching the actual deployment.

Example title: **Living Labs backend case study | Ravi Shankar Mitte**. Example description: **How Ravi Mitte approached API composition, service boundaries, and data processing for a health platform.** Keep descriptions factual and avoid repeating unverified numbers in social previews.

Use Person structured data for confirmed identity and professional links; represent projects with an appropriate creative-work type only where accurate. Do not use invented ratings or employment-offer markup. Metadata consistency is useful for recognition, not a guarantee of rich results.

## 17 Measurement and employment ROI

### Funnel and event definitions

| Signal | Event or record | Meaning and limitation |
| --- | --- | --- |
| Relevant landing visit | `landing_view` with edition and broad channel | An eligible visit, not necessarily a recruiter |
| Project interest | `case_open` with slug | A link was opened |
| Resume intent | `resume_click` with edition | A click, not confirmed file consumption |
| Contact intent | `contact_click` or `email_copy` | An action, not a sent message |
| Technical interest | `artifact_click` or `diagram_use` | Supporting diagnostic behavior |
| Qualified conversation | Manually recorded | Relevant role, level, geography, and hiring intent |
| Interview and offer | Manually recorded | Actual downstream outcome |

Track broad referral categories rather than identifying individual recruiters. Do not log email addresses, free-text health content, private URLs, full arbitrary query strings, or raw resume data. Collect only needed fields and explain actual use on the privacy page. Choose an analytics provider during implementation based on hosting compatibility and data needs; apply the appropriate consent configuration for the deployed setup.

### Operational definition of return

For a weekly review, report qualified conversations influenced by the portfolio divided by hours spent improving and maintaining it. Also report relevant applications, referrals, interviews, and offers separately. Where a recruiter voluntarily identifies a case study as useful, record that qualitative evidence. Avoid converting uncertain attribution into a claimed monetary return.

A conceptual expected-return model is: probability of a suitable offer influenced by the portfolio × incremental value of that offer, minus time and direct costs. Neither probability nor salary uplift is known from this research, so do not populate the formula with invented estimates.

### Validation plan

Before launch, ask about five relevant reviewers to attempt concrete tasks: identify the target role; name one owned contribution; explain one result; find the correct resume; find contact information. Include mobile and keyboard use. Set a proposed success criterion of at least four of five completing each core task without help. This small qualitative test finds problems; it does not establish a population conversion rate.

After launch, review the first four to six weeks of actual use. Compare role-matched cohorts where feasible, but record differences in application quality, referral strength, company, and timing. Do not attribute all response-rate change to the redesign. At low volume, prioritize interview feedback and obvious usability failures over underpowered A/B tests.

### Distribution without excessive maintenance

Link the relevant edition from each resume, application, professional profile, and authorized referral message. Share a direct case anchor when it supports a specific discussion. Keep public repositories coherent with portfolio claims. Publish a technical article only when it adds original value beyond the case study. No social posts, outreach, or profile changes are part of this research deliverable.

## 18 Build sequence and effort allocation

The ranges below are planning estimates for one developer familiar with the code. They exclude waiting for employer publication decisions or missing evidence. They are not a delivery promise.

| Phase | Work | Estimated effort | Exit condition |
| --- | --- | --- | --- |
| 1 | Claim ledger and two role narratives | 6–10 hours | Featured claims resolved or removed |
| 2 | Static visual system and homepage | 8–12 hours | Desktop and mobile hierarchy approved by task testing |
| 3 | Case-study template and three strongest cases | 10–16 hours | Ownership, diagrams, evidence, and source links complete |
| 4 | Route migration, metadata, HTML generation | 6–10 hours | Direct loads, previews, redirects, and 404 correct |
| 5 | One signature interaction | 4–8 hours | Static fallback and keyboard equivalence pass |
| 6 | Accessibility, performance, content QA | 6–10 hours | Launch gates pass |
| 7 | Secondary cases and measurement setup | 4–6 hours | All six projects accurately represented |

Total planning envelope: **44–72 hours**, with phase five optional for an earlier useful release. A shorter release can ship the static homepage, two role introductions, and two complete flagship cases while secondary work remains a compact archive. Never publish unfinished case links merely to fill the layout.

### Must have at first release

Accurate identity and role fit, two tailored landing pages, strong production case studies, one public project, working resumes, direct contact, responsive layout, accessible navigation, meaningful HTML, unique metadata, functioning legacy redirects, and clear project status.

### Add after the core is working

One interactive diagram, refined project artwork, a useful technical note, and richer approved evidence. Defer the pairing simulator and agent replay until their incremental value justifies their build and maintenance time.

### Stop rule

Once the core journeys work, the claims are credible, the site feels visually coherent, and the technical gates pass, direct the next effort toward suitable applications and interview preparation. Do not continue redesigning because another gallery introduces a new trend. Fix demonstrated problems and add evidence from real work.

## 19 Detailed acceptance checklist

### Content and credibility

- [ ] Name, employer, dates, location, title, and email match confirmed records.
- [ ] Every featured number has a definition, scope, and approved wording.
- [ ] The 92% to 98% change is described as six percentage points when expressing the difference.
- [ ] Production, independent, and prototype labels remain visible on cards and case pages.
- [ ] Device terminology, tool counts, and hot-reload behavior are reconciled.
- [ ] Team outcomes and personal contributions are distinguishable.
- [ ] No placeholder results, fabricated testimonials, or private evidence are shipped.
- [ ] Each external project link has been checked in a normal browser session.

### Layout and visual polish

- [ ] Review 320, 360, 390, 768, 1024, 1440, and 1920 px widths.
- [ ] Review short landscape screens and 200% browser zoom.
- [ ] Headlines wrap naturally, action labels remain legible, and text does not clip.
- [ ] Cards and diagrams retain intended proportions while text can grow.
- [ ] Main content is visible immediately, including on animation failure.
- [ ] No accidental horizontal document scroll or permanent cover layer exists.
- [ ] Long project titles, fallback fonts, and missing images have been exercised.
- [ ] Print output shows readable text, static diagrams, and useful links without sticky overlap.

### Interaction and accessibility

- [ ] Keyboard reaches every action in a logical order with visible focus.
- [ ] Menu opens and closes predictably, including Escape and focus return.
- [ ] Route change, Back, Forward, and fragment navigation work.
- [ ] Reduced motion exposes complete information without animated transitions.
- [ ] Screen-reader names and selected states describe diagram controls correctly.
- [ ] Copy email announces only actual success and exposes a failure fallback.
- [ ] No information exists exclusively on hover or in animation.

### Engineering and delivery

- [ ] Type checking and production build pass using a reproducible lockfile.
- [ ] Automated tests cover route mapping, metric filtering, and essential interactive behavior.
- [ ] Browser tests cover homepage → case → resume/contact for both editions.
- [ ] No-JavaScript checks confirm readable prerendered content.
- [ ] Direct deep links return correct content and status codes on the host.
- [ ] Unique title, description, canonical, and social image exist in initial HTML.
- [ ] Broken-link, accessibility, and bundle checks pass.
- [ ] Analytics records defined events once and excludes disallowed data.
- [ ] Private claim records and unnecessary personal data are absent from deployed assets.
- [ ] Performance measurements are recorded with device, network, and cache settings.
- [ ] Previous deployment can be restored if a release breaks navigation or assets.

## 20 Decisions and asset checklist before implementation

The design can begin with the recommended defaults. Final published content needs confirmation of the preferred hiring cohort, accurate current employment, approved numerical claims, correct XR terminology, public project links, and the latest resume versions. Compensation targets, relocation preferences, and availability remain private until the owner chooses to publish relevant details.

### Asset production list

| Asset | Specification | Priority |
| --- | --- | --- |
| Wordmark and favicon | Text-led identity; simple scalable SVG | First release |
| Homepage system exhibit | Original SVG with static caption and optional controls | First release static |
| Six project covers | Consistent 16:10 composition; project-specific content | Three first, archive later |
| Living Labs diagrams | API topology plus separate data pipeline | First release |
| FMM diagram | Before/after path with eligibility note | First release |
| Zero Miles screenshot | Real screen with synthetic/private-safe data | First release |
| Resume PDFs | Backend and Android; confirmed dates and searchable text | First release |
| Social cards | 1200 × 630; name, case title, concise graphic | First release |
| Portrait | Optional original photo; no forced stock substitute | Optional |
| Demo recordings | Short, captioned, synthetic example; poster provided | Later |

### Decision record

The recommended design prioritizes work evidence, two explicit hiring editions, one shared case-study system, light reading surfaces, dark technical illustrations, and restrained motion. The technical recommendation preserves the existing React investment while improving static delivery. The research supports clarity, relevant evidence, and usability; the exact visual identity and engineering exhibits are original design recommendations to validate with users.

The update in sections 22–23 strengthens the visual identity: replace the generic combined-system hero with a project-specific request-path exhibit, give each flagship a different explanatory composition, and attach evidence details directly to outcomes. A static but distinctive composition is required at launch; advanced transitions remain optional enhancements.

## 21 Linked research register

Sources were accessed on 16 September 2026. Dates below appear only where explicitly shown by the retrieved page. These sources have different evidential roles; portfolio examples are not employment case-control studies.

| ID | Source | Evidence role and limitation |
| --- | --- | --- |
| S1 | [NN/g — 5 Steps to Creating a UX Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/) · Rachel Krause · 4 Aug 2019 | Hiring research and practical portfolio guidance; UX population, not engineering salary research |
| S2 | [Amazon Jobs — SDE III Interview Prep](https://www.amazon.jobs/content/en/how-we-hire/sde-iii-interview-prep) | Primary employer guidance about senior engineering evaluation; not proof that a portfolio is required |
| S3 | [GitHub Docs — Using your GitHub profile to enhance your resume](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) | Primary guidance on presenting technical work; no causal conversion estimate |
| S4 | [NN/g — The Aesthetic Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/) | Usability-perception research synthesis; not compensation evidence |
| S5 | [NN/g — 5 Principles of Visual Design in UX](https://www.nngroup.com/articles/principles-visual-design/) | Visual hierarchy and composition principles |
| S6 | [Creative Bloq — Design portfolio examples](https://www.creativebloq.com/portfolios/examples-712368) | Editorial examples and creative inspiration; selection bias and designer focus |
| S7 | [Awwwards — Portfolio website collection](https://www.awwwards.com/websites/portfolio/?page=40&source=post_page---------------------------) | Search-visible gallery context; main collection fetch was unavailable; no site-level hiring conclusions drawn |
| S8 | [Brittany Chiang](https://brittanychiang.com/) | Primary portfolio example; identity and content hierarchy observed from retrieved page |
| S9 | [Josh W Comeau](https://www.joshwcomeau.com/) | Primary example of technical publishing and explanatory content |
| S10 | [Bruno Simon](https://bruno-simon.com/) | Primary example of an interactive creative-developer portfolio |
| S11 | [Google web.dev — Web Vitals](https://web.dev/articles/vitals) · updated 31 Oct 2024 | Official performance metrics, thresholds, and measurement guidance |
| S12 | [W3C — How to Meet WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) | Primary accessibility criteria; automated tests alone do not establish conformance |
| S13 | [Google Search Central — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | Official crawling and rendering guidance |
| S14 | [React Router — Rendering Strategies](https://reactrouter.com/start/framework/rendering) | Official technical guidance for framework rendering and prerendering |
| S15 | [Codrops — Inside Corentin Bernadou’s Portfolio](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/) · 5 Mar 2026 | Creator's account of editorial structure and motion; inspiration, not hiring evidence |
| S16 | [Codrops — Building Cerebrium](https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/) · 23 Jul 2026 | Firsthand technical case study about making infrastructure understandable |
| S17 | [Codrops — Building the PX PUSH Website](https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/) · 7 Aug 2026 | Creator account of a coherent experiential concept; not an engineering recruitment study |
| S18 | [Chrome for Developers — What is new in web UI](https://developer.chrome.com/blog/new-in-web-ui-io26) | Official guidance on contemporary browser UI capabilities; support must be feature-tested |
| S19 | [WebKit — A guide to Scroll driven Animations with just CSS](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) · 20 Jun 2025 | Primary browser-engine explanation of native scroll animation |
| S20 | [OpenAI — GPT 6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) | Official capability and reasoning-effort documentation; API limits are not subscription allowances |
| S21 | [OpenAI — Models](https://developers.openai.com/api/docs/models) | Official relative model positioning; module assignments here are project recommendations |
| S22 | [ChatGPT Learn — Pricing and usage](https://learn.chatgpt.com/docs/pricing) | Official allowance guidance and credit rates; the user's actual account balance was not inspected |

Searches also surfaced SEO-led best-developer-portfolio lists and anecdotal forum discussions. They were not used to claim hiring conversion rates, salary uplift, or universal recruiter preferences. The supplied code and historical screenshots informed the local audit; neither independently verifies professional achievements.

## 22 Distinctive design research and revised direction

### What the newer examples contribute

Corentin Bernadou's March 2026 case study combines a readable editorial structure with geometry and purposeful motion. Its grid and ruler experiments extend the same visual idea rather than adding unrelated effects. The useful principle is to establish an identifiable graphic language that remains coherent when the effects are absent. Ravi should develop his own language from request paths and device states. [S15](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/)

Cerebrium's July 2026 case study demonstrates an approach to visualizing abstract infrastructure. This is especially relevant to a backend portfolio, where screenshots alone rarely communicate the important work. The transferable idea is to give an invisible system a legible spatial representation. The proposed SVG exhibits below adapt that principle without inheriting a full 3D rendering stack. [S16](https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/)

PX PUSH's August 2026 case study organizes an experience around a single machine-like concept. The lesson is conceptual consistency: navigation, motion, composition, and language can all support one idea. Ravi's equivalent should be an inspectable engineering decision, with direct access to conventional reading and contact actions. [S17](https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/)

These examples establish creative possibilities, not proof of employment returns. The combination proposed here is tailored to Ravi's work; individual ideas such as diagrams, replay controls, and disclosures already exist elsewhere. The objective is a recognizable portfolio, not an unsupported claim of inventing a new interface pattern.

### Updated concept and homepage

Keep **Systems in Motion** as the overall direction, but sharpen its expression to **One decision changes the whole path**. Use this as the visual design brief rather than mandatory headline copy. Make the opening composition an annotated engineering exhibit, not a standard greeting next to decorative artwork.

On the overview homepage, feature the phone-to-watch path as the opening exhibit because two physical endpoints are quickly understandable. On the backend edition, feature client requests before and after API composition. On Android, feature the verified device communication story. This supersedes the combined Device–Contract–Service–Data topology in section 11.1: each visible topology now belongs to a named project.

Place the name, role, short introduction, resume, and contact in a compact left column occupying roughly four desktop columns. Give the selected project exhibit the remaining eight columns, with a large caption stating the actual decision. Keep its title and case-study link visible without interaction. A thin connector exits the exhibit toward its related work entry below, creating visual continuity. The connector is decorative, never the sole navigation affordance.

Use the existing warm canvas, ink, and blue tokens. Extend them through a distinctive drawing convention: quiet gray for the previous route, blue for the selected route, outlined nodes for external systems, filled nodes for owned components, and small numbered annotations for decisions. Provide an explicit legend. Ownership styling must reflect confirmed contribution and should never imply sole ownership of a team's entire platform.

On mobile, introduction and resume appear first, followed by a compact exhibit and a direct Read the case study link. There is no entrance sequence. The page is useful before anyone touches the exhibit.

### Avoiding a repetitive portfolio appearance

Replace repeated identical project cards with three related but different presentations. Living Labs uses a wide architecture composition and a narrow evidence column. Find My Mobile uses a before/after device diptych. Zero Miles uses a real app screen beside a transaction sequence. The archive can remain compact and consistent; distinctiveness belongs where the strongest evidence warrants attention.

Use typography with deliberate contrasts in size and density, an asymmetric grid, and original diagrams. Avoid assembling the familiar combination of a huge greeting, gradient orb, skill-logo strip, uniform bento grid, infinite marquee, and generic availability badge. Do not add decorative terminals or a chatbot merely to signal technical sophistication.

### Recommended new elements

| Element | Distinctive contribution | Where it belongs | Hiring value hypothesis | Priority |
| --- | --- | --- | --- | --- |
| Request-path exhibit | Gives the opening screen a project-specific identity | Hero and flagship case | Communicates engineering scope quickly | Launch |
| Decision replay | Lets reviewers compare two architectural choices | Living Labs or FMM | Exposes reasoning and tradeoffs | One at launch if budget allows |
| Evidence detail | Attaches definition and scope to a result | Metric and result sections | Makes impressive claims more credible | Launch |
| Decision annotations | Shows rejected alternatives and ownership in context | Diagrams and case narrative | Creates useful interview questions | Launch static |
| Narrative diagram updates | Aligns diagram emphasis with the paragraph being read | One long case study | Reduces the effort of following a system | Enhancement |
| Pairing race simulation | Demonstrates a concurrency invariant | Zero Miles | Makes correctness inspectable | Later |
| Component-focused transitions | Preserves visual context when changing diagram state | Exhibit controls | Adds polish without blocking navigation | Enhancement |
| Technical index by problem | Links Reliability, Contracts, and Concurrency to specific evidence | Work index or About | Helps a manager find relevant depth | Later, only if navigation needs it |

Limit the first release to one hero exhibit, one replay, and reusable evidence details. Do not build every row just because it is specified. This replaces the earlier assumption that visual differentiation can wait entirely until after launch; the distinct static composition is now part of the first release.

## 23 Detailed specifications for the new elements

### Request path exhibit

**Content:** a named project, a one-line engineering decision, a schematic, a short caption, and a permanent case link. Maximum five primary nodes in the hero. More detailed architecture belongs inside the case. Use schematic device outlines rather than unauthorized product imagery.

**Geometry:** desktop exhibit approximately 720 × 420 px within the responsive grid; mobile approximately 350 × 260 px with a purpose-designed vertical layout. SVG viewBox is independent of CSS size. Keep diagram labels in HTML or ensure a minimum readable rendered text size. Do not shrink the entire desktop diagram until its labels become illegible.

**Controls:** Before and After buttons, selected state, optional Inspect decision action. Prefer ordinary pressed buttons over a custom tab system unless full tab semantics are implemented. Show both views in print and a concise description without JavaScript. Focus stays on the activated control. Do not auto-advance.

**Motion:** crossfade unused connectors over 160 ms and emphasize the new path over 240 ms. No simulated stopwatch, random throughput counters, or invented live packets. A brief explanatory pulse may run once following user input. Under reduced motion, switch state immediately.

**Acceptance:** a reviewer can identify the two endpoints and the changed route without interaction; desktop and mobile display the same factual claim; no diagram depends on private production access; the route illustration is labeled schematic.

### Decision replay

Use three steps: Context, Decision, Consequence. Each step changes the highlighted part of the same diagram and shows a 30–50 word explanation. Consequence includes a tradeoff or eligibility constraint, not only a positive result. Example for FMM: state the applicable operation and connectivity conditions rather than claiming the cloud is never necessary.

Use explicit Previous and Next buttons with a Step 1 of 3 label. There is no countdown, autoplay, or required completion. A Show all steps link exposes the full text. On mobile the diagram remains above the current text; do not pin a panel that consumes the screen. Announce the selected step politely without reading the entire case again.

Store the steps in typed content and render them with a small deterministic reducer. No LLM, remote service, or real user data is required at runtime. Test first step, last step, repeated clicks, navigation away, reduced motion, and no-JavaScript presentation.

### Evidence details

Next to a published metric, provide a descriptive control such as How this was measured. Expanding it reveals baseline, result, unit, scope, period, method, and a public source where available. Use an inline native disclosure as the default so the information cannot fall outside the viewport or hide behind a hover interaction.

For wide screens, a browser-supported anchored popover may be added later, but it must show exactly the same content. Escape dismisses a popover and focus returns predictably. On small screens remain inline. Unsupported anchoring should never produce misplaced content; use the inline version instead.

Example form: **Client API calls — 45% fewer in the measured flows.** The disclosure must specify which flows and how calls were compared before that number is published. Without that information, use the qualitative statement already defined in the evidence ledger. An attractive evidence panel is not a substitute for actual evidence.

### Narrative diagram updates

On a flagship case at widths of at least 1100 px, place a 360–420 px schematic beside a roughly 620 px narrative. This temporarily replaces the sticky contents rail within that section; do not stack both sticky interfaces. Keep a short inline contents list above it.

As each subsection becomes active, highlight the corresponding node using IntersectionObserver or a native view timeline where supported. Scrolling only changes emphasis; it does not alter the written result or conceal unvisited text. On narrower screens use a separate static diagram per major step or one inline diagram with all annotations. Reader scrolling must remain native.

### Contemporary browser features and adoption policy

Chrome's 2026 UI guidance describes element-scoped view transitions, which can update a subtree while the rest of the page stays usable. It also distinguishes experimental transition work from other capabilities. Use scoped transitions only as enhancement for the exhibit; do not depend on experimental two-phase navigation. [S18](https://developer.chrome.com/blog/new-in-web-ui-io26)

WebKit explains scroll and view timelines for CSS-driven animation. This supports selective diagram emphasis without replacing native scroll behavior. The explanation does not mean every target browser supports every animation feature. [S19](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/)

| Capability | Proposed use | Feature test or validation | Fallback |
| --- | --- | --- | --- |
| Same-document view transitions | Exhibit state continuity | Check `document.startViewTransition`; verify React commit timing | Immediate state update |
| Element-scoped transitions | Isolate diagram transition | Check the actual element method before calling it | Local CSS opacity change |
| CSS scroll or view timeline | Nonessential progress or emphasis | `CSS.supports('animation-timeline', 'view()')` and target-browser testing | Static emphasis or IntersectionObserver |
| CSS anchor positioning | Optional evidence popover placement | Check relevant CSS properties and layout behavior | Inline disclosure |
| Container queries | Diagram layout based on available width | Test shipped browser matrix and resize behavior | Media queries |

Do not publish a fixed browser-support table copied from a launch article. Validate the implementation on the browsers available at release. A supported API does not guarantee an accessible interaction. Do not add a heavy polyfill solely to preserve cosmetic motion.

### Differentiation acceptance test

Capture the hero with animation disabled. If it still resembles a generic personal-site template with replaceable text, revise the composition and artwork. Ask a reviewer what engineering decision they remember, not just which animation they liked. The first minute should expose one specific contribution and a clear hiring route.

All new modules remain inside the performance budgets in section 16. The roughly 15 KB additional interaction budget applies to the combined first-release exhibit and replay code, not independently to every module. Increase scope only after measurement justifies it. Expect around 8–14 hours of additional design and implementation work over the earlier estimate, partly offset by removing generic card and hero work. Treat this as an estimate, not a commitment.

## 24 Model allocation and Astra usage plan

### Guiding decision

Use **Terra as the default implementation model**, **Sol for difficult engineering and final technical integration**, **Luna for constrained mechanical work**, and **Astra for a few high-leverage creative decisions and exceptional unresolved problems**. These assignments are project recommendations, not claims that a benchmark proves one model is uniquely artistic.

OpenAI describes GPT-6 Astra as its most capable model for demanding end-to-end work and supports multiple reasoning levels. The model catalog positions Terra as balancing capability and cost and Luna for cost-sensitive workloads. [S20](https://developers.openai.com/api/docs/models/gpt-6-astra) · [S21](https://developers.openai.com/api/docs/models)

The official usage guide says consumption varies with workload, context, and model; displayed message ranges are estimates, not fixed entitlements. Check the account usage dashboard or CLI `/status` for the actual remaining allowance. Smaller models can extend usage, and Astra Fast mode currently has a 2.5× credit multiplier. Use standard speed when conserving allowance. No account balance or reset time was inspected for this plan. [S22](https://learn.chatgpt.com/docs/pricing)

### Model by module

| Module or decision | Default model | Reasoning starting point | Astra involvement |
| --- | --- | --- | --- |
| Final visual concept and distinctive homepage composition | GPT-6 Astra | High | One focused concept decision |
| Hero diagram art direction and visual language | GPT-6 Astra | High | Define composition, states, and constraints once |
| Static SVG artwork from the approved diagram spec | GPT-5.6 Terra | Medium | None unless the visual idea remains unresolved |
| Typography tokens, spacing, buttons, cards, navigation | GPT-5.6 Terra | Medium | Review representative screenshots at one checkpoint |
| Responsive homepage and role editions | GPT-5.6 Terra | Medium | No routine breakpoint debugging |
| Request-path state model and React integration | GPT-5.6 Sol | High | Only if a fundamental design conflict remains |
| Decision replay and narrative diagram behavior | GPT-5.6 Sol | Medium, then high if needed | Optional bounded critique of the prototype |
| Case-study template and evidence disclosure | GPT-5.6 Terra | Medium | None |
| Content extraction and claim-ledger formatting | GPT-5.6 Luna | Low or medium | None; factual approval stays with the owner |
| Flagship narrative, ownership, and technical accuracy | GPT-5.6 Sol | Medium | Only the final positioning sentence if needed |
| Secondary project pages using the settled template | GPT-5.6 Terra | Medium | None |
| Metadata, sitemap, route manifests, asset naming | GPT-5.6 Luna | Low | None; automated validation required |
| Prerendering migration, redirects, and error handling | GPT-5.6 Sol | High | Escalate only a diagnosed architectural blocker |
| Small test fixes and known mechanical defects | GPT-5.6 Terra or Luna | Low or medium | None |
| Accessibility and performance investigation | GPT-5.6 Sol | Medium or high | Only an unresolved cross-cutting problem |
| Final artistic coherence review | GPT-6 Astra | Medium or high | One screenshot-based review, maximum five findings |
| Release checks and documentation | GPT-5.6 Terra | Medium | None |

Use available reasoning settings in the actual client; do not assume every interface exposes identical controls. Start at the listed level rather than using maximum effort for every task. “Critical” work does not automatically require Astra: correctness also depends on clear constraints, reproducible tests, and inspection of real output.

### Three planned Astra sessions

**A1 — Choose the identity.** Input: a short brief, selected research, verified project facts, and the current hero screenshot. Output: at most two directions, one chosen composition, visual tokens, and a precise mobile adaptation. Stop when the choice is concrete enough for Terra to implement. Do not ask Astra to build all routes in the same task.

**A2 — Review the flagship prototype.** Input: desktop and mobile screenshots, the state diagram, and one concise explanation of what feels wrong. Output: up to five ranked corrections to hierarchy, originality, or interaction logic. Sol or Terra applies them. Omit this session if A1's implementation is already coherent and usable.

**A3 — Final artistic review.** Input: six selected screenshots across the homepage and two flagship cases, with known constraints and test status. Output: a short pass/fix assessment and at most five material issues. Reserve this session instead of spending the allowance on repeated minor CSS edits.

Architecture escalation is an exception outside these three planned sessions. It requires a short statement of the unresolved decision, affected files, competing approaches, and actual failed evidence. Astra should resolve that decision, then return implementation to Sol or Terra.

### Allocation target and cost interpretation

For planning, aim for about **10% Astra, 25% Sol, 50% Terra, and 15% Luna by bounded work packets**. This is a workflow target, not a token quota or a promise of savings. A long Astra task can consume more than many short routine tasks. Count work packets and inspect actual usage separately.

Avoid estimating subscription life from API dollars. When using API billing, compare current official token prices; when using included Codex allowance, consult its usage display. No fixed number of Astra sessions is guaranteed by this plan. If only Sol is available, use it for concept work with an explicit visual brief; if only Terra is available, ship the strong static composition and defer complex motion.

### When to escalate and when to stay on a smaller model

Stay on Luna or Terra when the change has a settled design, a bounded file scope, and an objective check. Examples: correcting a route label, adding approved content, resizing an asset, implementing a specified disclosure, or fixing a known test failure.

Move to Sol when the task crosses routing, hydration, animation lifecycle, accessibility, or performance boundaries. After two unsuccessful targeted attempts, stop repeating the same prompt and produce a diagnostic handoff. Move to Astra only if Sol identifies a remaining fundamental ambiguity or if artistic quality is the actual unresolved issue. Do not spend Astra on installation logs, formatting, repetitive source reading, or waiting for builds.

## 25 Execution workflow and reusable handoffs

### Sequential workflow by default

This plan does not require parallel agents. Select the intended model for each bounded task, using the client's model control where available. A document cannot silently change the current model, and writing a model name in a prompt alone does not guarantee a switch. No model configuration has been changed as part of this research update.

First, Terra prepares a concise implementation brief from the relevant sections. Astra makes the A1 design decision. Terra builds tokens, the page shell, and static project compositions. Sol implements and validates the one chosen interaction and the rendering migration. Luna handles settled metadata and content transformations. Sol performs technical integration. Astra reviews the finished visual system once. Terra applies the remaining bounded fixes.

Keep the approved design stable between checkpoints. A model implementing a footer or case template should not independently invent a new palette, typography, navigation metaphor, or project hierarchy.

### What to pass between models

Create an implementation handoff containing: objective; selected direction; allowed files; relevant document sections; inputs and verified claims; component contract; required states; acceptance checks; known failures; and the next unresolved decision. Keep this brief around 500–900 words where possible, plus the exact relevant files. This is a target for task clarity, not a hard cap that permits omitting necessary context.

Do not attach the complete growing conversation, every source article, and the entire repository to each small task. Keep a short decision log and let the next model read the relevant section or file when needed. Use scripts and build tools for deterministic checks; the model interprets failures rather than repeatedly regenerating unchanged output.

### Prompt for Astra art direction

```text
Select GPT-6 Astra in the client before running this task.
Task: finalize the portfolio's visual identity and hero composition.
Read sections 6–7 and 22–23 of the blueprint, plus the short handoff.
Use the confirmed project facts and supplied screenshots.
Return no more than two genuinely different concepts and recommend one.
Specify desktop/mobile composition, diagram grammar, type, and states.
Preserve the readable hiring path and the existing performance budgets.
Do not implement secondary routes or add unsupported achievement claims.
Finish with an implementable design contract and stop.
```

### Prompt for Terra implementation

```text
Select GPT-5.6 Terra in the client before running this task.
Task: implement only the named module from the approved design contract.
Read the relevant blueprint sections and the listed source files.
Preserve approved tokens, content facts, navigation, and component APIs.
Implement desktop, mobile, focus, reduced-motion, and fallback states.
Run the checks appropriate to the changed behavior.
Report files changed, checks performed, and any unresolved mismatch.
Do not redesign adjacent modules or expand the scope.
```

### Prompt for Sol technical work

```text
Select GPT-5.6 Sol in the client before running this task.
Task: resolve the named architecture or interaction problem.
Use the minimal reproduction, expected behavior, and existing test output.
Explain the key tradeoff briefly, implement the fix, and verify it.
Preserve progressive enhancement and the public content contract.
Escalate only if a specific unresolved decision blocks a correct result.
Return a concise technical handoff rather than another full site plan.
```

### Prompt for Luna routine work

```text
Select GPT-5.6 Luna in the client before running this task.
Task: perform the specified mechanical transformation on the listed files.
Use only approved content. Do not infer facts or alter design decisions.
Validate output against the supplied schema or deterministic check.
If the input is ambiguous, identify the exact record needing a decision.
Report the changed records and validation result briefly.
```

### Completion criteria for the model plan

The plan is working when implementation continues between Astra checkpoints, small tasks do not require repeating the entire design brief, and the final result remains coherent. Track actual model use and rework in the decision log. If a lower-cost model repeatedly needs substantial repair on a module, assign that module to Sol; if Astra is only making minor spacing fixes, improve the design contract and move those fixes back to Terra.
