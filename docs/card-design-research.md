# Compact card revision — 17 September 2026

User direction: restore project cards with less empty space, preserve the improved Find My Mobile treatment, change the background palette, and use pills selectively. This supersedes the blanket removal recommendation in design-reassessment.md.

## Research consulted before implementation

- [Interrogating Design Homogenization in Web Vibe Coding](https://arxiv.org/abs/2603.13036): a March 2026 research preprint discusses homogenization risks and deliberate intervention in generated design workflows. It does not establish a specific palette or component as inherently AI-generated.
- [NN/g: Good Visual Design, Explained](https://www.nngroup.com/articles/good-visual-design/): emphasizes alignment, typography, strategic color and useful imagery. Application: make titles and contributions visually primary; keep supporting graphics proportionate.
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines): used as an interface-quality reference, not a visual template.

## Applied decisions

White canvas, charcoal text, restrained slate-blue actions. Project-specific wine, plum, ochre and teal accents are limited to metadata and fine rules rather than large pastel rectangles.

Restore bordered project cards in two columns on desktop and one on mobile. Place project identity and contribution before the diagram. Replace the old 248px minimum cover with a compact natural-height architecture strip. Remove duplicated diagram captions from the visible layout.

Use rounded pills for action buttons, skill tags and history filters. Cards keep modest corners; diagrams retain their structural geometry. Keep the Find My Mobile schematic, before/after explanation and eligibility caveat; do not add a duplicate diagram strip for its project card.

Retain the useful recent improvements: case summaries, evidence disclosures and the complete work archive. This is a visual restoration, not a rollback of content integrity.

## Verification

Production TypeScript/Vite build passed after the changes. Browser visual review has not been completed; the last available Chrome state required extension permission. Do not report this build as proof of rendered visual quality.
