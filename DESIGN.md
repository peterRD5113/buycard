# XX科技 MyCard 點數商城 — Design System (`DESIGN.md`)

## 1. Visual Direction & Brand Ethos
- **Brand**: `XX科技` (`XX科技有限公司` / `XX TECHNOLOGY CO., LTD.`)
- **Reference Aesthetic**: **Styla Fashion E-Commerce Mobile App UI Kit** (Craft Bay) adapted to high-trust Taiwanese MyCard digital point-card retail (`baohepoint.com` functional parity).
- **Core Principle**: **Strict Monochrome Editorial + Borderless Tactile Wells + Zero AI Slop**. Every surface relies on pure white (`#FFFFFF`), soft neutral gray wells (`#F5F5F7`), and carbon-black pill actions (`#141414`), letting the colorful MyCard point-card artwork and tabular pricing numerals stand out with crystal clarity.

## 2. Color Palette & Atmospheric Tokens
| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-bg` | `#ffffff` | Primary page canvas (pure white daylight surface) |
| `--color-well` | `#f5f5f7` | Borderless product image wells, search pills, filter pills, cart item wells |
| `--color-well-strong` | `#ebebef` | Interactive hover/pressed state for soft gray wells |
| `--color-ink` | `#141414` | Primary typography, carbon-black pill buttons, wallet balance pill, promo banner, serial pass card |
| `--color-ink-soft` | `#2b2b2f` | Secondary dark hover surface |
| `--color-muted` | `#6e6e73` | Secondary metadata, strikethrough original prices, descriptions |
| `--color-line` | `#e8e8ed` | Hairline structural dividers (`1px solid`) |
| `--color-sale` | `#d92638` | Discount savings badge (`-NT$7`, `省$50`) |
| `--color-sale-bg` | `#fff0f2` | Soft tint background for savings pill |
| `--color-ok` | `#13794b` | In-stock indicator, 1% store credit rebate notice, completed serial issuance badge |
| `--color-ok-bg` | `#eafaf1` | Soft tint background for positive status |

## 3. Typography & Scannable Hierarchy
- **Display & Numeric Face (`--font-display`)**: `'Archivo'`, paired with `'Noto Sans TC'` for Traditional Chinese headings.
  - All numeric figures, prices, discounts, and percentages use `font-variant-numeric: tabular-nums`.
- **UI Body Face (`--font-sans`)**: `'Noto Sans TC'` (weights 400, 500, 600, 700, 900).
- **Monospace Face (`--font-mono`)**: `'JetBrains Mono'` for 16-digit ATM virtual accounts (`9528...`), order numbers (`XX26...`), bank codes (`822`), and issued MyCard serial numbers & PINs.

## 4. Layout, Spatial Architecture & Mobile UX
- **Desktop (`1240px` max container)**:
  - Sticky top header (`72px` height) with brand identity, 5 navigation links, gray pill search input, carbon-black wallet balance pill (`儲值金 NT$65`), cart counter badge, and quick member/admin actions.
  - 4-column borderless product grid (`gap: 24px`), 3-column Styla Bento specification matrix (alternating `#141414` black and `#F5F5F7` gray cards), and tabular 3-step fulfillment ledger.
- **Mobile (`< 768px`)**:
  - Top bar with hamburger drawer trigger + Styla carbon-black wallet balance pill (`NT$ 65`) + cart badge.
  - Full-width `#F5F5F7` pill search bar + horizontal scrolling filter pills (`全部面額`, `熱銷推薦`, `手遊小額`, `滿千回饋`).
  - Horizontal circular quick-denomination selector row (`90點` through `3290點`).
  - 2-column borderless product grid (`rounded-[20px] bg-well`).
  - **Product Detail Bottom-Sheet Pattern**: Soft gray artwork stage at top + interactive 17-denomination square selector matrix (`選擇點數面額`) + sticky bottom checkout bar (`左價格 + 右黑色膠囊按鈕`).
  - **Sticky 4-Tab Bottom Navigation Bar**: `首頁`, `優惠面額`, `購物車`, `我的序號` with active carbon-black pill indicator.

## 5. Anti-AI & Craft Floor Guardrails
- **No Eyebrows / Kickers**: Every section heading (`<h2>`) starts directly with the Chinese title—no small uppercase tracking-wide labels above headings.
- **No Gradient Text or Glowing Blobs**: Zero `background-clip: text`, zero neon blurs, zero decorative floating cards.
- **No Generic 4-Card Icon+Title+Blurb Marketing Grids**: Replaced by Styla's high-contrast Bento specification blocks and a tabular 3-step fulfillment ledger.
- **No Emojis**: Uses crisp `1.85px`-stroke Lucide vector icons exclusively.
