# Design System: ITS FAISHA™ — Scent & Soul Sanctuary

> Stitch-optimized semantic design brief. Derived from `../design-system/its-faisha-r1/MASTER.md` (CANDIDATE_PROPOSAL) reconciled against the approved visual truth source `../faisha-gallery/` (104 reference screens @1440px). Governance contract remains `../DESIGN.md`; this file translates the design language for screen generation only.

## 1. Visual Theme & Atmosphere

Warm gallery calm. An editorial fragrance sanctuary for Indonesian women 18+, where depth comes from warm-dark ink on an ivory canvas, never dark-mode drama or glass effects. Density is art-gallery airy (4/10), layouts are gently offset rather than wildly asymmetric (variance 6/10), motion is restrained and purposeful (motion 4/10). The mood reads like a slow-luxury apothecary journal: quiet, tactile, plum-tinted. Every page feels poured, not assembled.

- Hero pattern: asymmetric split, copy left, imagery right, offset baseline. Centered heroes banned above 768px.
- Sections breathe: vertical rhythm 48→120px (`clamp(3rem, 8vw, 7.5rem)`).
- One message per section. No decorative micro-labels stacked on every heading.

## 2. Color Palette & Roles

- **Ivory Canvas** (#FAF3EE) — primary background surface, the whole page ground
- **Cream Surface** (#F7F1EE) — alternate surface, card fill
- **Blush Tint** (#F2E9E5) — soft section tint, chips, disabled fill
- **Warm Dark Ink** (#47312E) — primary text; pressed-button fill (10.95:1 on ivory)
- **Deep Soul Plum** (#5B4750) — THE single accent: CTA fill, links, focus ring, active states (7.77:1 on ivory)
- **Plum Mid** (#75525A) — secondary text, hover fill, functional borders (6.15:1 on ivory)
- **Taupe Hairline** (#BDA494) — decorative dividers only, never text or icons (2.15:1)
- **Botanical Success** (#1B7A43) · **Earth Error** (#B3261E) · **Honey Warning** (#8A5A00) · **Info Slate-Blue** (#1D5F8A) — semantic states, always paired with an icon, never color alone

Rules: exactly one accent (plum), locked page-wide. Saturation under 15% everywhere. No pure black, no pure white. No purple-blue neon, no gradient washes, no second accent appearing in any section.

## 3. Typography Rules

- **Display:** Playfair Display (weights 500, 600) — refined fashion-serif for headlines. Track-tight (−0.01em), controlled scale `clamp(32px, 5vw, 64px)`. Hierarchy through weight and plum color, not raw size. Italic emphasis stays in-family; never mix a third font mid-headline. Italic words with descenders (y g j p q) need line-height ≥1.1 plus one padding unit reserved below.
- **Body/UI:** Plus Jakarta Sans (300–600) — geometric humanist counterpoint. Base 16px minimum, line-height 1.55, measure ≤65ch.
- **Banned:** Inter, Times/Georgia/Garamond/Palatino as real fonts, Fraunces and Instrument Serif as defaults, serif anywhere in dense data tables or admin surfaces.
- Emphasis inside a headline = italic or bold of the same family only.

## 4. Component Stylings

- **Buttons:** flat Deep Soul Plum fill, white label, radius 12px, no glow, no outer shadow. Press = darken to Warm Dark Ink (#47312E) plus 1px down-translate. Disabled = Blush fill + Plum Mid label (5.65:1). Focus = 2px plum ring at 2px offset. One primary CTA intent per section, one label per intent page-wide. Button text never wraps to two lines at desktop.
- **Cards:** only where elevation communicates real hierarchy (product tiles, result modules). Radius 16px, whisper shadow `0 8px 24px rgba(71,49,46,0.08)` tinted to the ink hue, 1px border `rgba(189,164,148,0.4)`. Elsewhere group with spacing and hairlines instead.
- **Chips:** full pill. Shape lock: 12px controls / 16px cards / pill chips — no mixing outside this rule.
- **Inputs:** label above, helper optional below, error inline below in Earth Error plus icon. Focus ring matches button. No floating labels, no placeholder-as-label. All form text ≥AA contrast on its surface.
- **Loaders:** skeletal shimmer blocks matching final layout dimensions, ≤1.2s, announced via aria-live. No circular spinners.
- **Empty states:** composed scenes explaining situation and recovery action, never bare "no data" text.
- **Icons:** one library (Lucide), one stroke width, no hand-rolled paths, no emoji anywhere.
- **Consent UI:** reject must be as easy as accept; marketing consent never pre-checked.

## 5. Layout Principles

- CSS Grid first, never flexbox percentage math. Content max-width 1200px centered.
- Breakpoints fixed: 360 / 768 / 1024 / 1440 (not 375).
- Every multi-column layout declares its <768px single-column collapse explicitly. Zero horizontal scroll at 360.
- Tap targets ≥44px. Full-height sections use `min-height: 100dvh`, never `100vh`.
- Navigation on one line at desktop, height ≤72px.
- No two adjacent sections share a layout family; no third consecutive image+text split.
- Hero discipline: headline ≤2 lines, subtext ≤20 words, CTA visible without scroll, top padding ≤96px, max 4 text elements in the stack.

## 6. Motion & Interaction

- Spring physics default: stiffness 100, damping 20. Enter 250ms, exit 150ms — exit always faster than enter.
- Staggered cascade reveals on lists and grids, 60ms steps. Transform + opacity only; never top/left/width/height.
- Scroll listening via IntersectionObserver or library hooks only; never raw scroll listeners.
- Every animation states its motivation in one sentence (hierarchy, storytelling, feedback, state transition) or it gets cut. No perpetual loops on informational sections.
- `prefers-reduced-motion`: all reveals collapse to instant opacity fades ≤150ms. Mandatory, not optional.

## 7. Anti-Patterns (Banned)

**Generic AI tells:** emoji as icons, Inter, AI-purple/neon gradients, gradient headline text, pure black or pure white surfaces, neon outer glows, custom cursors, overlapping elements, 3-equal-card feature rows, "Scroll to explore" cues or bouncing chevrons, filler verbs (Elevate, Seamless, Unleash, Next-Gen), John Doe / Acme placeholders, fake round numbers, fake-precise spec numbers, decorative status dots, section-number eyebrows (001 ·, 06 ·), version labels in hero, pills overlaid on photos, photo-credit captions as decoration, locale/time/weather strips, two CTAs with the same intent.

**Dash rule:** zero em-dashes (— or –) in any visible string. Hyphen only.

**Faisha-specific:** no ® symbol (ITS FAISHA™ only); no clinical or diagnostic assessment language; no invented match percentages; no enabled purchase CTA while products are DRAFT_NON_PURCHASABLE; no invented product names, Crystal names, claims, prices, or SKUs; no raw assessment scores exposed; no silent language mixing between ID and EN.
