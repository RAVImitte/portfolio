# A1 design contract — The Decision Path

Status: chosen direction, ready for implementation. Scope: homepage and role-edition hero, visual tokens, and selected-work presentation; no secondary-route redesign. Based on blueprint §§6–7 and 22–23, current Home/data/style source, and historical `.verify/ok-home.png` and `ok-m2.png`. Those screenshots establish the old composition, not current browser defects.

## Decision

Two concepts considered:

1. **The Decision Path — chosen.** A compact personal introduction sits beside an oversized annotated system diagram. A visible previous route and selected route explain one engineering decision. The composition works as a static technical exhibit and becomes more informative on explicit interaction.
2. **Engineering Field Notes.** Serif editorial spreads, pale diagrams, marginal annotations, and a continuous vertical project narrative. A coherent evolution of the present design, but prose would still dominate the first impression and the service/device specialization would be less immediately recognizable.

The memorable element is the shape of a real engineering decision: a cloud detour replaced for eligible device operations, or client fan-out moved behind a composition layer. Typography and one annotated connector make that idea recognizable throughout the homepage. No separate decorative hero artwork, stock imagery, miniature dashboard, global glow, or animated background is needed.

## Desktop composition

Use a 1200 px maximum content width, centered. At 1440 px, outer margins are 120 px. Header is 72 px; hero begins 64 px below it. Use a 12-column grid with 24 px gaps: introduction spans four columns (384 px), exhibit spans eight (792 px). Both align at the top. At 1024–1199 px, use a 5/7 split and smaller heading; below 1024 px, stack. Content height remains natural.

The introduction contains, in order:

- `Ravi Mitte` as a small, clear identity line if the name is not immediately adjacent in the header; professional title and location in a wrapping 14 px line.
- A proposition as the single h1. Overview: **Reliable systems. From service to screen.** Backend: **Clear contracts. Reliable services.** Android: **Connected devices. Reliable experiences.** Use normal wrapping; desktop-only editorial line breaks may separate the two sentences.
- A 35–50 word introduction grounded in blueprint §13. Keep it within approximately 34 characters per line in this narrow column. Start with “I'm Ravi Mitte” if the separate identity line is omitted. Do not repeat the full skill inventory or use defensive copy such as “not a PDF dump.”
- Primary **Explore selected work**, linking to `#work`; secondary role-specific **Backend resume** or **Android resume**, both PDFs on an overview. Let actions wrap instead of squeezing them into one row. Keep direct contact accessible in the header.
- Overview / Backend / Android as ordinary route links, with the active edition underlined and marked `aria-current="page"`. Do not implement fake tabs that merely change the hero.

The exhibit has a dark, nearly rectangular field, 12 px corners, approximately 420 px tall at desktop size. Its top row contains a 13 px exhibit number and `Schematic`; its title is a 24–28 px project name. The central diagram occupies most of the field. A single `01` decision annotation sits alongside the changed segment. Put the decision caption and permanent **Read the case study →** link immediately below the field on the light surface. Do not put all explanatory text into the SVG.

Default diagram must already show the selected route, endpoint labels, and the contextual previous path. The case link and meaning are visible before any interaction. A thin decorative blue connector may leave the lower edge and terminate at the selected-work section rule; keep it local to this composition and out of text and controls. It is never a navigation target.

At 1440 × 900, aim to show the selected-work heading and beginning of its first project. Prioritize readable content over forcing this target at smaller heights or enlarged text. Do not set a full-viewport hero, pin it, or hide overflow to manufacture the crop.

## Exhibit content by edition

| Edition | Named project and nodes | Decision caption |
| --- | --- | --- |
| Overview, when that route exists | Find My Mobile: Phone, cloud relay, Watch. Two endpoints remain visually dominant. | “A direct device path for supported phone–watch operations.” |
| Android | Same Find My Mobile topology; emphasize the two device endpoints and the direct communication segment. | “Move supported phone–watch operations onto a direct device path.” |
| Backend | Living Labs: Client, GraphQL composition layer, and a grouped REST-services region containing up to three representative service nodes. Label the group “Representative services,” never invent private service names. | “Compose client data through GraphQL while existing REST clients keep working.” |

