---
name: Cabrera Inmobiliaria — La Escritura
description: The agency's own property listings recorded as notarial ledger entries, sealed in wax when featured.
colors:
  navy-ink: "#1c2b4a"
  navy-ink-soft: "rgba(28, 43, 74, 0.08)"
  wax-seal: "#9c2b26"
  wax-seal-soft: "rgba(156, 43, 38, 0.09)"
  gilt-edge: "#a9822f"
  vellum-surface: "#fbf8ef"
  aged-paper: "#f3ecdc"
  aged-paper-deep: "#e6dcc3"
  ink-muted: "#5c5645"
  rule-line: "rgba(28, 43, 74, 0.18)"
  danger: "#b3402e"
  danger-soft: "rgba(179, 64, 46, 0.09)"
  ledger-cover: "#131f38"
  whatsapp: "#25d366"
  whatsapp-deep: "#0e6b3c"
typography:
  display:
    fontFamily: "Spectral, serif"
    fontSize: "clamp(2.6rem, 5vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.04
  headline:
    fontFamily: "Spectral, serif"
    fontSize: "clamp(1.9rem, 3vw, 3.3rem)"
    fontWeight: 500
    lineHeight: 1.08
  title:
    fontFamily: "Spectral, serif"
    fontSize: "1.4rem"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.02rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fragment Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  signature:
    fontFamily: "Caveat, cursive"
    fontSize: "1.875rem"
    fontWeight: 400
rounded:
  sm: "0.125rem"
  md: "0.25rem"
  lg: "0.375rem"
  xl: "0.5rem"
spacing:
  card-sm: "16px"
  card-md: "24px"
  card-lg: "40px"
components:
  button-primary:
    backgroundColor: "{colors.ledger-cover}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.navy-ink}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-whatsapp-hover:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  button-pill:
    backgroundColor: "{colors.vellum-surface}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.vellum-surface}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  form-field:
    backgroundColor: "{colors.vellum-surface}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: Cabrera Inmobiliaria — La Escritura

## Overview

**Creative North Star: "The Notarial Ledger"**

Every listing is a ledger entry, not a portal card. The site reads as the agency's own bound registry of properties: navy ink on warm aged vellum, a folio number stamped on every entry (`formatFolio`, "N.° 0007"), a wax seal reserved for the one entry the martillero has personally singled out, and a hand-signed attestation from Julián Cabrera. The build carries this through system-wide, not just on the homepage: folio numbers and address formatting are shared helpers (`src/lib/utils.js`) consumed by every card, hero, and detail view, so the ledger conceit is a structural rule, not a one-page flourish.

The palette is warm and paper-toned rather than white-and-gray SaaS neutral; typography pairs a measured serif (Spectral) for anything that speaks with authority (headlines, prices, folio numerals) against a plain, legible sans (Public Sans) for body copy, with a monospace label face (Fragment Mono) standing in for the registrar's stamped annotations (folio codes, section dividers, form labels). Depth is soft and paper-like — no hard offset shadows, no neobrutalist blocking — consistent with a bound document lying under lamplight, not a UI kit.

**Key Characteristics:**
- Ledger-entry structure: every property carries a stamped folio number and address, formatted by one shared rule.
- Crimson wax seal exclusively marks the one "destacada" (featured) listing per view; everywhere else, gold carries the accent role.
- Dashed rule-lines and repeating horizontal hairlines stand in for a bound ledger's page rules.
- Serif display type, mono labels, and one cursive signature line are the only three typographic voices; no fourth face is introduced.

## Colors

Warm, book-toned neutrals (vellum and aged paper) carry the field; navy ink is the one true primary; two reserved accents — crimson and gilt — are each licensed for exactly one job.

### Primary
- **Navy Ink** (`#1c2b4a`): the text color, the `--accent` role, and the footer/header background. Used for body text, headings, links, focus rings, and the accent-soft tint behind icon badges.

### Secondary
- **Gilt Ledger Edge** (`#a9822f`, `gold`): the "gilt edge" accent — the 2px top rule on the header and the admin/CTA banner, and the active state of the primary nav tab underline. Not used as a fill or button color; it marks an edge or a state, never a surface.

### Tertiary
- **Wax Seal Crimson** (`#9c2b26`, `seal`): reserved exclusively for the destacada/featured-listing marker — the circular wax-seal SVG (`WaxSeal.jsx`) and its paired admin badge (`--seal-soft` background, `--seal` text). It appears nowhere else in the built product: no button, no link, no error state, no decorative highlight uses this hue.

