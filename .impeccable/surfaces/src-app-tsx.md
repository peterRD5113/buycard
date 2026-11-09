---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface Brief: XX科技 MyCard 點數商城 (Desktop + Mobile App Shell)

## Scope & Mode
- **Primary Target:** `src/App.tsx` (and all routes `/` to `/admin`)
- **Mode:** Operate (e-commerce catalog browsing, denomination selection, cart management, ATM virtual account checkout, and order code fulfillment)
- **Audience & Job:** Taiwan gamers buying MyCard denominations (90–3290 pts) on desktop or phone, needing instant price/discount clarity, frictionless ATM account matching, and one-tap serial/PIN copying.

## Direction contract

THESIS: A high-contrast monochrome retail storefront and mobile app shell modeled on Styla Fashion E-Commerce UI Kit—treating digital game point cards with the quiet, borderless precision of a contemporary fashion boutique rather than a neon gaming template or an AI SaaS landing page.

OWN-WORLD: Pure white (`#FFFFFF`) canvas paired with cool soft-gray (`#F5F5F7`) borderless product wells, deep carbon-black (`#141414`) pill controls and primary CTAs, neutral slate grays (`#737373`, `#E8E8EC`), functional coral-red (`#E11D48`) reserved strictly for discount savings (`-NT$7`), and emerald (`#15803D`) for stock/completion status. Typography pairs `Archivo` (geometric sans for numerals, prices, and UI controls), `Noto Sans TC` (traditional Chinese), and `JetBrains Mono` (tabular serial codes and 16-digit virtual accounts). Raised by Japanese high-density web discipline: compact tabular specifications, zero fluff cards, and hairlines where data density requires order.

STORY: The buyer sees every MyCard denomination, its exact 95% price, and the exact dollar savings immediately upon arrival, filters or switches denominations in one tap, checks out via ATM virtual account without leaving the flow, and copies their issued serial code from a tactile black-card pass.

FIRST VIEWPORT: On mobile (`<768px`), a Styla native app shell: top header with menu trigger and black store-credit wallet pill (`儲值金 NT$ 0`), rounded gray search bar (`搜尋點數面額...`), horizontal category pills (`全部面額` active in `#141414`), a rounded dark editorial promo banner (`MyCard 全系列 95 折`), circular quick-denomination avatars (`90點`, `150點`, `500點`, `1000點`), and a 2-column borderless product grid above a sticky 4-tab bottom navigation bar. On desktop (`>=768px`), a clean single-row editorial header with integrated search, wallet pill, and cart counter, leading directly into an asymmetric Styla-style editorial split banner and an immediate 4-column borderless denomination matrix with instant filtering and sorting.

FORM: User-pinned Styla Fashion E-Commerce UI Kit system (Position 1 pinned by brief, raised by Japanese high-density catalog discipline; `seed:eef39b6d8c4aef03`).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