For Find My Mobile, use neutral schematic phone and watch outlines. The selected direct connection is central; the older cloud relay bends above it. Use arrowheads only when the operation direction is confirmed; otherwise use a bidirectional line labeled “communication.” Small text below the caption: “Applies to supported operations and connectivity conditions.” Do not depict Bluetooth, transport protocols, a particular watch model, XR hardware, or a universal cloud fallback without confirmation.

For Living Labs, keep service endpoints fixed across states. Before: the client fans out to representative REST services. After: the client connects to the GraphQL layer, which connects to those same services. Gray context indicates retained REST access. The caption must make clear that complexity moved to composition rather than all downstream calls disappearing. No exact service or request count is implied by representative nodes.

No latency, success-rate, user-count, zero-ANR, or “verified” badges in the hero until the evidence ledger supports publication. Candidate-provided architecture is an account of work, not independently verified evidence. Wearable Intelligence must retain “Proof of concept” whenever featured; the model runs on the phone. Do not merge its topology into Find My Mobile.

## Mobile and tablet

Below 1024 px: introduction first, exhibit second, selected work third. At 768–1023 px, the introduction may use a broader 44-character measure, and the diagram retains its horizontal layout if labels fit. Mobile header is 64 px; retain the name, direct Resume action, and accessible Menu button.

Below 768 px use 20 px gutters, reduced to 16 px at 360 px and below, and 36–40 px hero top spacing. h1 is 38–44 px; body 17–18 px. Name, specialization, resume, and primary work action appear before the exhibit. Controls are at least 44 px tall and wrap. Never use `white-space: nowrap` on metadata, action rows, or headings.

At exhibit widths below 480 px, use a purpose-built vertical diagram, approximately 300–350 px wide and 260–300 px tall for the graphic itself. Find My Mobile places Phone above Watch, with the old cloud detour in a side lane and the direct path between the endpoints. Living Labs stacks Client → composition layer → grouped services; its previous route runs in a side lane. Put the numbered decision note below the graphic, not over a connector. Preserve 14 px labels; do not shrink desktop SVG text to fit. The complete mobile exhibit can grow beyond 300 px including its heading, buttons, caption, and link. No horizontal scrolling or sticky diagram on the homepage.

## Visual tokens and drawing grammar

Keep blueprint §7 colors: canvas `#F6F5F1`, white surface, ink `#172033`, muted `#526071`, cobalt `#2457D6`, hover `#1943B5`, light selected fill `#E8EEFC`, decorative line `#D9DEE7`, control border `#7A8798`, diagram `#101827`, diagram text `#F4F7FC`, diagram secondary text `#B5C1D1`, signal `#9DE5D5`.

Use cobalt for actions and paths on light surfaces; use mint for the selected path on dark surfaces, where the existing cobalt is insufficient for small meaningful strokes. This contrast-driven adaptation preserves the blueprint's blue interaction identity. In the diagram legend show **Selected path** as a solid line plus arrow/endpoint marks and **Previous route** as a dashed line. Gray context remains readable, not merely 20%-opacity decoration. Verify actual text and line contrast after implementation.

Connectors are orthogonal with gently rounded bends, 1.5 px for context and 2 px for the selected path. Use fixed visible endpoints and generous space around crossings. No perspective, isometric cubes, or dense grid. One subtle horizontal datum line can organize the field. Node corners are 8 px. External context uses outlined nodes. A filled node means a component Ravi contributed to only where that scope is supported; the legend must say **Contribution area**, not “Owned system.” If scope is unclear, make all nodes outlined and identify the contribution in prose.

