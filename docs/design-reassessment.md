# Portfolio reassessment — 17 September 2026

## Verdict and scope

The current implementation partially follows the palette, route editions, accessible controls, and lightweight delivery recommendations. It does not yet deliver the research's central proposition: make specific engineering judgment quickly understandable and inspectable. It is not ready to be called a completed redesign.

Reviewed the supplied rendered screenshot, current homepage, project list/exhibits, schematic, case-study component/data model, routing, metadata, and blueprint sections 1–3, 9–11, 22–23 plus the Astra contract. The screenshot establishes the appearance of the independent-project section only. No fresh browser session was available during the preceding implementation pass; full-page visual, keyboard, zoom, and mobile validation remain outstanding. Source inspection is not a substitute for those tests.

This is an audit and revised design specification. It does not change the application. All subsequent implementation remains local.

## Research-to-implementation audit

| Requirement | Current evidence | Assessment / correction |
| --- | --- | --- |
| Explicit senior backend / Android positioning | Role links and resumes exist; homepage headline now says “Behind the screen. Inside the system.” | Partial. Restore explicit specialization in the main heading. The poetic copy weakens immediate role recognition. |
| Three curated projects per edition | Home passes all six items to IndexList | Missing curation. Feature three; put remaining work in a compact archive with a usable full-work route. |
| Different presentation when evidence warrants it | ProjectExhibit renders the same three-step sequence for every project | Fails blueprint §22. Remove repeated colored panels. They introduce no inspectable artifact. |
| One memorable engineering decision | Hero uses a named project and before/after buttons | Partial. Keep the named decision, but change explanatory content as well as highlight. |
| Faithful before/after topology | Backend previous path ends at the services group; selected path reaches three services | Incomplete. Connect both alternatives to the same real conceptual endpoints. Do not imply that aggregation removes downstream work. |
| Context → decision → consequence | No three-step narrative or explanation change | Missing. Build one coherent interaction with a tradeoff, rather than a second adjacent widget. |
| Quick case-study summary | Title, frame, role and timeframe precede long narrative | Partial. Add problem / contribution / result and clear status before the essay. |
| Evidence attached to each metric | Metric type has value and label, but no method, baseline, scope, period or source | Missing. A general evidence disclaimer does not qualify individual numbers. |
| Real public artifacts | Repository links exist; project panels contain synthetic summaries | Partial. Link directly to relevant code when verified; use real screens only when available and authorized. |
| Intentional color and typography | Shared palette fixed; project colors now dominate empty panels | Technically improved, visually misallocated. Concentrate saturation around one focal exhibit and controls. |
| Short recruiter route | Resume and contact remain visible | Keep. Do not make any demo a prerequisite to those actions. |
| Initial readable HTML | index.html contains an empty root | Missing. Removing reveal hooks does not provide no-JavaScript content. Prerender essential routes. |
| Consistent discovery metadata | Case component changes title/description; role provider controls OG; Twitter remains generic | Incomplete. Use one route metadata definition and confirmed site origin. ravimitte.dev is currently hardcoded without evidence of approval. |
| Performance | Last successful build: approximately 107 kB gzip JS and 4 kB CSS | Bundle targets met. This does not prove LCP, INP, mobile layout or usability. |
| Responsive and accessible experience | Media queries, pressed controls and focus styles exist | Partially implemented, not verified in browser. SVG labels can become small as the desktop viewBox shrinks. |

## Why the screenshot feels generic

The artwork occupies more space than the project argument. All three visible blocks tell a linear three-step story regardless of the underlying problem. A database race, an agent event stream, and a development loop should not look interchangeable.

The panels also lead with implementation terminology before establishing the product or Ravi's contribution. Color changes identify categories without explaining relevance. There is no evidence to inspect inside the largest elements.

The solution is not another color pass or a larger animation library. Change the information hierarchy and give each large element a specific job.

## Revised composition

Use a concise identity and role opening followed by one large decision exhibit. Preserve the blue, navy and mint drawing language, but avoid enclosing every section in a panel. Use a strong heading, a narrow metadata column and one continuous reading flow.

Suggested backend heading: “Backend engineering, from API contract to data pipeline.” Suggested Android heading: “Android engineering across phones, watches and connected devices.” These are draft positioning statements to check against the final content.

Selected work becomes three compact editorial entries. Each starts with project name, product context, contribution, and a clear case link. Include one bounded result if evidence supports it. Supporting artifacts appear only when they explain more than the text. A real Zero Miles screen may deserve space; an invented screenshot or a three-word arrow strip does not.

