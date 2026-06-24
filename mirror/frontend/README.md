# Mirror — Decision War Room

Pressure-test high-stakes business decisions through real-time debate between 4 conflicting AI personas before committing capital.

## Live Demo

**Frontend:** https://frontend-iota-nine-83.vercel.app
**Backend API:** https://backend-omega-sage-55.vercel.app

## Personas

| Persona | Role | Color | Description |
|---------|------|-------|-------------|
| **Uday** | The Optimist | Green | Sees potential everywhere. Every constraint is an opportunity. |
| **Kiran** | The Skeptic | Red | Finds what breaks. Has seen 100 startups fail. |
| **Mohan** | The Operator | Blue | Run businesses for 20 years. Cares about logistics. |
| **Priya** | The Customer | Amber | The end-user. Cares about value, not vision. |

## Features & Animations

- **Animated background** — 5 floating gradient orbs with smooth drift keyframes
- **Particle system** — Mouse-follow canvas particles with glow and fade
- **Noise texture + scanline overlay** — CRT-inspired ambient layer
- **3D tilt cards** — Perspective transform on PersonaCard hover
- **Typewriter text** — Character-by-character streaming via SSE
- **Staggered cascades** — Framer Motion `staggerChildren` on PersonaGrid and SynthesizerCard options
- **Speaking glow rings** — Pulsing radial gradient border on active persona
- **Round indicator** — Animated dots with pulsing box-shadow on active round
- **Loading spinner** — 4 rotating border rings with pulsing core
- **Page transitions** — AnimatePresence `mode="wait"` with fade/slide between phases
- **Glass morphism** — `backdrop-filter: blur()` on cards and panels
- **Suggestion chips** — Rotating quick-prompt buttons for immediate use

## Architecture

```
Frontend (React + Vite + Tailwind + Framer Motion)
    │  POST /api/debate (question)
    │  GET  /api/debate/{id}/stream (SSE)
    ▼
Backend (FastAPI + Python)
    │
    ├── Orchestrator → 4 personas × 3 rounds
    ├── LLM Service  → Groq API (llama-3.3-70b-versatile) / Mock fallback
    └── Synthesis    → Structured decision brief with options
```

Data flows via Server-Sent Events: `persona:start` → `persona:chunk` → `persona:done` → `round:complete` → `synthesis:start` → `synthesis:chunk` → `synthesis:done` → `debate:complete`.

## Getting Started

```bash
# Install dependencies
cd frontend && npm install

# Start dev server (frontend on :5173, backend on :8000)
npm run dev

# Production build
npm run build
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `''` (same-origin proxy) | Backend API base URL |
| `GROQ_API_KEY` | mock mode | Groq API key for LLM debates |

The app runs in mock mode (no API calls) when `GROQ_API_KEY` is not set.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Framer Motion 12
**Backend:** Python 3.12, FastAPI, httpx, pydantic
**API:** Groq (OpenAI-compatible), SSE streaming
**Deployment:** Vercel (static frontend + Python serverless function)