Manrope is the heading/body face; IBM Plex Mono is for exhibit numbers, short technical labels, and code. Self-host licensed WOFF2 assets with notices; system sans/mono are valid fallbacks. Do not leave remote Google Fonts or require a font to reveal content. Hero heading: desktop 52–60 px / 1.06, weight 600, tracking approximately -0.035em; mobile 38–44 px / 1.1. This deliberately replaces §7's 72–88 px hero scale to fit §22's four-column introduction. Body 18 px / 1.6, exhibit labels 14–16 px, metadata 13–14 px. Use 24–32 px internal exhibit padding, 24 px between diagram and caption, and 80–96 px between major desktop sections. No serif display heading, texture overlay, or tiny letter-spaced paragraph text in the new homepage.

## Interaction, accessibility, and fallbacks

Static composition ships first. When implemented, the only hero interaction is **Before / After**, ordinary native buttons with `aria-pressed`; **After** is initially selected. Keep both state labels and the previous-route context visible. Activating the already selected state does nothing. A 160 ms connector crossfade and at most 240 ms emphasis transition is sufficient. Never move endpoint labels, shift field height, auto-advance, or simulate speed with traveling packets. Focus remains on the activated button; announce a short changed-state summary politely only after explicit activation.

Buttons use blue/white for the primary action, an identifiable outline for secondary actions, and a fill plus visible “selected” treatment for diagram state. Links gain an underline on hover; all controls receive a visible 2 px focus ring with 3 px offset. Use cobalt focus on light and mint/white focus on dark. Hover reveals no unique information. Press feedback can be color only. Preserve native cursor and scrolling; remove homepage participation in global magnetic, pointer-field, grain, cover, or split-text visibility effects.

Use a `figure` and `figcaption`, with a concise nearby HTML explanation describing endpoints, changed route, and limitation. If the SVG duplicates that text, hide it from assistive technology; do not duplicate every label in an additional live region. Native reading and tab order follow introduction → actions → editions → exhibit controls → case link → selected work. Respect 320 CSS px reflow, 200% zoom, and 44 px principal targets. Contrast targets: 4.5:1 normal text, 3:1 large text and meaningful graphical/control boundaries.

Reduced motion: instantaneous state changes, complete information, no section entrance or smooth scroll. No JavaScript: rendered selected-state diagram, summary, case link, resume, and navigation remain available; omit inert controls. Print: light backgrounds, both concise state descriptions, and both paths or a small static before/after pair. Rendering that HTML is an integration requirement; this contract does not imply that the current Vite shell already supports it.

## Selected work and scope boundary

Display three featured projects per edition in the order specified by blueprint §5. Start with one large project row containing a wide diagram crop and a narrow factual contribution column; follow with two quieter rows with their own device/transaction motifs. Keep title, project category, one contribution sentence, and a clear case link on every row. Avoid duplicate giant hero artwork or six equally weighted cards. Link to the complete work index using its currently valid route.

Honor existing route behavior and links until the routing owner performs the planned migration. Current source has Backend and Android editions only; an Overview link must not silently point to a backend redirect. Render only supported edition links in the interim. Secondary pages retain their existing scope. Namespace homepage styles/tokens as needed so a global token swap does not accidentally redesign those pages.

## Implementation acceptance

1. With animation disabled, the first screen identifies Ravi, the role, and one specific engineering decision. Resume and contact take no exhibit interaction to reach.
2. Capture desktop 1440 × 900, tablet 768 px, mobile 390 px, and 320 px reflow; check long fallback-font text and keyboard focus. Desktop and mobile convey the same claim.
3. The hero has no continuous animation, raster dependency, canvas/WebGL, new animation package, fake telemetry, unsupported metrics, or private product imagery.
4. Preserve engineering budgets: initial JS ≤150 KB gzip, CSS ≤35 KB gzip, initial fonts ≤100 KB transferred, above-fold images ≤250 KB, preferred initial transfer <700 KB. Hero plus any first-release replay share approximately 15 KB gzip of additional interaction code. Target field p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1; lab checks are not field proof.
5. Stop A1 here. Terra implements the static composition; the integration owner handles route/rendering changes and any meaningful interaction. Request a later visual review only if screenshots expose a substantive hierarchy or originality problem.