### Neutral
- **Vellum Surface** (`#fbf8ef`): card and form-field backgrounds, the elevated "paper on the page" surface.
- **Aged Paper** (`#f3ecdc`): the page background (`body`) and the hero search panel's ledger-rule background.
- **Aged Paper Deep** (`#e6dcc3`): placeholder/fallback image backgrounds, one shade darker than the page.
- **Ink Muted** (`#5c5645`): secondary text — captions, labels, metadata, stat values' supporting copy.
- **Rule Line** (`rgba(28,43,74,0.18)`): all hairline borders — cards, dividers, form fields, dashed section rules.
- **Ledger Cover** (`#131f38`): header/footer chrome and the primary button fill — the "book cover" dark navy, distinct from body-text navy ink.

### Named Rules
**The One Seal Rule.** Wax-seal crimson (`--seal`) is licensed exclusively for the destacada/featured-listing marker and its paired badge. It is never reused for CTAs, links, errors, or generic emphasis — its rarity is what makes a featured listing read as singled-out by the martillero, not just decorated.

**The Distinct-Danger Rule.** `--danger` (`#b3402e`) is a separate token from `--seal` (`#9c2b26`), deliberately a different hue for destructive actions and form errors. Never substitute the seal color for an error state, even though they're visually adjacent — conflating them would make the wax seal read as a warning.

**The Gilt-Edge-Is-A-Line Rule.** `--gold` marks edges and active states (header top-border, active nav tab, CTA banner border) — it is never used as a fill, background, or button color.

## Typography

**Display Font:** Spectral (serif), with system serif fallback
**Body Font:** Public Sans, with system-ui/sans-serif fallback
**Label/Mono Font:** Fragment Mono (monospace)
**Signature Font:** Caveat (cursive) — one dedicated, non-repeating use

**Character:** Spectral carries authority and warmth wherever the ledger "speaks" — headlines, prices, folio numerals; Public Sans stays plain and legible for reading passages; Fragment Mono renders anything that looks stamped or registrar-annotated (labels, folio codes, dividers). Caveat appears once, as Julián Cabrera's own handwritten signature, never as a general display or accent face.

### Hierarchy
- **Display** (500 weight, `clamp(2.6rem, 5vw, 5rem)`, line-height 1.04): the hero H1 only.
- **Headline** (500 weight, `clamp(1.9rem, 3vw, 3.3rem)`, line-height 1.08): section titles via `SectionHeader`.
- **Title** (500 weight, 1.4rem–2rem, tight leading): card/article headings, property price display (with `.tabular` numerals).
- **Body** (400 weight, ~1.02rem, line-height 1.6): paragraph copy; long lines constrained to ~54–62ch.
- **Label** (500 weight, 0.62–0.72rem, letter-spacing 0.08–0.14em, uppercase): folio stamps, form field labels, section dividers ("§ Últimas propiedades"), filter toggles — always Fragment Mono, always uppercase.

### Named Rules
**The Stamped-Numeral Rule.** Folio numbers and prices use `.tabular` (tabular-nums) and Spectral, never the sans body face — numerals that look counted, not typed.
**The One Signature Rule.** Caveat is used exactly once, for Julián Cabrera's handwritten attestation on the About page. It is not a system display face; don't extend it to headings, buttons, or other "handwritten" flourishes.

## Layout

Content sits in a single centered container capped at 1180px (`Container`: `min(1180px, calc(100% - 24px))`, widening the gutter to 32px at `md`). The homepage hero breaks this into a two-column ledger spread at `xl` (`minmax(0,1.05fr) minmax(360px,0.95fr)`), pairing the pitch/search column against a stacked image column — the one disciplined grid-break the FORM contract calls for, reserved for the featured-listing display. Section rhythm uses dashed horizontal rules (`border-dashed`, `--line`) and a mono-labeled divider (e.g. "§ Últimas propiedades") between content blocks rather than heavy vertical whitespace alone. Card grids step from 1 column to 2 (`md`) to 3 (`xl`). The sticky header is a fixed `96px` (`--header-height`).

## Elevation & Depth

Flat-to-soft, paper-like elevation: no hard offset shadows, no neobrutalist blocking. Cards and images lift with diffuse, low-contrast navy-tinted shadows that read as a page resting slightly above the surface below it, not as a UI panel floating in space.

### Shadow Vocabulary
- **`--shadow`** (`0 1px 0 rgba(28,43,74,.05), 0 14px 32px rgba(28,43,74,.1)`): default card elevation.
- **`--shadow-sm`** (`0 1px 0 rgba(28,43,74,.05), 0 6px 16px rgba(28,43,74,.08)`): compact elements — stat tiles, small pills, gallery arrows.
- **`--shadow-cta`** (`0 10px 22px rgba(28,43,74,.22)`): primary/WhatsApp buttons only — the one place elevation reads as an invitation to act.
- **`--shadow-image`** (`0 16px 34px rgba(20,26,20,.22)`): property photography, a heavier and cooler shadow than the paper shadows, letting images "sit" on the page.