Keep employer work, independent work and prototypes clearly labeled. Remaining projects live in a compact archive, not another large card grid. Preserve recognizable resume/contact affordances.

## Reconsidered interaction priorities

“Cutting edge” should mean a reviewer can investigate something unusual and useful, not that the page uses the newest animation API. The following are design recommendations, not measured salary or conversion guarantees.

### 1. A decision you can inspect — first priority

Evolve the existing flagship diagram into one integrated explanation:

- Initial state: visible selected design, named contribution and one-sentence constraint. Nothing requires a click.
- Before / Selected design changes topology emphasis and the nearby explanation.
- “Why this boundary?” expands the actual alternative, reason for choosing it and cost.
- Living Labs: client composition changes; downstream services and retained REST access remain.
- FMM: direct communication is limited to supported operations and conditions. Do not invent a universal fallback or transport.
- Keep node locations stable and previous context readable. Use short local transitions, no autoplay and no simulated performance.
- On mobile use readable HTML labels or a dedicated narrow diagram, not scaled-down desktop text.

Success: a viewer can explain what changed and name one tradeoff. If the diagram is removed, the adjacent prose still gives the complete argument.

### 2. Evidence beside the claim — first priority

Each published numeric result gets a short visible scope label and optional “Measurement details” disclosure. Fields: result, baseline, unit, scope, period, method, source, and limitations. Missing information remains missing; replace an unsupported headline number with a concrete qualitative result.

Use native inline disclosure. Avoid hover-only tooltips and a global “evidence” badge. This is less theatrical than animation but materially improves interview usefulness.

### 3. Two requests, one token — one later signature module

Place a deterministic concurrency demonstration inside Zero Miles, after verifying the public pairing function:

- Two request lanes target one token.
- Step through acquisition, waiting, transaction completion, and the second request's actual supported outcome.
- Show the changing token/row state and a short transcript.
- Provide Step and Reset; show all steps without interaction.
- Label it an illustrative simulation, not a live database test. Do not invent an error code or successful production benchmark.

The current “hash → lock → pair” picture cannot explain contention. This interaction can, which is why it earns its space. Do not build until the SQL confirms exact behavior.

### 4. Real artifact inspection — secondary

For a public project, show a small authentic code excerpt or screen next to the decision it supports. Link the excerpt to its file/revision after verification. On mobile keep it inline; do not add a desktop-like IDE shell.

For DermaAssist, a later synthetic event replay may show tool start/completion, deterministic checks and result events. It must not claim to expose private model reasoning. Build this only if the concurrency module is insufficient to demonstrate the desired breadth; launching both is unnecessary.

### Explicitly reject

Repeated diagram covers, uniform bento grids, fake live telemetry, animated skill badges, mandatory intro sequences, cursor effects, scroll hijacking, decorative code terminals, AI recruiter chatbots, and 3D scenes unrelated to the candidate's work. Do not replace the removed panels with another repeated ornament.

## Fresh research and interpretation

- [Josh W. Comeau — How I Built My Blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/), accessed 17 September 2026: demonstrates interactive widgets embedded directly in technical explanation. Transfer that coupling of control and explanation, not the site's stack or an unrelated widget.
- [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/), accessed 17 September 2026: supports prioritizing primary information while deferring secondary detail. Here, the contribution and result stay visible; methodology and implementation detail can expand.
- The original blueprint's hiring sources remain relevant. They support clarity, ownership, decisions and results; they do not prove that interactive portfolios cause higher compensation.

These sources inform the recommendations. The proposed composition, effort priorities, and acceptance gates are project judgments.

## Implementation order and acceptance

1. Remove redundant project covers; restore role clarity and curate three projects. Verify that titles, contributions and case links are scannable before adding an interaction.
2. Rewrite flagship case openings and create per-claim evidence records. Mark unconfirmed material internally, not with decorative public badges.
3. Finish one faithful decision exhibit, including tradeoff, keyboard controls, narrow layout and static equivalent.
4. Repair metadata/prerendering using a confirmed origin; preserve existing links during route changes.
5. Review actual rendered pages at 1440, 768, 390 and 320 CSS pixels; test 200% text scaling, keyboard focus, reduced motion, PDF links and unknown routes.
6. Only then add the verified pairing simulation if it demonstrates more than the case narrative already does.

Definition of done: no low-information cover panels; identifiable role and contribution on first view; one specific decision understood without interaction; inspectable supporting evidence; matching mobile content; measured browser QA. A passing build alone does not satisfy these criteria.
