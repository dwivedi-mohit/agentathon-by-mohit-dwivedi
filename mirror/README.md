# Mirror — Multi-Agent AI Decision War Room

**Pressure-test high-stakes business decisions through real-time adversarial debate between 4 conflicting AI expert personas before committing capital.**

Built at **Agent{A}thon 2026** — a 8-hour hackathon sprint to ship a working multi-agent product.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [How It Works](#how-it-works)
4. [The 4 Personas](#the-4-personas)
5. [Feature Catalog](#feature-catalog)
6. [Animations & Visual Design](#animations--visual-design)
7. [Architecture](#architecture)
8. [Streaming Protocol (SSE)](#streaming-protocol-sse)
9. [API Reference](#api-reference)
10. [Project Structure](#project-structure)
11. [Tech Stack](#tech-stack)
12. [Getting Started](#getting-started)
13. [Environment Variables](#environment-variables)
14. [Deployment](#deployment)
15. [Development Guide](#development-guide)
16. [Security](#security)
17. [Project Status](#project-status)

---

## Problem Statement

Business leaders face crippling decision paralysis when evaluating high-stakes strategic moves. A single perspective — whether overly optimistic, excessively cautious, operationally rigid, or customer-blind — leads to blind spots that kill companies.

**Existing solutions are broken:**
- Human advisory boards are slow, expensive, and biased by hierarchy
- Standard AI chatbots provide a single generic perspective
- Decision frameworks (pro/con lists, SWOT) lack adversarial tension
- No tool simulates **real-time cross-examination** from multiple conflicting viewpoints

## Solution Overview

Mirror solves this by orchestrating **4 AI personas with opposing intrinsic biases** to debate your business question in real-time. After 3 rounds of structured cross-examination, a synthesizer agent consolidates all arguments into a **decision brief** with ranked options, upside/downside analysis, and concrete action steps.

### What makes Mirror different

| Dimension | Mirror | ChatGPT / Claude | Human Board |
|-----------|--------|-----------------|-------------|
| **Perspectives** | 4 conflicting personas | Single response | Varies, often groupthink |
| **Response Time** | ~10-15 seconds | Instant | Days/weeks |
| **Adversarial** | Yes — personas attack each other's logic | No | Rare (politics) |
| **Structured Output** | Brief with options, risks, actions | Raw text | Meeting notes |
| **Cost** | ~$0.01 per debate | Free-$20/mo | $10k+/meeting |
| **Memory** | Full round-by-round transcript | Context window | Human memory |

## How It Works

### Phase 1: Question Submission

User submits a strategic question (e.g., *"Should we outsource engineering to cut costs?"*) with configurable round count (1–5).

### Phase 2: Persona Introduction

4 personas are introduced with their role, bias, and visual identity. Auto-advances after 2.5 seconds or user can skip.

### Phase 3: Structured Debate (Rounds)

Each round consists of **4 sequential monologues** — one per persona in this fixed order:

```
Round N:
  1. Uday  (Optimist)  — Makes the bullish case
  2. Kiran (Skeptic)   — Stress-tests assumptions, finds flaws
  3. Mohan (Operator)  — Grounds in operational reality
  4. Priya (Customer)  — Represents end-user impact
```

Each persona speaks for ~50-150 tokens. Later rounds build on earlier arguments, with personas referencing and rebutting each other's claims.

### Phase 4: Synthesis

After all rounds complete, the **Synthesizer agent** consumes the entire transcript and produces:

- **3 ranked strategic options** with confidence levels (High/Medium/Low)
- **Upside & downside** for each option
- **Action steps** (5 per option, chronological)
- **Championed by** — which personas back each option
- **Raw summary** — free-form conclusion

### Phase 5: Exploration Tabs

The decision brief is surfaced in 5 interactive tabs:

| Tab | Content |
|-----|---------|
| **Options Brief** | The 3 ranked options with full details |
| **Tradeoff Matrix** | Comparison table (effort, cost, risk, board alignment) + Pre-mortem failure simulator |
| **90-Day Roadmap** | Timeline planner with phased milestones |
| **Risk Spider** | Radar chart + Market volatility simulator |
| **Decision Log** | Journal to record your choice, confidence, and rationale |

## The 4 Personas

Each persona has a distinct personality, speaking style, and systematic bias encoded in their system prompt.

### Uday — The Optimist (🟢 #10B981)

```
Role:     Sees potential everywhere
Bias:     Optimism Fallacy
Symbol:   △ (triangle — upward, forward)
Style:    Enthusiastic, confident, big-picture
Favorite: "I see a massive opportunity here..."
```

Uday champions bold moves, first-mover advantage, and exponential growth. Every constraint is reframed as an opportunity. Uday will argue for aggressive timelines and maximum investment.

### Kiran — The Skeptic (🔴 #EF4444)

```
Role:     Finds what breaks
Bias:     Loss Aversion
Symbol:   □ (square — ground, stability)
Style:    Cynical, precise, risk-obsessed
Favorite: "I have concerns. Let me break down why."
```

Kiran exists to inject friction. Has seen too many startups fail to sugarcoat reality. Kiran will cite runway constraints, market saturation, and competitor moats. Every proposal is stress-tested for failure modes.

### Mohan — The Operator (🔵 #3B82F6)

```
Role:     Execution pragmatist
Bias:     Action Bias
Symbol:   ◇ (diamond — process, structure)
Style:    Direct, systems-focused, logistics-minded
Favorite: "Let's talk about execution."
```

Mohan has run businesses for 20 years. Cares about hiring pipelines, SOC2 compliance, SLA guarantees, and operational bandwidth. Mohan bridges the gap between vision and daily operations.

### Priya — The Customer (🟡 #F59E0B)

```
Role:     The end-user
Bias:     Subjective Anecdote
Symbol:   ○ (circle — user, human)
Style:    Blunt, value-focused, friction-aware
Favorite: "I don't care about your business model."
```

Priya represents the person paying for the product. Cares about price, convenience, onboarding friction, and whether the solution actually solves a real problem. Priya punctures abstract strategy with concrete user pain.

## Feature Catalog

### Core Features

| Feature | Description |
|---------|-------------|
| **Multi-agent debate** | 4 AI personas with conflicting biases debate your question |
| **Configurable rounds** | 1–5 rounds of cross-examination (default 3) |
| **SSE real-time streaming** | Character-by-character delivery via Server-Sent Events |
| **Structured synthesis** | 3 ranked options with upside/downside/action steps/champions |
| **Decision journal** | Log your choice, confidence rating, and rationale to localStorage |
| **Debate history** | Past debates saved with full transcripts |
| **Scratchpad** | Persistent notes sidebar synced to localStorage |
| **Import/Export backup** | Full debate history as JSON | 

### Interactive Features

| Feature | Description |
|---------|-------------|
| **Read Aloud (TTS)** | Browser SpeechSynthesis with persona-specific pitch/rate |
| **Translation** | Mock translation to ES, FR, JA, HI |
| **Call Bullshit** | Pressure-test button with persona-specific self-defense responses |
| **Bias detection** | Identifies cognitive bias in each persona's argument |
| **Sentiment meter** | Shows detected emotional intensity (+92% enthusiasm, -84% caution) |
| **Live interjection** | Type guidance mid-debate to steer personas |
| **Pre-mortem simulation** | "Assume it failed — why?" for each option |
| **Market volatility slider** | Adjust risk exposure and see projected ROI change |
| **Future outlook calculator** | 1-year ROI projection vs capital loss probability |
| **Board vote simulation** | Mock board votes (Yes/No/Recommendation) per option |
| **Copy as Notion Markdown** | Export decision brief to clipboard in formatted markdown |

### UI Features

| Feature | Description |
|---------|-------------|
| **4 themes** | Cyberpunk (default), Slate, Emerald, Solarized |
| **Tone selector** | Combative, Balanced, Supportive (affects persona prompts) |
| **Speed selector** | Normal, Fast, Turbo (controls streaming pace) |
| **Round indicator** | Visual stepper with animated dots and checkmarks |
| **Argument mindmap** | SVG graph showing active persona connections |
| **Responsive 3-column layout** | Left sidebar, center workspace, right panels |

## Animations & Visual Design

### Background Layer (CSS)

| Animation | Technique | Elements |
|-----------|-----------|----------|
| **Floating orbs** | 5 `@keyframes` drift animations (20-30s cycles) | Purple, blue, indigo, green, red radial gradients with `blur(100px)` |
| **Grid mesh** | CSS `radial-gradient` mask on repeating linear gradients | 60px grid spacing, 3% opacity |
| **Noise texture** | SVG `<feTurbulence>` base64 background | 256px tiles, 0.35 opacity |
| **Scanline overlay** | `repeating-linear-gradient` 2px/4px pattern | 3% black overlay |
| **Gradient fade** | Bottom-to-top transparent-to-`#07070D/40` | Depth fade at bottom |

### Particle System (Canvas)

- **200+ particles** spawned at mouse position every 150ms
- Each particle: position, velocity, size (0.5–3px), alpha (0.1–0.5), hue (240–300), lifespan (100–180 frames)
- Glow effect on particles > 1.5px size (3x radius at 8% alpha)
- Fade-in (20 frames) and fade-out (remaining life) curves
- RequestAnimationFrame loop at 60fps

### Framer Motion Animations

| Component | Animation | Properties |
|-----------|-----------|------------|
| **App pages** | AnimatePresence `mode="wait"` | Fade + slide (opacity, y ±10px) |
| **QuestionInput** | Staggered cascade (4 stages) | Fade + slide up, 0.1-0.4s delays |
| **PersonaIntro** | Spring cards + floating icons | RotateY, scale, y-bounce, 3s loop |
| **PersonaGrid** | Stagger children (80ms interval) | Spring: opacity, y, scale (180/18 stiffness/damping) |
| **PersonaCard** | Speaking scale + spring | Scale 1.02, spring 220/20 |
| **Speaking ring** | Infinite pulsing border | Opacity 0.3→0.6 radial gradient, 2.2s cycle |
| **Avatar dots** | Speaking wave indicators | Scale 0.4→1, 1s cycle per dot (150ms stagger) |
| **Typewriter cursor** | Blinking caret | Opacity toggle, 0.6s, inline-block |
| **Loading dots** | Thinking ellipsis stagger | Opacity 0→1→0 cascade, 1.5s, 200ms delays |
| **SynthesizerCard options** | Stagger children (100ms) | Spring: opacity, y, 180/22 stiffness/damping |
| **Loading spinner** | 4 rotating border rings | 360° rotation, 2/2.5/3/2.2s durations, 150ms stagger |
| **Spinner core** | Breathing pulse | Scale 0.8→1, 2s loop |
| **Round indicator** | Active dot pulse + glow | Scale 1→1.3, boxShadow bloom, 2s loop |
| **Header** | Slide down + fade | y: -20→0, 0.4s |
| **Error state** | Fade + slide | opacity 0→1, y 15→0 |
| **Challenge response** | Expand reveal | opacity + height, spring |
| **Button hover** | Scale + shadow | 1.02 scale, glow intensify |
| **Suggestion chips** | Fade + slide up | 0.3s delay, 0.4s duration |
| **PersonaIntro "Start" button** | Delay cascade (0.8s) | opacity + y slide |
| **Complete state** | Fade + slide | 0.3s transition |
| **Connecting state** | Fade in | Simple opacity |

### Glass Morphism

All cards and panels use:
- `background: rgba(18, 18, 30, 0.55)` (glass) or `0.75` (glass-strong)
- `backdrop-filter: blur(16px)` (glass) or `blur(24px)` (glass-strong)
- `border: 1px solid rgba(...)` at varying opacities
- `border-radius: 16px` (cards) or `24px` (panels)

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                       FRONTEND (Vercel)                          │
│                                                                  │
│  React 19 + TypeScript + Vite 8 + Tailwind 4 + Framer Motion 12 │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │Question  │  │Persona   │  │Synthesis │  │Left/Right       │  │
│  │Input     │→ │Grid      │→ │Card      │  │Sidebar          │  │
│  │          │  │          │  │          │  │(history, stats) │  │
│  └──────────┘  └──────────┘  └──────────┘  └─────────────────┘  │
│       │              │              │                            │
│       ▼              ▼              ▼                            │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              API Layer (api.ts + useDebate.ts)            │    │
│  │  POST /api/debate → GET /api/debate/{id}/stream (SSE)    │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
                           │ HTTP / SSE
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      BACKEND (Vercel Python)                     │
│                                                                  │
│  FastAPI + Python 3.12 + httpx + pydantic                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              FastAPI App (main.py)                        │    │
│  │  CORSMiddleware · Rate Limiter · Global Error Handler     │    │
│  └────────┬──────────────────────────────────────────────┬───┘    │
│           │                                              │        │
│           ▼                                              ▼        │
│  ┌──────────────────┐                        ┌──────────────────┐ │
│  │  Health Router   │                        │  Debate Router   │ │
│  │  GET /api/health │                        │  POST /api/debate│ │
│  └──────────────────┘                        │  GET /stream     │ │
│                                              └────────┬─────────┘ │
│                                                       │           │
│                                                       ▼           │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  Agents Layer                                 │ │
│  │                                                               │ │
│  │  ┌──────────────────────────────────────────────────────┐     │ │
│  │  │  Orchestrator (orchestrator.py)                      │     │ │
│  │  │  ├── run_debate() → async generator of SSE events    │     │ │
│  │  │  ├── run_persona_round(persona, question) → text      │     │ │
│  │  │  └── synthesize(session) → SynthesisBrief             │     │ │
│  │  └──────────────────────────────────────────────────────┘     │ │
│  │                                                               │ │
│  │  ┌──────────────────────────────────────────────────────┐     │ │
│  │  │  LLM Service (services/llm_service.py)                │     │ │
│  │  │  ├── GroqClient (OpenAI-compatible /chat/completions) │     │ │
│  │  │  │   └── POST https://api.groq.com/openai/v1/...     │     │ │
│  │  │  └── MockLLMFallback (no API key → canned responses) │     │ │
│  │  └──────────────────────────────────────────────────────┘     │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  Data Layer                                   │ │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │ │
│  │  │  Models         │  │  Session Store │  │  Config        │  │ │
│  │  │  (schemas,      │  │  (thread-safe  │  │  (Settings     │  │ │
│  │  │   persona,      │  │   in-memory    │  │   pydantic     │  │ │
│  │  │   debate)       │  │   dict + TTL)  │  │   BaseSettings)│  │ │
│  │  └────────────────┘  └────────────────┘  └────────────────┘  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │    Groq API             │
              │  llama-3.3-70b-versatile│
              │  /chat/completions      │
              └─────────────────────────┘
```

### Data Flow

```
USER QUESTION
    │
    ▼
[1] POST /api/debate { question, num_rounds }
    │
    ▼
[2] Create Session → return { session_id, stream_url }
    │
    ▼
[3] GET /api/debate/{id}/stream (SSE connection)
    │
    ▼
[4] Orchestrator loop:
    │
    ├── Round 1:
    │   ├── Uday  → persona:start → persona:chunk* → persona:done
    │   ├── Kiran → persona:start → persona:chunk* → persona:done
    │   ├── Mohan → persona:start → persona:chunk* → persona:done
    │   └── Priya → persona:start → persona:chunk* → persona:done
    │
    ├── Round 2:
    │   └── (same structure, personas reference prior arguments)
    │
    ├── Round 3:
    │   └── (same structure)
    │
    ├── round:complete { round, next_round }
    │
    ├── synthesis:start
    ├── Synthesizer agent consumes full transcript
    ├── synthesis:chunk* (raw text streaming)
    ├── synthesis:done { brief }
    │
    └── debate:complete { session_id, duration_ms }

Legend: * = multiple events (chunks streamed character-by-character)
```

## Streaming Protocol (SSE)

All real-time data flows through Server-Sent Events on a single GET endpoint.

### Event Types

```
event: persona:start
data: {"persona_id": "uday", "round": 1}

event: persona:chunk
data: {"persona_id": "uday", "text": "I see a massive opportunity...", "round": 1}

event: persona:done
data: {"persona_id": "uday", "full_text": "...", "round": 1}

event: round:complete
data: {"round": 1, "next_round": 2}

event: synthesis:start
data: {}

event: synthesis:chunk
data: {"text_chunk": "After considering all arguments..."}

event: synthesis:done
data: {"brief": {"options": [...], "raw_summary": "..."}}

event: debate:complete
data: {"session_id": "...", "duration_ms": 10949}

event: error
data: {"message": "..."}
```

### Client Implementation

```typescript
const source = new EventSource(`/api/debate/${sessionId}/stream`);

source.addEventListener('persona:chunk', (e) => {
  const data = JSON.parse(e.data);
  // Append data.text to persona's statement text
});

source.addEventListener('synthesis:done', (e) => {
  const data = JSON.parse(e.data);
  // Render decision brief from data.brief
  source.close();
});
```

## API Reference

### `POST /api/debate`

Create a new debate session.

**Request:**
```json
{
  "question": "Should we outsource engineering to cut costs?",
  "language": "en",
  "num_rounds": 3
}
```

| Field | Type | Default | Constraints |
|-------|------|---------|-------------|
| `question` | string | — | Required, 10-500 chars, must contain text |
| `language` | string | `"en"` | Must match `^en$` |
| `num_rounds` | integer | `3` | 1-5 |

**Response `200`:**
```json
{
  "session_id": "6ee5950a-a94b-459e-a147-2637d935c27c",
  "status": "pending",
  "question": "Should we outsource engineering to cut costs?",
  "personas": [
    { "id": "uday", "name": "Uday", "role": "The Optimist", "color": "#10B981", "description": "..." },
    { "id": "kiran", "name": "Kiran", "role": "The Skeptic", "color": "#EF4444", "description": "..." },
    { "id": "mohan", "name": "Mohan", "role": "The Operator", "color": "#3B82F6", "description": "..." },
    { "id": "priya", "name": "Priya", "role": "The Customer", "color": "#F59E0B", "description": "..." }
  ],
  "stream_url": "/api/debate/6ee5950a/stream"
}
```

### `GET /api/debate/{session_id}/stream`

SSE stream for a debate session. Returns events as described in [Streaming Protocol](#streaming-protocol-sse).

### `GET /api/debate/{session_id}`

Get completed debate result.

### `GET /api/health`

Health check.

**Response `200`:**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime_seconds": 42,
  "active_debates": 0
}
```

## Project Structure

```
mirror/
├── README.md                          # This file
├── .vercelignore                      # Excludes api/ and backend/ from frontend build
├── vercel.json                        # Root Vercel config (combined deploy)
│
├── frontend/                          # React + Vite + Tailwind
│   ├── README.md
│   ├── vercel.json                    # Frontend-only Vercel config
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── eslint.config.js
│   ├── index.html
│   └── src/
│       ├── main.tsx                   # React entry point
│       ├── App.tsx                    # Root component with phase routing
│       ├── App.css
│       ├── index.css                  # Global styles, CSS variables, animations
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AppShell.tsx       # Main shell (background + particles + header)
│       │   │   ├── Header.tsx         # Top navigation bar
│       │   │   ├── Footer.tsx         # Minimal footer
│       │   │   ├── LeftSidebar.tsx    # History + scratchpad + templates
│       │   │   └── RightSidebar.tsx   # Stats + settings + controls
│       │   │
│       │   ├── debate/
│       │   │   ├── QuestionInput.tsx   # Input textarea + suggestion chips
│       │   │   ├── PersonaIntro.tsx    # 4-persona intro screen
│       │   │   ├── PersonaGrid.tsx     # 2×2 grid layout
│       │   │   ├── PersonaCard.tsx     # Individual persona card with all features
│       │   │   ├── RoundIndicator.tsx  # Round stepper with animated dots
│       │   │   ├── SynthesizerCard.tsx # Full results view with 5 tabs
│       │   │   ├── DebateMindmap.tsx   # SVG argument visualization
│       │   │   ├── TimelinePlanner.tsx # 90-day roadmap component
│       │   │   ├── RiskRadar.tsx       # Risk spider chart
│       │   │   ├── LoadingState.tsx    # Animated loading spinner
│       │   │   └── ErrorState.tsx      # Error display with retry
│       │   │
│       │   └── ui/
│       │       ├── Button.tsx          # Reusable button component
│       │       └── Icons.tsx           # SVG icon components
│       │
│       ├── hooks/
│       │   ├── useDebate.ts           # Core debate state machine + SSE logic
│       │   └── useSSE.ts              # Generic SSE hook with reconnection
│       │
│       ├── lib/
│       │   ├── api.ts                 # HTTP client (createDebate)
│       │   ├── particles.ts           # Canvas particle system class
│       │   ├── utils.ts               # Utility functions
│       │   └── constants.ts           # Persona icons, shared constants
│       │
│       └── types/
│           └── index.ts               # TypeScript types and interfaces
│
├── backend/                           # FastAPI + Python
│   ├── vercel.json                    # Backend-only Vercel config
│   ├── requirements.txt               # Python dependencies
│   ├── .env                           # Local environment variables (gitignored)
│   │
│   ├── api/
│   │   └── index.py                   # Vercel serverless entry point
│   │
│   └── app/
│       ├── __init__.py
│       ├── main.py                    # FastAPI app + middleware + routers
│       ├── config.py                  # pydantic-settings BaseSettings
│       │
│       ├── api/
│       │   ├── __init__.py
│       │   ├── health.py              # GET /api/health
│       │   └── debate.py              # POST /api/debate, GET /stream, GET /result
│       │
│       ├── models/
│       │   ├── __init__.py
│       │   ├── schemas.py             # Pydantic models (DebateRequest, DebateResponse, etc.)
│       │   ├── persona.py             # Persona definitions (4 personas)
│       │   └── debate.py              # DebateSession model
│       │
│       ├── agents/
│       │   ├── __init__.py
│       │   └── orchestrator.py        # run_debate() async generator
│       │
│       ├── services/
│       │   ├── __init__.py
│       │   └── llm_service.py         # Groq API client + Mock fallback
│       │
│       ├── store/
│       │   ├── __init__.py
│       │   └── session_store.py       # Thread-safe in-memory session store with TTL
│       │
│       └── utils/
│           ├── __init__.py
│           └── prompts.py             # Persona system prompts + synthesizer prompt
│
└── docs/                              # Project documentation
    ├── PRD-MIRROR.md                  # Product Requirements Document
    ├── TECH-ARCHITECTURE.md           # Technical Architecture Document
    ├── SECURITY.md                    # Security & Access Document
    ├── FRONTEND-SPEC.md               # Frontend Specification
    └── ...                            # Additional feature tickets
```

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 8.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first CSS |
| Framer Motion | 12.x | Declarative animations |
| Vite Proxy | — | Dev proxy to backend |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.12 | Runtime |
| FastAPI | 0.115+ | Web framework |
| uvicorn | — | ASGI server |
| httpx | — | Async HTTP client for Groq API |
| pydantic | 2.x | Data validation |
| pydantic-settings | — | Environment config |

### API

| Service | Purpose |
|---------|---------|
| Groq API | LLM inference (`llama-3.3-70b-versatile`) |
| SSE | Real-time streaming protocol |

### Deployment

| Platform | Service |
|----------|---------|
| Vercel (Frontend) | Static site hosting |
| Vercel (Backend) | Python serverless functions |

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.12
- npm or yarn or pnpm

### Local Development

```bash
# 1. Clone the repository
git clone <repo-url>
cd mirror

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd ../backend
pip install -r requirements.txt

# 4. Start the backend (terminal 1)
cd backend
python -m uvicorn app.main:app --reload --port 8000

# 5. Start the frontend (terminal 2)
cd frontend
npm run dev

# 6. Open http://localhost:5173
```

### Production Build

```bash
cd frontend
npm run build
# Output in frontend/dist/

npx vite preview
# Test production build locally
```

### API Key Setup

By default, Mirror runs in **mock mode** — all persona responses are pre-written canned texts. To enable real AI-powered debates:

```bash
# Set Groq API key
export GROQ_API_KEY="gsk_your_key_here"

# Then start the backend
python -m uvicorn app.main:app --reload --port 8000
```

You can get a free Groq API key at https://console.groq.com.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `"Mirror"` | Application name |
| `APP_VERSION` | `"0.1.0"` | Version string |
| `DEBUG` | `False` | Debug mode |
| `LOG_LEVEL` | `"info"` | Logging level |
| `HOST` | `"0.0.0.0"` | Bind address |
| `PORT` | `8000` | Bind port |
| `CORS_ORIGINS` | `http://localhost:5173,...` | Allowed CORS origins (comma-separated) |
| `GROQ_API_KEY` | `""` | Groq API key (empty = mock mode) |
| `AGENTFIELD_API_KEY` | `""` | Reserved |
| `AGENTFIELD_AGENT_ID` | `""` | Reserved |
| `RATE_LIMIT_REQUESTS` | `10` | Max requests per window |
| `RATE_LIMIT_WINDOW_SECONDS` | `60` | Rate limit window |
| `SESSION_TTL_SECONDS` | `1800` | Session expiry (30 min) |
| `PERSONA_MODEL` | `"llama-3.3-70b-versatile"` | Model for persona generation |
| `SYNTHESIZER_MODEL` | `"llama-3.3-70b-versatile"` | Model for synthesis |
| `PERSONA_MAX_TOKENS` | `300` | Max tokens per persona response |
| `SYNTHESIZER_MAX_TOKENS` | `1000` | Max tokens for synthesis |
| `LLM_TEMPERATURE` | `0.8` | LLM temperature (0-1) |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `''` (empty = same-origin) | Backend base URL |

## Deployment

### Deploy to Vercel (Frontend only)

```bash
cd frontend
npx vercel --prod --yes
```

### Deploy to Vercel (Backend only)

```bash
cd backend
npx vercel --prod --yes
```

### Set Production Environment Variables

```bash
cd backend
npx vercel env add GROQ_API_KEY production
npx vercel env add CORS_ORIGINS production
npx vercel --prod --yes
```

### Deployment URLs (current)

| Service | URL |
|---------|-----|
| Frontend | https://frontend-iota-nine-83.vercel.app |
| Backend | https://backend-omega-sage-55.vercel.app |

## Development Guide

### Adding a New Persona

1. Add persona definition in `backend/app/models/persona.py`
2. Add system prompt in `backend/app/utils/prompts.py`
3. Add icon character in `frontend/src/lib/constants.ts`
4. Add color scheme support in relevant components

### Adding a New Tab to Synthesis

1. Add tab button in `SynthesizerCard.tsx` navigation
2. Add conditional render in the tabs content section
3. Add any new sub-components in `frontend/src/components/debate/`

### Modifying the Debate Flow

1. Edit `backend/app/agents/orchestrator.py` — the `run_debate()` async generator
2. Add/modify SSE event types
3. Update `frontend/src/hooks/useDebate.ts` event listeners

### Styling Conventions

- Use Tailwind utility classes for layout and spacing
- CSS variables in `index.css` for theme colors
- Framer Motion for all animations
- Glass morphism via `.glass` and `.glass-strong` CSS classes
- Color scheme via `body.theme-*` classes

## Security

- **Input sanitization**: Question text is stripped and validated (10-500 chars, no empty whitespace)
- **Rate limiting**: Configurable (default 10 requests per 60s window)
- **Session TTL**: 30-minute expiry with background cleanup
- **CORS**: Restricted to configured origins (localhost + production URLs)
- **No secrets in code**: API keys via environment variables only
- **No database**: In-memory session store, no persistent storage
- **Client-side storage only**: localStorage for user preferences and history

For full details, see [docs/SECURITY.md](./docs/SECURITY.md).

## Project Status

### Completed

- ✅ Full premium UI with all animations
- ✅ All Framer Motion animation components
- ✅ Canvas particle system
- ✅ CSS animated background (orbs, grid, noise, scanlines)
- ✅ Glass morphism design system
- ✅ 5-tab Synthesis view (Brief, Matrix, Timeline, Risks, Journal)
- ✅ Backend debate orchestrator (4 personas × N rounds + synthesis)
- ✅ Groq API integration (llama-3.3-70b-versatile)
- ✅ Mock LLM fallback for zero-config demos
- ✅ SSE real-time streaming
- ✅ 3-column War Room layout
- ✅ 4 color themes
- ✅ Dark theme throughout
- ✅ All interactive features (TTS, translation, call bullshit, bias detection)
- ✅ Decision journal with localStorage persistence
- ✅ Debate history with import/export
- ✅ Vercel deployment (frontend + backend)

### In Progress

- 🔄 Production monitoring & observability

### Planned

- 📋 Multi-language support (real translation, not mock)
- 📋 AgentField integration for distributed multi-agent orchestration
- 📋 Persistent database (PostgreSQL/Vercel KV) instead of in-memory
- 📋 User authentication
- 📋 Custom persona creation by users
- 📋 WebSocket upgrade for bidirectional streaming (interjections)
- 📋 Analytics dashboard
- 📋 Mobile responsive refinements

---

Built with ❤️ at Agent{A}thon 2026.
