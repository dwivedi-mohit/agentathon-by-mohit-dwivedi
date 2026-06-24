# Frontend Specification: Mirror

**Status:** v0.1 — Pre-MVP  
**Author:** Principal Product Designer / Frontend Architect  
**Date:** June 2026  
**Inspired by:** Linear, Stripe, Vercel, Apple, OpenAI  

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing & Grid](#4-spacing--grid)
5. [Design Tokens](#5-design-tokens)
6. [Glassmorphism & Surface System](#6-glassmorphism--surface-system)
7. [Component Library](#7-component-library)
8. [Motion System](#8-motion-system)
9. [Responsive Design](#9-responsive-design)
10. [Frontend Architecture](#10-frontend-architecture)
11. [API Integration Layer](#11-api-integration-layer)
12. [Accessibility Checklist](#12-accessibility-checklist)

---

## 1. Design Philosophy

### Core Principles

**1. The interface is invisible.** Users should feel like they walked into a room where 4 experts are already debating their question. The UI does not call attention to itself.

**2. Depth through layering, not shadows.** Cards sit on subtly different surface levels. The active persona card lifts slightly. The background recedes. No drop shadows — use background color shifts and 0.5px borders instead.

**3. Motion with purpose.** Animations exist only to orient the user: which persona is speaking now, what happened before, what comes next. No decorative animations. Every transition is under 300ms.

**4. Information density is low, intentionally.** Each screen shows exactly one thing: the input, the debate, or the result. Never both. The user is guided through a linear narrative.

**5. Trust over flash.** The product helps people make business decisions. The interface must feel mature, reliable, and expensive. No gradients that scream "AI startup." No glowing buttons. No micro-interactions that feel gamified.

### Visual Language Reference

| Reference | What We Borrow | What We Avoid |
|---|---|---|
| **Linear** | Clean left-aligned layouts, monochrome surfaces, subtle border treatment, consistent spacing rhythm | Their issue-tracker density |
| **Stripe** | Typographic hierarchy, generous whitespace, purposeful color accents, payment-level trust cues | Their documentation pattern density |
| **Vercel** | Dark theme execution, geometric precision, edge-computing aesthetic | Their overly technical dashboard look |
| **OpenAI** | Card-based information architecture, restrained use of brand color, focus on readability | Their overwhelming feature density |
| **Apple** | Typography, spacing rhythm, material quality, attention to empty states | Their hardware-specific design language |

---

## 2. Color System

### Philosophy

The palette is a **dark theme with subtle indigo-violet warmth**. No pure blacks. No neon. No rainbows.

The purple-blue effect is reserved for:
- Active/focus states (never resting states)
- The "speaking" persona card glow (very subtle, 8px spread at 15% opacity)
- Primary buttons
- Ambient gradient in the background (barely perceptible)
- The synthesizer card highlight

### Color Palette

```scss
// ─── Neutral Scale ───────────────────────────────────
// All surfaces use slight warm or cool casts — never pure gray

$neutral-950: #0A0A0F;   // App background — deepest level
$neutral-925: #0E0E15;   // Secondary background
$neutral-900: #111118;   // Surface background
$neutral-850: #16161F;   // Card background
$neutral-800: #1A1A25;   // Elevated card
$neutral-750: #1E1E2A;   // Hover state
$neutral-700: #252535;   // Borders, dividers
$neutral-600: #2E2E42;   // Muted borders
$neutral-500: #4A4A60;   // Disabled text
$neutral-400: #64748B;   // Placeholder text
$neutral-300: #94A3B8;   // Secondary text
$neutral-200: #C8CFD8;   // Primary text (dim)
$neutral-100: #E2E8F0;   // Primary text
$neutral-050: #F1F5F9;   // Headings, high-emphasis

// ─── Accent Scale — Indigo / Violet ───────────────
// The brand lives here. Use sparingly.

$accent-950: #0F0A2E;
$accent-900: #1A0F4A;
$accent-800: #2D1B69;
$accent-700: #4529A3;
$accent-600: #5B3ED6;   // Deep violet (secondary accent)
$accent-500: #7C3AED;   // Violet (brand)
$accent-400: #8B5CF6;   // Light violet
$accent-300: #A78BFA;   // Very light violet

// ─── Blue Scale ─────────────────────────────────────
// Primary interactive color

$blue-950: #0B1628;
$blue-900: #102A4A;
$blue-800: #1E40AF;
$blue-700: #1D4ED8;
$blue-600: #2563EB;     // Primary hover
$blue-500: #3B82F6;     // Primary (royal blue)
$blue-400: #60A5FA;     // Light blue
$blue-300: #93C5FD;     // Very light blue
$blue-200: #BFDBFE;     // Highlights
$blue-100: #E0F2FE;     // Background tint

// ─── Electric Blue (Highlight) ──────────────────────
// Used for ambient glow, focus rings, active states. Very sparing.

$electric-600: #6366F1;  // Indigo-500
$electric-500: #818CF8;  // Soft electric blue (primary glow)
$electric-400: #A5B4FC;  // Light electric
$electric-300: #C7D2FE;  // Very light

// ─── Semantic ───────────────────────────────────────

$green:       #10B981;   // Success, confident
$green-bg:    #064E3B;   // Success background (10% opacity equivalent)
$amber:       #F59E0B;   // Warning, moderate confidence
$amber-bg:    #451A03;   // Warning background
$red:         #EF4444;   // Error, high risk
$red-bg:      #450A0A;   // Error background
```

### Color Usage Rules

| Element | Token | Rationale |
|---|---|---|
| App background | `$neutral-950` | Deepest layer. Nearly black with a hint of blue. 0.5-1% lightness shift from true black prevents eye strain. |
| Card surface | `$neutral-850` | One step above background. Creates subtle elevation without shadow. |
| Hovered card | `$neutral-750` | Very subtle lift — 4% lightness increase only. |
| Active / selected | `$accent-800` background + `$accent-400` border | Not blue — use violet to differentiate interactive from neutral. |
| Primary button | `$blue-500` | Royal blue. Trustworthy, action-oriented, not aggressive. |
| Primary button hover | `$blue-600` | One step darker. Never lighten on hover (looks cheap). |
| Danger button | `$red` | Only for destructive actions. Not used in MVP. |
| Text (high) | `$neutral-050` | Nearly white. Headings, important labels. |
| Text (medium) | `$neutral-200` | Body text. High contrast ratio (>10:1). |
| Text (low) | `$neutral-400` | Captions, metadata, timestamps. |
| Text (disabled) | `$neutral-500` | 3:1 contrast minimum. |
| Link | `$blue-400` | Blue against dark background. Underline on hover only. |
| Focus ring | `$electric-500` at 40% opacity | 2px outline + 4px offset. Never use `outline: none` without replacement. |
| Success badge | `$green` text on `$green-bg` | Semantic, not decorative. |
| Error badge | `$red` text on `$red-bg` | Semantic, not decorative. |

### Ambient Gradient (Background)

The app background has a **very subtle, barely perceptible** radial gradient:

```css
background: radial-gradient(
  ellipse 80% 60% at 50% -20%,
  rgba(99, 102, 241, 0.06) 0%,    /* electric blue — very faint */
  rgba(124, 58, 237, 0.03) 40%,    /* violet — fainter */
  transparent 70%
), $neutral-950;
```

This creates a **soft top-center ambient glow** that suggests the brand color without announcing it. It should be almost invisible unless compared side-by-side with a flat color.

---

## 3. Typography System

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

**Inter** is chosen for its:
- Excellent legibility at small sizes (10-12px for captions)
- Wide range of weights (300-900)
- Tight vertical metrics (saves vertical space without crowding)
- Native variable font support
- Industry-standard for premium SaaS products

**JetBrains Mono** is chosen for code/technical content for its:
- Distinct ligatures (→, !==, =>)
- High x-height for readability at small sizes
- Clean appearance in technical diagrams

### Type Scale

```css
--text-xs:   0.75rem;   /* 12px — Captions, timestamps, metadata */
--text-sm:   0.875rem;  /* 14px — Body text, descriptions */
--text-base: 1rem;      /* 16px — Default body */
--text-lg:   1.125rem;  /* 18px — Large body, intro text */
--text-xl:   1.25rem;   /* 20px — Section headings */
--text-2xl:  1.5rem;    /* 24px — Card headings */
--text-3xl:  1.875rem;  /* 30px — Page headings */
--text-4xl:  2.25rem;   /* 36px — Hero / landing */
```

### Line Heights

```css
--leading-tight:    1.15;   /* Headings */
--leading-snug:     1.35;   /* Card headings */
--leading-normal:   1.55;   /* Body text */
--leading-relaxed:  1.75;   /* Long-form content */
```

### Font Weights

```css
--font-normal:   400;   /* Body text */
--font-medium:   500;   /* Emphasized body, nav items */
--font-semibold: 600;   /* Subheadings, button text */
--font-bold:     700;   /* Headings */
```

### Type Styles

| Style | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| **Hero** | `--text-4xl` | `--font-bold` | `--leading-tight` | `-0.02em` | Landing page headline only |
| **H1** | `--text-3xl` | `--font-bold` | `--leading-tight` | `-0.02em` | Page title |
| **H2** | `--text-2xl` | `--font-semibold` | `--leading-snug` | `-0.01em` | Section heading |
| **H3** | `--text-xl` | `--font-semibold` | `--leading-snug` | `normal` | Card heading |
| **Body** | `--text-sm` | `--font-normal` | `--leading-normal` | `normal` | Default text |
| **Body Large** | `--text-base` | `--font-normal` | `--leading-normal` | `normal` | Intro / lead text |
| **Caption** | `--text-xs` | `--font-normal` | `--leading-normal` | `0.01em` | Metadata, timestamps |
| **Label** | `--text-xs` | `--font-medium` | `--leading-normal` | `0.05em` | Form labels, badges |
| **Button** | `--text-sm` | `--font-semibold` | `--leading-snug` | `0.01em` | Button text |
| **Code** | `--text-xs` | `--font-normal` | `--leading-normal` | `normal` | Code snippets |
| **Persona Name** | `--text-base` | `--font-semibold` | `--leading-tight` | `normal` | Persona card heading |
| **Persona Role** | `--text-xs` | `--font-medium` | `--leading-snug` | `0.02em` | Persona role subtitle |

---

## 4. Spacing & Grid

### Spacing Scale

```css
--space-0:   0px;
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
```

### Grid

```css
--grid-columns: 12;
--grid-gap: var(--space-6);     /* 24px */
--container-max: 1200px;
--content-max: 720px;            /* For focused reading */
```

### Layout Rules

1. **Every component uses the spacing scale.** No arbitrary values. This creates visual rhythm.
2. **Card padding is always `--space-6`.** Consistent interior spacing across all card types.
3. **Between sections: `--space-10` or `--space-12`.** Generous breathing room.
4. **Between related elements within a card: `--space-4`.** Tight enough to feel connected, loose enough to be scannable.
5. **The debate view is centered in a 720px column.** Focus is on the conversation, not the chrome.

---

## 5. Design Tokens

```css
:root {
  /* ─── Surfaces ─── */
  --surface-app:          #0A0A0F;
  --surface-card:         #16161F;
  --surface-card-hover:   #1E1E2A;
  --surface-card-active:  #2D1B69;    /* violet tinted */
  --surface-elevated:     #1A1A25;
  --surface-glass:        rgba(22, 22, 31, 0.80);
  
  /* ─── Borders ─── */
  --border-default:       #252535;
  --border-hover:         #2E2E42;
  --border-active:        #7C3AED;
  --border-focus:         #818CF8;
  
  /* ─── Radius ─── */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;
  
  /* ─── Shadows — used minimally ─── */
  --shadow-sm:    0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md:    0 4px 6px rgba(0, 0, 0, 0.25);
  --shadow-lg:    0 10px 15px rgba(0, 0, 0, 0.2);
  --shadow-glow:  0 0 20px rgba(129, 140, 248, 0.10);  /* extremely subtle */
  
  /* ─── Z-Index ─── */
  --z-base:       0;
  --z-card:       10;
  --z-speaking:   20;       /* Active persona card */
  --z-overlay:    30;
  --z-modal:      40;
  --z-toast:      50;
  
  /* ─── Transitions ─── */
  --transition-fast:   150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow:   300ms ease;
}
```

---

## 6. Glassmorphism & Surface System

### Glass Card

Used for the **synthesizer result card** and the **persona intro overlay**.

```css
.glass-card {
  background: rgba(22, 22, 31, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(37, 37, 53, 0.6);
  border-radius: var(--radius-lg);
}
```

**Rules:**
- Blur is 12px max. Higher values look unnatural.
- Border opacity is 0.6 — visible but soft.
- Background opacity is 0.75 — enough to obscure content beneath while showing depth.
- Use only for **elevated content** (synthesizer result, modal overlays).
- Do NOT use for standard cards (they use solid `--surface-card`).

### Surface Hierarchy

```
Level 0: App background  ─── #0A0A0F     (deepest)
Level 1: Card surface    ─── #16161F     (standard card)
Level 2: Elevated card   ─── #1A1A25     (hover, active card)
Level 3: Glass card      ─── rgba(22,22,31,0.75) + blur  (synthesizer)
Level 4: Modal / overlay ─── rgba(0,0,0,0.6) backdrop   (not used in MVP)
```

Each level is visually distinct but not dramatically different. The difference between Level 0 and Level 1 is 12 points of lightness — perceptible but subtle.

---

## 7. Component Library

### 7.1 Button

**Purpose:** Triggers primary or secondary actions.

**Appearance (Primary):**
```css
background: var(--blue-500);        /* #3B82F6 */
color: white;
border: none;
border-radius: var(--radius-md);    /* 8px */
padding: 10px 20px;                 /* symmetric, not tall */
font: var(--text-sm) var(--font-semibold);
letter-spacing: 0.01em;
```

**Appearance (Secondary):**
```css
background: transparent;
color: var(--neutral-200);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);
padding: 10px 20px;
```

**States:**

| State | Primary | Secondary |
|---|---|---|
| Default | `#3B82F6` bg, white text | Transparent bg, `#C8CFD8` text, `#252535` border |
| Hover | `#2563EB` bg (darker) | `rgba(255,255,255,0.04)` bg, `#E2E8F0` text, `#2E2E42` border |
| Active/Pressed | `#1D4ED8` bg | `rgba(255,255,255,0.06)` bg |
| Focus | Ring: 2px `#818CF8` at 40% opacity, 4px offset | Same ring |
| Disabled | `#2E2E42` bg, `#4A4A60` text, no pointer | `transparent` bg, `#4A4A60` text, `#252535` border |
| Loading | Show spinner icon, disable pointer | Same |

**Variants:**

```tsx
<Button variant="primary" size="md" disabled loading>
<Button variant="secondary" size="sm">
<Button variant="ghost" size="md">      // No border, minimal bg on hover
<Button variant="danger" size="md">     // Not used in MVP
```

**Size:**
- `sm`: 8px 16px, `--text-xs`
- `md`: 10px 20px, `--text-sm`
- `lg`: 12px 28px, `--text-base`

**Accessibility:**
- `role="button"` if not a `<button>` element
- `aria-disabled` when loading/disabled (disabled attribute removes focus)
- Loading state has `aria-label="Loading"` on spinner
- Minimum touch target: 44px

**Motion:**
- Hover: 150ms background-color transition
- Active: 50ms scale(0.98) — extremely subtle press effect
- No bounce, no spring

---

### 7.2 QuestionInput

**Purpose:** Primary input for the user's business question.

**Appearance:**
```css
background: var(--neutral-850);        /* #16161F */
border: 1px solid var(--border-default); /* #252535 */
border-radius: var(--radius-lg);        /* 12px */
padding: var(--space-5);                /* 20px */
color: var(--neutral-100);
font: var(--text-base);
placeholder: var(--neutral-400);
```

**States:**

| State | Treatment |
|---|---|
| Default | `#16161F` bg, `#252535` border |
| Focus | Border: `#818CF8` at 50% opacity. Subtle inner glow: `box-shadow: 0 0 0 1px rgba(129,140,248,0.2)` |
| Hover | Border: `#2E2E42` |
| Filled | Normal. Character count appears below right. |
| Error | Border: `#EF4444`. Error message below. |
| Disabled | `#111118` bg, `#4A4A60` text |

**Layout:**
```
┌──────────────────────────────────────────────┐
│                                              │
│  Should I open a second store in Ghaziabad?  │
│                                              │
│  Use the Enter key to submit     │    342/500 │
└──────────────────────────────────────────────┘
```

- Multi-line textarea. 3 rows visible, grows to 6 rows max.
- Character counter bottom-right, `--text-xs`, `--neutral-400`
- Hint text bottom-left, `--text-xs`, `--neutral-500`
- Submit on Enter (not Shift+Enter). Shift+Enter inserts newline.

**Placeholder text (rotating):**
> *"Should I hire a second developer or outsource to an agency?"*
> *"Is it the right time to raise a seed round?"*
> *"Should I open a second store in a different city?"*
> *"Should I pivot from B2C to B2B?"*

Rotates every 4 seconds on idle, fade transition.

**Accessibility:**
- `<textarea>` with proper `<label>` (visually hidden)
- `aria-describedby` for error messages
- Enter key behavior documented for screen readers via `aria-label`
- Character count announced when approaching limit (>450 chars)

---

### 7.3 PersonaCard

**Purpose:** Displays a single persona's avatar, name, role, and streaming statement during debate.

**Appearance:**
```css
background: var(--surface-card);        /* #16161F */
border: 1px solid var(--border-default); 
border-radius: var(--radius-lg);
padding: var(--space-5);                /* 20px */
```

**Layout:**
```
┌──────────────────────────────────────────────┐
│  ┌──────┐  ┌──────────────────────────────┐  │
│  │Avatar│  │ Uday                          │  │
│  │  ██  │  │ The Optimist  ·  Round 1     │  │
│  └──────┘  └──────────────────────────────┘  │
│                                               │
│  I believe this is a tremendous opportunity.  │
│  The market in Ghaziabad is undersaturated    │
│  and early movers will capture...             │
│                                               │
│  ──── ■■□□□□□□□□  streaming indicator ────   │
└──────────────────────────────────────────────┘
```

**States:**

| State | Treatment |
|---|---|
| Waiting (not their turn) | Full opacity, `#252535` border. No avatar animation. |
| Speaking (active) | Border: `electric` color matching persona. Avatar has subtle pulse animation. `z-index: 20` (lifted above peers). Scale: 1.02. |
| Done speaking | Returns to default state. Checkmark overlay on avatar (optional). |
| Error | Border: `#EF4444`. "This persona could not respond." |
| Synthesizing | Dimmed slightly (0.6 opacity). "Synthesizing..." indicator. |

**Persona Colors:**
| Persona | Avatar Color | Active Border | Speaking Glow |
|---|---|---|---|
| Uday (Optimist) | `#10B981` (green) | `rgba(16,185,129,0.4)` | `#10B981` |
| Kiran (Skeptic) | `#EF4444` (red) | `rgba(239,68,68,0.4)` | `#EF4444` |
| Mohan (Operator) | `#3B82F6` (blue) | `rgba(59,130,246,0.4)` | `#3B82F6` |
| Priya (Customer) | `#F59E0B` (amber) | `rgba(245,158,11,0.4)` | `#F59E0B` |

**Avatar:**
- SVG geometric shapes (circle, square, triangle, diamond) in the persona's color
- No photos, no illustrations — abstract geometric keeps it premium and avoids uncanny valley
- Each persona has a unique shape
- 40x40px in card, 64x64px in intro screen

**Text Streaming:**
- Text appears character-by-character at ~30 chars/sec (fast enough to feel alive, slow enough to read)
- Use `requestAnimationFrame` to schedule character reveals
- If text is very long (>300 chars), accelerate to 50 chars/sec after first 100 chars
- A blinking cursor `▍` at the end of streaming text

**Motion:**
- Cards animate in from bottom with stagger: 80ms delay between each card
- Speaking card: border color transition 200ms, subtle scale 200ms
- Text reveal: CSS `steps()` animation or JS character reveal

**Accessibility:**
- `aria-live="polite"` on the streaming text region
- Screen reader announcement: "{Persona name} is speaking"
- All persona names have `aria-label`
- Avatar is decorative (`alt=""` or `aria-hidden="true"`)

---

### 7.4 PersonaGrid

**Purpose:** Arranges 4 PersonaCards in a responsive grid.

**Appearance:**
```css
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: var(--space-4);    /* 16px */
```

**Layout:**
```
┌───────────────┐  ┌───────────────┐
│   Uday        │  │   Kiran       │
│   The Optimist│  │   The Skeptic │
│   ████████    │  │               │
└───────────────┘  └───────────────┘
┌───────────────┐  ┌───────────────┐
│   Mohan       │  │   Priya       │
│   The Operator│  │   The Customer│
│               │  │               │
└───────────────┘  └───────────────┘
```

**States:**
- **All waiting:** All cards at default state
- **One speaking:** One card elevated (`z-speaking`), others dimmed (0.5 opacity)
- **All done:** All cards return to full opacity, subtle "complete" state

**Responsive:**
- Desktop: 2×2 grid
- Tablet: 2×2 grid (same)
- Mobile (<640px): 1 column, stacked vertically

---

### 7.5 DebateStream

**Purpose:** Orchestrator component that manages the SSE connection, renders PersonaGrid, and handles state transitions.

**States (the entire view has 5 distinct phases):**

| Phase | Description | UI |
|---|---|---|
| **Idle** | No debate active | Show QuestionInput |
| **Connecting** | SSE connection opening | Pulse animation on question, "Starting your debate..." |
| **Debating** | Rounds 1-3 in progress | PersonaGrid visible. Rounds indicator at top. |
| **Synthesizing** | Personas done, generating brief | PersonaGrid dims. "Synthesizing" overlay. |
| **Complete** | Synthesis done | SynthesizerCard replaces PersonaGrid. "Start new debate" button. |
| **Error** | Fatal error occurred | ErrorState component. Retry button. |

**Round Indicator:**
```
● Round 1  ●  ○ Round 2  ○  ○ Round 3
```

- "Active" round: filled circle, accent color
- "Completed" round: filled circle, green
- "Pending" round: empty circle, `#4A4A60`
- Transitions between rounds: fade out current round label, fade in next

---

### 7.6 SynthesizerCard

**Purpose:** Displays the final structured brief after debate completes.

**Appearance (Glass Card):**
```css
background: rgba(22, 22, 31, 0.75);
backdrop-filter: blur(12px);
border: 1px solid rgba(129, 140, 248, 0.2);  /* subtle electric border */
```

**Layout:**
```
┌────────────────────────────────────────────────┐
│  Decision Brief                                 │
│  Based on the debate, here are your options     │
│                                                  │
│  ┌── Option A ──────────────────────────────┐   │
│  │  Open within 2 months                     │   │
│  │  High risk · High reward                  │   │
│  │                                           │   │
│  │  Upside: First-mover advantage...         │   │
│  │  Downside: Capital-intensive...           │   │
│  │                                           │   │
│  │  Actions:                                 │   │
│  │  1. Visit 3 potential locations           │   │
│  │  2. Draft lease agreement                 │   │
│  │  3. Hire 2 staff                          │   │
│  │                                           │   │
│  │  Supported by: Uday, Mohan                │   │
│  └──────────────────────────────────────────────┘
│                                                  │
│  ┌── Option B ──────────────────────────────┐   │
│  │  Wait 6 months and reassess               │   │
│  │  Low risk · Medium reward                 │   │
│  │  Supported by: Kiran                      │   │
│  └──────────────────────────────────────────────┘
│                                                  │
│  ┌── Option C ──────────────────────────────┐   │
│  │  Test with a pop-up for 2 weeks first     │   │
│  │  Medium risk · Medium reward              │   │
│  │  Supported by: Priya, Mohan               │   │
│  └──────────────────────────────────────────────┘
│                                                  │
│  [Start New Debate]    [Copy Brief]              │
└──────────────────────────────────────────────────┘
```

**Option Card:**
- Each option is a sub-card within the SynthesizerCard
- Risk level badge (top-right of each option card)
  - High risk: `$red` badge
  - Medium risk: `$amber` badge
  - Low risk: `$green` badge
- Action steps: numbered list, `--text-sm`
- Supported by: small persona avatar chips at bottom

**States:**
- **Streaming:** Brief appears line by line. First the intro, then Option A streams in, then B, then C.
- **Complete:** Full brief visible. "Start New Debate" and "Copy Brief" buttons active.
- **Empty (no options generated):** Error state. "We could not generate a clear brief. Please try again."

---

### 7.7 LoadingState

**Purpose:** Shown while the debate is being set up.

```css
background: var(--surface-card);
border: 1px solid var(--border-default);
border-radius: var(--radius-lg);
```

**Content:**
- Centered column
- Subtle pulse animation (not a spinner — too generic)
- Three vertical dots that ripple in sequence
- Text: "Starting your debate..."
- Text updates as debate progresses: "Uday is speaking..." → "Kiran is thinking..." (matches persona names)

**Motion:**
- Dots ripple: 1.2s cycle, 200ms stagger
- Text fades between updates (150ms crossfade)

---

### 7.8 ErrorState

**Purpose:** Shows when something goes wrong.

**Appearance:**
```css
background: var(--surface-card);
border: 1px solid var(--red);
border-radius: var(--radius-lg);
padding: var(--space-8);
text-align: center;
```

**Content:**
- Error icon (subtle SVG, not an emoji)
- Error title: "Something went wrong"
- Error description (context-aware, plain English)
- "Try Again" button (primary) or "Start New Debate" (secondary)

**Error Messages (by scenario):**
| Scenario | Title | Description |
|---|---|---|
| LLM timeout | "Taking too long" | "The debate is running slower than expected. Please try again." |
| Network error | "Connection lost" | "Your internet connection dropped. We tried reconnecting." |
| Invalid input | "Could not process" | "We could not understand your question. Please rephrase and try again." |
| Rate limited | "Slow down" | "You have reached the debate limit. Please wait a moment." |
| Internal error | "Something went wrong" | "An unexpected error occurred. The team has been notified." |

---

### 7.9 PersonaIntro

**Purpose:** Shown briefly before debate starts — introduces the 4 personas.

**Appearance:**
```
┌────────────────────────────────────────────────────┐
│  Your debate team                                   │
│                                                     │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐              │
│  │ ██  │  │ ██  │  │ ██  │  │ ██  │              │
│  │Uday │  │Kiran│  │Mohan│  │Priya│              │
│  │Optim│  │Skep │  │Oper │  │Cust │              │
│  └─────┘  └─────┘  └─────┘  └─────┘              │
│                                                     │
│  4 experts will debate your question from           │
│  different perspectives.                            │
│                                                     │
│  [Start Debate]                                     │
└────────────────────────────────────────────────────┘
```

Auto-advances to debate after 3 seconds OR on button click.

---

### 7.10 AppShell

**Purpose:** Root layout wrapper.

```css
display: flex;
flex-direction: column;
min-height: 100vh;
background: var(--surface-app);
```

**Structure:**
```
┌──────────────────────────────────────────────────┐
│  Header (minimal)                                 │
│  Logo "Mirror" · [New Debate]                     │
├──────────────────────────────────────────────────┤
│                                                    │
│  Main Content Area (centered, 720px max)          │
│  ┌────────────────────────────────────────────┐   │
│  │                                            │   │
│  │  (QuestionInput or PersonaGrid or           │   │
│  │   SynthesizerCard)                         │   │
│  │                                            │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
├──────────────────────────────────────────────────┤
│  Footer (minimal)                                  │
│  © 2026 Mirror · Disclaimer                       │
└──────────────────────────────────────────────────┘
```

**Header:**
- Left: "Mirror" wordmark — simple, `--text-xl`, `--font-semibold`, `--neutral-050`
- Right: "New Debate" button (ghost variant)
- No hamburger menu. No navigation. No user menu. The app is singular in purpose.

**Footer:**
- Centered, `--text-xs`, `--neutral-500`
- Text: "AI-generated perspectives. Verify independently before acting."

---

## 8. Motion System

### Principles

1. **Every animation has a purpose** — orienting, confirming, or transitioning. Never decorative.
2. **Duration is 200ms for most interactions.** 300ms for page transitions. 150ms for micro-interactions.
3. **Easing is standard.** Use `cubic-bezier(0.16, 1, 0.3, 1)` — a Vercel-style ease-out. No bounces, no springs.
4. **Stagger delays are 80ms.** Creates rhythm without feeling slow.
5. **Opacity + transform only.** Never animate `width`, `height`, `top`, `left` (triggers layout recalc).

### Motion Tokens

```css
--motion-fast:    150ms cubic-bezier(0.16, 1, 0.3, 1);
--motion-normal:  200ms cubic-bezier(0.16, 1, 0.3, 1);
--motion-slow:    300ms cubic-bezier(0.16, 1, 0.3, 1);
--motion-enter:   400ms cubic-bezier(0.16, 1, 0.3, 1);
--stagger-delay: 80ms;
```

### Component Animations

| Component | Trigger | Animation | Duration |
|---|---|---|---|
| **QuestionInput → PersonaIntro** | Submit | QuestionInput fades + scales down to 0.95. PersonaIntro fades in from below. 80ms stagger per persona card. | 400ms total |
| **PersonaIntro → Debate** | Auto (3s) or button | Intro cards slide up and out. PersonaGrid cards slide in from bottom. 80ms stagger. | 400ms |
| **PersonaCard becoming active** | New turn | Border color transitions. Card scales to 1.02. Other cards dim to 0.5 opacity. | 200ms |
| **PersonaCard text streaming** | Chunk received | Characters reveal at 30ch/s. No animation on the container. | Varies |
| **Round transition** | Round complete | Round indicator dot fills. Brief "Round N complete" toast. | 300ms |
| **Debate → Synthesis** | Last persona done | PersonaGrid fades to 0.6 opacity. Glass card fades in from top. | 400ms |
| **Synthesizer option streaming** | Synthesis starts | Options appear sequentially. 200ms delay between each option. | 600ms total |
| **Button hover** | :hover | Background color transition. | 150ms |
| **Button active** | :active | Scale to 0.98. | 50ms |
| **Error state** | Error fires | Card border shifts to red (200ms). Error icon fades in. | 300ms |

### Page Transitions (Phase Changes)

Each phase change (Idle → Debating → Complete) uses a **shared axis motion**:
- Content exits: `opacity: 1 → 0`, `transform: translateY(0) → -8px`
- Content enters: `opacity: 0 → 1`, `transform: translateY(8px) → 0`
- Duration: 300ms with 50ms overlap (exit starts, then enter starts at 200ms)

This creates a continuous vertical flow — the user feels like they are moving "down" through the experience.

### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Responsive Design

### Breakpoints

| Name | Min Width | Target |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop (primary target) |
| `xl` | 1280px | Large desktop |

### Layout Changes

| Element | Desktop (≥1024px) | Tablet (768-1023px) | Phone (<640px) |
|---|---|---|---|
| **AppShell max-width** | 720px (centered) | 90vw (centered) | 92vw (centered) |
| **PersonaGrid** | 2×2 grid | 2×2 grid | 1 column stack |
| **PersonaCard padding** | 20px | 16px | 12px |
| **PersonaCard streaming text** | Body (`--text-sm`) | Body | `--text-xs` |
| **QuestionInput** | 3 rows default | 3 rows | 4 rows (smaller keyboard) |
| **SynthesizerCard** | Full glass card | Full glass card | Full width, reduced padding |
| **Option card layout** | Side-by-side notes | Stacked | Stacked |
| **Header wordmark** | Show | Show | "M" icon only |
| **Touch targets** | Mouse-optimized | Mouse-optimized | 44px minimum |

### Mobile Considerations

- Bottom sheet keyboard handling: `visualViewport` API to detect keyboard opening
- On mobile, debate streaming happens even if phone is locked (SSE continues)
- Copy button uses `navigator.clipboard` (with fallback)
- All interactions work with touch: no hover-dependent states

---

## 10. Frontend Architecture

### Stack

```
React 18.x + TypeScript 5.x
Vite 5.x (build tool)
Tailwind CSS 3.x (styling)
Framer Motion 11.x (animations)
No state management library (React state + hooks are sufficient)
No routing library (single-page app)
```

### Component Tree

```
<App>
  <AppShell>
    <Header>
      <Wordmark />
      <Button variant="ghost">"New Debate"</Button>
    </Header>
    
    <Main>
      {phase === 'idle' && <QuestionInput onSubmit={startDebate} />}
      
      {phase === 'connecting' && <LoadingState />}
      
      {(phase === 'debating' || phase === 'synthesizing') && (
        <>
          <RoundIndicator currentRound={round} totalRounds={3} />
          <PersonaGrid>
            {personas.map(p => (
              <PersonaCard 
                key={p.id}
                persona={p}
                isSpeaking={p.id === activePersonaId}
                stream={stream}
              />
            ))}
          </PersonaGrid>
        </>
      )}
      
      {phase === 'complete' && (
        <SynthesizerCard brief={brief} />
      )}
      
      {phase === 'error' && (
        <ErrorState error={error} onRetry={reset} />
      )}
    </Main>
    
    <Footer />
  </AppShell>
</App>
```

### State Management

```typescript
// hooks/useDebate.ts — single source of truth for debate state

type Phase = 'idle' | 'connecting' | 'debating' | 'synthesizing' | 'complete' | 'error';

interface DebateState {
  phase: Phase;
  sessionId: string | null;
  question: string;
  personas: Persona[];
  currentRound: number;
  activePersonaId: string | null;
  statements: Map<string, string>;  // persona_id → full text
  brief: Brief | null;
  error: AppError | null;
}
```

No Redux, no Zustand, no Jotai. The app has exactly one piece of global state (the debate), managed by a single custom hook. Everything else is derived.

### File Organization

```
src/
├── components/
│   ├── ui/                  # Primitive components (Button, Card, Badge)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── debate/              # Debate-specific components
│   │   ├── QuestionInput.tsx
│   │   ├── PersonaCard.tsx
│   │   ├── PersonaGrid.tsx
│   │   ├── PersonaIntro.tsx
│   │   ├── RoundIndicator.tsx
│   │   ├── SynthesizerCard.tsx
│   │   ├── DebateStream.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   └── layout/
│       ├── AppShell.tsx
│       ├── Header.tsx
│       └── Footer.tsx
├── hooks/
│   ├── useDebate.ts         # Core debate state + SSE logic
│   ├── useSSE.ts            # Low-level SSE connection
│   └── useTypewriter.ts     # Character-by-character reveal
├── types/
│   └── index.ts             # All TypeScript interfaces
├── lib/
│   ├── api.ts               # fetch wrappers
│   ├── constants.ts         # Persona definitions, colors
│   └── utils.ts             # format, classNames, etc.
├── App.tsx
├── main.tsx
└── index.css                # Tailwind imports + global styles
```

---

## 11. API Integration Layer

### Frontend API Client (`lib/api.ts`)

```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function createDebate(question: string): Promise<DebateSession> {
  const response = await fetch(`${API_BASE}/api/debate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, num_rounds: 3 }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.message, error.code, response.status);
  }
  return response.json();
}
```

### SSE Connection (`hooks/useSSE.ts`)

```typescript
export function useSSE(url: string) {
  // Returns: { events, connected, error }
  // Manages EventSource lifecycle, auto-reconnect (up to 5 attempts)
  // Parses SSE data as JSON and emits typed events
  // Handles cleanup on unmount
}
```

### SSE Event Handler (`hooks/useDebate.ts`)

```typescript
// Maps SSE events to state updates:

event('persona:start')     → set activePersonaId
event('persona:chunk')     → append to persona's statement text (useTypewriter)
event('persona:done')      → finalize persona text, clear activePersonaId
event('round:complete')    → increment currentRound
event('synthesis:start')   → set phase to 'synthesizing'
event('synthesis:chunk')   → append to brief text
event('synthesis:done')    → set brief, set phase to 'complete'
event('error')             → set phase to 'error', set error
event('debate:complete')   → final cleanup
```

### Complete Flow

```
User submits question
  → POST /api/debate { question }
  → Response: { session_id, stream_url, personas }
  → Set phase = 'connecting'
  → Open GET /stream SSE connection
  → Set phase = 'debating'
  → Listen for events → update UI in real-time
  → On 'debate:complete' → set phase = 'complete'
```

---

## 12. Accessibility Checklist

- [ ] All form inputs have associated `<label>` elements (can be visually hidden)
- [ ] Focus order follows visual order (dom order matches visual)
- [ ] All interactive elements receive keyboard focus
- [ ] Focus indicators are visible: 2px `#818CF8` ring with 4px offset
- [ ] No `outline: none` without a replacement
- [ ] Streaming text region uses `aria-live="polite"`
- [ ] Persona state changes announced via `aria-live="assertive"` (e.g., "Kiran is now speaking")
- [ ] Loading state has `role="status"` and `aria-label`
- [ ] Error state has `role="alert"`
- [ ] All icons are `aria-hidden="true"` or have `aria-label`
- [ ] Color contrast meets WCAG AA minimum:
  - Text ≥ 4.5:1 against background
  - Large text ≥ 3:1 against background
  - UI components ≥ 3:1 against adjacent colors
- [ ] `prefers-reduced-motion` respected (all animations disabled)
- [ ] Touch targets ≥ 44px on mobile
- [ ] Font size uses `rem` units (respects browser zoom)
- [ ] No information conveyed through color alone (persona dots also have text labels)
- [ ] Error messages are descriptive and suggest corrective action
- [ ] Screen reader test: Narrate the debate flow end-to-end

---

*This specification is designed for direct handoff to frontend engineers. Every component, state, transition, and interaction is defined. The result should feel like a premium SaaS product — expensive, mature, and trustworthy. No AI aesthetics. No visual noise. Just a focused tool for making better decisions.*