### Named Rules
**The Soft-Ledger Rule.** All shadows are diffuse and low-contrast; no hard-edged offset shadow (a neobrutalist device) belongs in this world, since the page itself is meant to read as paper under lamplight, not as a stacked object.

## Shapes

Corners are gently rounded and modest: `--radius-sm` (2px) for tight controls like form fields and thumbnails' border, `--radius-md` (4px) for icon badges and mid-size chips, `--radius-lg` (6px) for cards, buttons, and property images, `--radius-xl` (8px) for the largest surface cards. Nothing is fully square (no neobrutalist hard corners) and nothing is pill-rounded except the WaxSeal circle and small count badges — the ledger's "boxes" stay boxy but softened, like a printed form, not a modern app card.

## Components

### Buttons
- **Shape:** `--radius-lg` (6px), consistent across all variants.
- **Primary:** ledger-cover navy fill (`--cta-dark`), white text, `--shadow-cta`, hovers to navy-ink (`--accent`).
- **WhatsApp:** deep WhatsApp green fill (`--whatsapp-deep`), same shadow and shape as primary, hovers to brand WhatsApp green (`--whatsapp`) — a distinct, branded variant rather than a generic secondary button.
- **Ghost:** transparent with a 30%-white border, used only on dark (navy/cover) backgrounds.
- **Pill:** paper-surface fill with a hairline border; gains an `active` state (navy fill, navy border) for toggled filters/tabs.

### Cards / Containers
- **Corner Style:** `--radius-xl` (8px).
- **Background:** vellum surface (`--surface`).
- **Shadow Strategy:** `--shadow` (see Elevation).
- **Border:** 1px hairline, `--line`.
- **Internal Padding:** sm 16/24px, md 24/32px, lg 24/40px (mobile/desktop pairs).

### Inputs / Fields
- **Style:** vellum-surface background, hairline border (`--line`), `--radius-sm`, label rendered above in mono/uppercase/label-tracking.
- **Focus:** border shifts to navy-ink plus a soft navy-tinted ring (`--accent-soft`), matching the sitewide focus-visible outline.
- **Error:** `--danger` text/border, distinct hue from the wax seal by design (see Named Rules, Colors).

### Navigation
- Header nav links sit on the ledger-cover navy bar; default state is 85%-white text with a transparent underline, hover brightens text and underline to white, active state turns the underline gilt-edge gold. Mobile collapses into a slide-down panel from the same navy bar; no separate mobile-only styling.

### The Wax Seal (signature component)
A circular SVG stamp (44px default) rendering the agency's initial in Spectral against crimson wax, with an inner dashed ring suggesting a pressed seal. It appears only adjacent to a `destacada` (featured) listing — on hero images, property cards, and the admin list's featured badge — never as decoration, a rating device, or a generic "new" flag. Each appearance is paired with the folio-number/address stamp beneath it, reinforcing that the seal marks one verified, singled-out entry, not a promotional tag.

## Do's and Don'ts

### Do:
- **Do** keep `--seal` (crimson) exclusive to the destacada marker and its badge; every other emphasis need routes to `--gold` (edges/active-states) or navy (fills/text).
- **Do** run folio numbers and prices through the shared `formatFolio`/`formatPrice`/`formatAddress` helpers (`src/lib/utils.js`) rather than reformatting inline — the ledger's numbering rule must stay identical across hero, card, and detail views.
- **Do** use Fragment Mono, uppercase, and letter-spacing for anything that functions as a stamped label (folio codes, section dividers, filter toggles, form labels).
- **Do** keep shadows diffuse and paper-soft (see `--shadow*` tokens); reserve `--shadow-cta` for actionable buttons only.

### Don't:
- **Don't** reuse `--seal` for links, CTAs, hover states, or generic highlighting — a second use anywhere breaks the rarity the featured marker depends on.
- **Don't** substitute `--seal` for `--danger` (or vice versa) even though both are crimson-adjacent reds; they must stay two distinct hues so the wax seal never reads as an error or warning.
- **Don't** introduce hard-edged offset shadows or fully square corners; both are foreign to this world's soft-paper depth language.
- **Don't** extend Caveat (the signature cursive) beyond Julián Cabrera's one handwritten attestation on the About page — it is not a system display face.
