# Technical Architecture Document: Mirror

**Status:** v0.1 — Pre-MVP
**Author:** Senior Software Architect
**Date:** June 2026
**Event:** Agent{A}thon 2026

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack & Rationale](#2-tech-stack--rationale)
3. [Architecture Diagram](#3-architecture-diagram)
4. [Data Flow](#4-data-flow)
5. [File & Folder Structure](#5-file--folder-structure)
6. [Database Schema](#6-database-schema)
7. [API Contracts](#7-api-contracts)
8. [Environment Variables](#8-environment-variables)
9. [Configuration Notes](#9-configuration-notes)
10. [Deployment Strategy](#10-deployment-strategy)
11. [Performance Considerations](#11-performance-considerations)
12. [Security Notes](#12-security-notes)

---

## 1. System Overview

Mirror is a **multi-agent debate engine** that takes a user's business question, spawns 4 AI personas with opposing viewpoints, runs a structured turn-based debate, and synthesizes the output into a decision brief.

### Key Architectural Requirements

| Requirement | Implication |
|---|---|
| Real-time streaming output | SSE (Server-Sent Events) from backend to frontend |
| Multi-agent orchestration | Async parallel agent spawning + sequential turn management |
| AgentField.ai integration | Wrap orchestration layer as AgentField agents |
| No user auth in MVP | Stateless backend, no session persistence |
| 8-hour hackathon timeline | Monorepo, minimal boilerplate, zero-config deployment |
| Future persistence | Design schema now even if MVP uses in-memory state |

---

## 2. Tech Stack & Rationale

| Layer | Choice | Version | Rationale |
|---|---|---|---|
| **Frontend Framework** | React | 18.x | Ubiquitous, fast iteration, rich ecosystem for streaming UIs |
| **Build Tool** | Vite | 5.x | Sub-second HMR, native TypeScript, smaller bundles than CRA |
| **Styling** | Tailwind CSS | 3.x | Zero runtime, utility-first, fastest way to build responsive UI |
| **Animation** | Framer Motion | 11.x | Declarative animations for persona card entrances and streaming text |
| **SSE Client** | EventSource (native) | — | Zero dependencies, built into browsers, handles reconnection |
| **Backend Framework** | FastAPI | 0.111.x | Native async, automatic OpenAPI docs, first-class SSE support via StreamingResponse |
| **ASGI Server** | Uvicorn | 0.29.x | Industry standard for FastAPI, low latency |
| **LLM Provider** | Anthropic Claude | Claude 3 Haiku (personas) + Claude 3.5 Sonnet (synthesizer) | Haiku: fastest inference, lowest cost per token, ideal for real-time streaming. Sonnet: superior reasoning for synthesis. |
| **Agent Orchestration** | AgentField.ai | Latest | Required for +10 bonus points. Wraps debate engine as trackable agents. |
| **Backend HTTP Client** | httpx | 0.27.x | Async HTTP client for LLM API calls. Supports streaming responses natively. |
| **Data Validation** | Pydantic | 2.x | Built into FastAPI, strict typing for all request/response models |
| **Frontend Deployment** | Vercel | — | Free tier, zero-config, automatic HTTPS, edge network |
| **Backend Deployment** | Railway | — | Free tier, automatic deploys from GitHub, custom domains, environment variable management |
| **Version Control** | GitHub | — | Public repo required for submission |
| **State (MVP)** | In-memory | — | No database in MVP. Python dict with TTL cleanup. |

### Why Not...

| Rejected | Reason |
|---|---|
| Next.js | Overkill for a single-page streaming app. Adds SSR complexity with zero benefit here. |
| Django | Heavy, synchronous ORM, not ideal for streaming/async workloads. |
| PostgreSQL (MVP) | Zero benefit for 8-hour hackathon. In-memory state is faster to build and debug. |
| WebSockets | SSE is simpler, unidirectional (server → client), auto-reconnects, works over HTTP/2. No need for bidirectional communication. |
| OpenAI GPT-4 | More expensive, slower. Claude Haiku has better speed/quality tradeoff for persona generation. |
| Redis | Unnecessary for a single-server MVP. Add when scaling beyond 1 instance. |
| Docker | Adds build time. Railway can deploy directly from GitHub. Skip for hackathon. |

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  React App (Vite + Tailwind + Framer Motion)          │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │  │
│  │  │Question  │  │ Persona  │  │  Debate Stream   │    │  │
│  │  │ Input    │→ │ Cards    │→ │  (SSE)           │    │  │
│  │  └──────────┘  └──────────┘  └────────┬─────────┘    │  │
│  │                                        ▼              │  │
│  │                              ┌──────────────────┐    │  │
│  │                              │ Synthesizer Card │    │  │
│  │                              │ + Action Plan    │    │  │
│  │                              └──────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ POST /api/debate  │  SSE stream
                       ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    FASTAPI BACKEND                            │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  POST /api/debate  ─→  Orchestrator.start_debate()   │  │
│  │                        ┌──────────────────────┐      │  │
│  │                        │   DebateOrchestrator  │      │  │
│  │                        │  (manages turns)      │      │  │
│  │                        └───────┬──────┬───────┘      │  │
│  │                                │      │               │  │
│  │          ┌─────────────────────┼──────┼───────────┐   │  │
│  │          ▼                     ▼      ▼           │   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  │   │  │
│  │  │ Persona 1  │  │ Persona 2  │  │ Persona 3  │  │   │  │
│  │  │ (Uday)     │  │ (Kiran)    │  │ (Mohan)    │  │   │  │
│  │  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘  │   │  │
│  │         │               │                │         │   │  │
│  │  ┌──────▼───────────────▼────────────────▼─────┐   │   │  │
│  │  │          LLM Gateway (httpx + SSE)          │   │   │  │
│  │  │   ┌──────────────────────────────────┐      │   │   │  │
│  │  │   │  Anthropic Claude API            │      │   │   │  │
│  │  │   │  (Haiku → personas, Sonnet →     │      │   │   │  │
│  │  │   │   synthesizer)                   │      │   │   │  │
│  │  │   └──────────────────────────────────┘      │   │   │  │
│  │  └─────────────────────────────────────────────┘   │   │  │
│  │                                                    │   │  │
│  │  ┌─────────────────────────────────────────────┐   │   │  │
│  │  │  SynthesizerAgent                            │   │   │  │
│  │  │  (reads all rounds, produces brief)          │   │   │  │
│  │  └─────────────────────────────────────────────┘   │   │  │
│  └────────────────────────────────────────────────────┘   │  │
│                                                           │  │
│  ┌─────────────────────────────────────────────────────┐  │  │
│  │  AgentField.ai Layer (wraps agents for +10 bonus)   │  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐    │  │  │
│  │  │Persona 1 │ │Persona 2 │ │   Orchestrator   │    │  │  │
│  │  │Agent     │ │Agent     │ │   Agent          │    │  │  │
│  │  └──────────┘ └──────────┘ └──────────────────┘    │  │  │
│  └─────────────────────────────────────────────────────┘  │  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Data Flow

### Happy Path: Full Debate

```
Step 1: User submits question
         POST /api/debate { question: "..." }

Step 2: Backend creates DebateSession (in-memory)
         - Generates session_id (UUID)
         - Initializes empty rounds list
         - Returns session_id + 201 Created

Step 3: Frontend opens SSE connection
         GET /api/debate/{session_id}/stream

Step 4: Backend starts debate orchestration
         ┌─────────────────────────────────────────────┐
         │ Round 1:                                    │
         │   Uday speaks  ──→ SSE event: "persona:1:1" │
         │   Kiran speaks ──→ SSE event: "persona:2:1"  │
         │   Mohan speaks ──→ SSE event: "persona:3:1"  │
         │   Priya speaks ──→ SSE event: "persona:4:1"  │
         │                                              │
         │ Round 2:                                    │
         │   (same order, personas reference each other)│
         │                                              │
         │ Round 3:                                    │
         │   (final positions hardened)                 │
         │                                              │
         │ Synthesis:                                  │
         │   SSE event: "synthesis:start"               │
         │   SSE event: "synthesis:chunk" (streaming)   │
         │   SSE event: "synthesis:done"                │
         └─────────────────────────────────────────────┘

Step 5: Frontend renders each SSE event in real-time
         - Persona cards animate in
         - Debate text streams into each card
         - Synthesizer card appears with structured brief

Step 6: Frontend calls GET /api/debate/{session_id}/result
         (optional — retrieves full structured result)
```

### SSE Event Format

```typescript
// Each SSE message is JSON
id: <turn_number>
event: <event_type>
data: { ... }

// Event types:
// "persona:start"   → { persona_id, persona_name, round }
// "persona:chunk"   → { persona_id, text_chunk }
// "persona:done"    → { persona_id, full_text }
// "synthesis:start" → { }
// "synthesis:chunk" → { text_chunk }
// "synthesis:done"  → { brief: { options: [...] } }
// "error"           → { message }
// "debate:complete" → { session_id }
```

---

## 5. File & Folder Structure

```
mirror/
│
├── frontend/                          # React + Vite + Tailwind
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── QuestionInput.tsx      # Main text input + submit
│   │   │   ├── PersonaCard.tsx        # Individual persona card with avatar + streaming text
│   │   │   ├── PersonaGrid.tsx        # Grid layout for 4 persona cards
│   │   │   ├── DebateStream.tsx       # Orchestrates SSE connection + renders cards
│   │   │   ├── SynthesizerCard.tsx    # Final structured brief output
│   │   │   ├── ActionPlan.tsx         # Actionable next steps per option
│   │   │   ├── LoadingState.tsx       # Initial waiting state
│   │   │   └── ErrorState.tsx         # Error display
│   │   │
│   │   ├── hooks/
│   │   │   └── useDebate.ts           # Custom hook: SSE connection + state management
│   │   │
│   │   ├── types/
│   │   │   └── index.ts              # All TypeScript interfaces
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts                # API client functions
│   │   │   └── constants.ts          # Persona definitions, colors, config
│   │   │
│   │   ├── App.tsx                   # Root component, manages global state
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Tailwind imports + global styles
│   │
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── package.json
│
├── backend/                           # Python FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # FastAPI app factory, CORS, router registration
│   │   ├── config.py                 # Environment config, constants
│   │   │
│   │   ├── models/                    # Pydantic models + domain logic
│   │   │   ├── __init__.py
│   │   │   ├── schemas.py            # Request/Response schemas
│   │   │   ├── persona.py            # Persona definitions (prompts, traits)
│   │   │   └── debate.py             # DebateSession, DebateRound models
│   │   │
│   │   ├── agents/                    # AI agent logic
│   │   │   ├── __init__.py
│   │   │   ├── persona_agent.py      # Generates persona responses via LLM
│   │   │   ├── orchestrator.py       # Manages debate turns, round progression
│   │   │   └── synthesizer.py        # Reads all rounds, produces structured brief
│   │   │
│   │   ├── api/                       # Route handlers
│   │   │   ├── __init__.py
│   │   │   ├── debate.py             # POST /api/debate, GET /api/debate/{id}/stream
│   │   │   └── health.py             # GET /api/health
│   │   │
│   │   ├── services/                  # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── llm_service.py        # LLM API client (httpx, streaming)
│   │   │   ├── debate_service.py     # Debate lifecycle management
│   │   │   └── agentfield_service.py # AgentField.ai integration wrapper
│   │   │
│   │   ├── store/                     # In-memory state management
│   │   │   ├── __init__.py
│   │   │   └── session_store.py      # Thread-safe dict with TTL cleanup
│   │   │
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── prompts.py            # System prompts for each persona
│   │       └── streaming.py          # SSE event formatter helpers
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_orchestrator.py
│   │   ├── test_persona_agent.py
│   │   └── test_api.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── docs/
│   ├── PRD-MIRROR.md
│   └── TECH-ARCHITECTURE.md          # This file
│
├── .gitignore
├── .env.example                       # Root-level env example
├── railway.json                       # Railway deployment config
├── vercel.json                        # Vercel deployment config (API proxy)
└── README.md
```

### Why This Structure

| Decision | Rationale |
|---|---|
| Monorepo (`frontend/` + `backend/`) | Single repo for hackathon speed. Separate deploy configs for each platform. |
| `agents/` directory | Isolates AI logic from API routes. Testable independently. Swap LLM providers without touching routes. |
| `services/` directory | Business logic layer between API and agents. Prevents circular imports, enables unit testing. |
| `store/` directory | Explicit in-memory state layer. When you add a database later, you replace this directory — no other code changes. |
| `models/persona.py` | Persona definitions as code (not config files). Enables type-safe persona access from any module. |
| Tests directory | Minimal. One test per core module. Only critical-path tests for hackathon. |

---

## 6. Database Schema

### Design Philosophy

The MVP uses **zero persistence** — all state is held in-memory. However, the schema below is designed for v1.5+ when a database is added. Using PostgreSQL (or SQLite for simplicity) as the backing store.

The schema follows a **flat, denormalized** pattern optimized for the reads Mirror performs:
- Fetch all rounds for a debate (sequential)
- Fetch all statements by a persona (for analysis)
- Fetch recent debates by a user (for journal)

### Entity Relationship Diagram (Text)

```
users ──1:N── debates ──1:N── debate_rounds ──1:N── persona_statements
  │                        │
  │                        └──1:1── synthesis_results
  │
  └── (future: decision_journal)
```

### Table: `users`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default gen_random_uuid() | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email for login |
| `password_hash` | VARCHAR(255) | NOT NULL | bcrypt hash |
| `display_name` | VARCHAR(100) | NOT NULL | User display name |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Account creation timestamp |
| `last_active_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Last debate or login |
| `preferences` | JSONB | DEFAULT '{}' | User preferences (e.g., { personas: 4, rounds: 3, language: "en" }) |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_last_active` on `last_active_at`

**Notes:** Users table is for v1.5. MVP has no auth — debates are anonymous.

### Table: `debates`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default gen_random_uuid() | Unique debate identifier |
| `user_id` | UUID | FK → users.id, NULLABLE | NULL for anonymous debates (MVP) |
| `question` | TEXT | NOT NULL | The user's original question |
| `status` | ENUM | NOT NULL, default 'pending' | One of: pending, in_progress, completed, failed |
| `num_personas` | SMALLINT | NOT NULL, default 4 | Number of personas in this debate |
| `num_rounds` | SMALLINT | NOT NULL, default 3 | Number of debate rounds |
| `language` | VARCHAR(10) | NOT NULL, default 'en' | Debate language |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Debate creation timestamp |
| `completed_at` | TIMESTAMPTZ | NULLABLE | When debate finished or failed |
| `duration_ms` | INTEGER | NULLABLE | Total debate duration in milliseconds |
| `client_ip` | INET | NULLABLE | For rate limiting (anonymized after 24h) |

**Indexes:**
- `idx_debates_user_id` on `user_id`
- `idx_debates_status` on `status`
- `idx_debates_created_at` on `created_at`

**Notes:**
- `status` determines whether the synthesis_result has been generated.
- `num_personas` could vary in future versions (2-5 personas).
- `duration_ms` is useful for performance monitoring.

### Table: `debate_rounds`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default gen_random_uuid() | Unique round identifier |
| `debate_id` | UUID | FK → debates.id, NOT NULL | Parent debate |
| `round_number` | SMALLINT | NOT NULL | Round number (1, 2, 3...) |
| `round_type` | ENUM | NOT NULL, default 'normal' | 'normal' or 'cross_reference' |
| `started_at` | TIMESTAMPTZ | NOT NULL, default NOW() | When this round started |
| `completed_at` | TIMESTAMPTZ | NULLABLE | When all personas finished this round |

**Unique constraint:** `(debate_id, round_number)`

**Indexes:**
- `idx_rounds_debate_id` on `debate_id`
- `idx_rounds_debate_round` on `(debate_id, round_number)`

### Table: `persona_statements`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default gen_random_uuid() | Unique statement identifier |
| `round_id` | UUID | FK → debate_rounds.id, NOT NULL | Parent round |
| `persona_id` | VARCHAR(20) | NOT NULL | One of: uday, kiran, mohan, priya |
| `persona_label` | VARCHAR(50) | NOT NULL | Display name (e.g., "Uday — The Optimist") |
| `statement` | TEXT | NOT NULL | Full text of the persona's statement |
| `tokens_used` | INTEGER | NULLABLE | Token count for cost tracking |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | When statement was generated |

**Indexes:**
- `idx_statements_round_id` on `round_id`
- `idx_statements_persona_id` on `persona_id`
- `idx_statements_round_persona` on `(round_id, persona_id)` — unique constraint

**Notes:**
- `persona_id` uses a fixed enum. When custom personas are added, this becomes a FK to a `personas` table.
- `persona_label` is denormalized for read performance (no JOIN needed when displaying a debate).

### Table: `synthesis_results`

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, default gen_random_uuid() | Unique result identifier |
| `debate_id` | UUID | FK → debates.id, NOT NULL, UNIQUE | One synthesis per debate |
| `options` | JSONB | NOT NULL | Array of 3 option objects (see below) |
| `raw_summary` | TEXT | NOT NULL | Full synthesis text |
| `model_used` | VARCHAR(50) | NOT NULL | e.g., "claude-3.5-sonnet-20240620" |
| `tokens_used` | INTEGER | NULLABLE | Token count for cost tracking |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Generation timestamp |

**Indexes:**
- `idx_synthesis_debate_id` on `debate_id` (unique)

**`options` JSONB structure:**

```json
[
  {
    "option": "Option A: Open within 2 months",
    "summary": "A high-risk, high-reward approach...",
    "upside": ["First-mover advantage in location", ...],
    "downside": ["Capital-intensive upfront", ...],
    "confidence": "medium",
    "action_steps": [
      "Step 1: Visit 3 potential locations this week",
      "Step 2: Draft lease agreement",
      "Step 3: Hire 2 staff"
    ],
    "championed_by": ["uday", "mohan"]
  },
  ...
]
```

### Future Tables (v2.0+)

#### `personas` (custom personas)
| Column | Type | Description |
|---|---|---|
| `id` | UUID PK | Unique persona identifier |
| `user_id` | UUID FK | Creator |
| `name` | VARCHAR(100) | Persona name |
| `role` | VARCHAR(100) | Role description |
| `system_prompt` | TEXT | Custom system prompt |
| `temperature` | FLOAT | LLM temperature override |
| `avatar_color` | VARCHAR(7) | Hex color |
| `is_public` | BOOLEAN | Shareable with community |

#### `decision_journal`
| Column | Type | Description |
|---|---|---|
| `id` | UUID PK | Unique entry |
| `user_id` | UUID FK | Owner |
| `debate_id` | UUID FK | Source debate |
| `chosen_option` | SMALLINT | Which option they picked (1-3) |
| `actual_outcome` | TEXT | What happened |
| `outcome_rating` | SMALLINT | 1-5 rating of accuracy |
| `notes` | TEXT | User notes |

---

## 7. API Contracts

### `POST /api/debate`

Create a new debate session. Returns immediately with a session_id.

**Request:**
```json
{
  "question": "Should I open a second store in Ghaziabad?",
  "language": "en",
  "num_rounds": 3
}
```

**Response (201 Created):**
```json
{
  "session_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "pending",
  "question": "Should I open a second store in Ghaziabad?",
  "personas": [
    { "id": "uday", "name": "Uday", "role": "The Optimist", "color": "#10B981" },
    { "id": "kiran", "name": "Kiran", "role": "The Skeptic", "color": "#EF4444" },
    { "id": "mohan", "name": "Mohan", "role": "The Operator", "color": "#3B82F6" },
    { "id": "priya", "name": "Priya", "role": "The Customer", "color": "#F59E0B" }
  ],
  "stream_url": "/api/debate/a1b2c3d4-e5f6-7890-abcd-ef1234567890/stream"
}
```

**Validation rules:**
- `question`: 10-500 characters
- `language`: Must be "en" for MVP
- `num_rounds`: 1-5 (default 3)

### `GET /api/debate/{session_id}/stream`

Opens an SSE stream for the debate.

**Headers:**
```
Accept: text/event-stream
Cache-Control: no-cache
```

**Response:** SSE stream (content-type: `text/event-stream`)

**Events:**
```
event: debate:start
data: {"session_id": "...", "total_rounds": 3}

event: persona:start
data: {"persona_id": "uday", "persona_name": "Uday", "round": 1}

event: persona:chunk
data: {"persona_id": "uday", "text": "I believe this is..."}

event: persona:done
data: {"persona_id": "uday", "full_text": "I believe this is a tremendous opportunity because...", "round": 1}

event: round:complete
data: {"round": 1, "next_round": 2}

event: synthesis:start
data: {}

event: synthesis:chunk
data: {"text": "After analyzing all perspectives..."}

event: synthesis:done
data: {"brief": {"options": [...]}}

event: debate:complete
data: {"session_id": "...", "duration_ms": 45200}
```

### `GET /api/debate/{session_id}`

Get the full debate result (for replay or share).

**Response (200 OK):**
```json
{
  "session_id": "...",
  "question": "...",
  "status": "completed",
  "personas": [...],
  "rounds": [
    {
      "round_number": 1,
      "statements": [
        { "persona_id": "uday", "text": "..." },
        { "persona_id": "kiran", "text": "..." }
      ]
    }
  ],
  "synthesis": {
    "options": [...],
    "raw_summary": "..."
  },
  "created_at": "2026-06-27T10:00:00Z",
  "duration_ms": 45200
}
```

### `GET /api/health`

**Response (200 OK):**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "uptime_seconds": 3600,
  "active_debates": 5
}
```

---

## 8. Environment Variables

### Backend (`.env`)

```bash
# ─── Required ──────────────────────────────────────────────

# LLM Provider
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
# Get from: https://console.anthropic.com/
# Used for: All persona generation + synthesis

# ─── Optional (but recommended) ────────────────────────────

# AgentField.ai (for +10 bonus points)
AGENTFIELD_API_KEY=af_xxxxxxxxxxxxx
AGENTFIELD_AGENT_ID=mirror-debate-orchestrator
# Get from: https://agentfield.ai/dashboard
# If not set, debates still work without AgentField tracking

# Application
APP_NAME=Mirror
APP_VERSION=0.1.0
DEBUG=false
LOG_LEVEL=info
# debug → verbose logging (use during development)
# info  → standard logging (use during hackathon)
# warn  → minimal logging (use if hitting rate limits)

# Server
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:5173,https://mirror-app.vercel.app
# Frontend URLs allowed to access the API
# Separate multiple origins with commas, no trailing slash

# Rate Limiting
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_SECONDS=60
# Max 10 debates per 60 seconds per IP
# Prevents abuse during demo/judging

# Session Store (in-memory)
SESSION_TTL_SECONDS=1800
# How long a completed debate session stays in memory
# 1800 = 30 minutes (more than enough for hackathon)

# LLM Configuration
PERSONA_MODEL=claude-3-haiku-20240307
SYNTHESIZER_MODEL=claude-3-5-sonnet-20240620
PERSONA_MAX_TOKENS=300
SYNTHESIZER_MAX_TOKENS=1000
LLM_TEMPERATURE=0.8
# Higher temperature = more creative/diverse persona responses
# Lower temperature = more conservative, factual

# Optional: Logging/Analytics
POSTHOG_API_KEY=phc_xxxxxxxx
# Optional: PostHog for product analytics
```

### Frontend (`.env.local`)

```bash
VITE_API_URL=http://localhost:8000
# Backend URL. In production: https://mirror-api.railway.app
# No other env vars needed — frontend is mostly static
```

### Environment Variable Hierarchy

```
Shell env > .env file > defaults in config.py
```

No secrets are hardcoded. The `.env` file is gitignored. A `.env.example` is committed with placeholder values.

---

## 9. Configuration Notes

### 9.1 CORS Configuration

The FastAPI backend must allow cross-origin requests from the frontend domain. For local development:

```python
# config.py
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
```

For production (Vercel + Railway):
- Frontend: `https://mirror-app.vercel.app`
- Backend: `https://mirror-api.railway.app`
- CORS must allow the Vercel domain

### 9.2 Vercel Configuration (`vercel.json`)

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://mirror-api.railway.app/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" }
      ]
    }
  ]
}
```

This proxies `/api/*` calls from the Vercel frontend to the Railway backend, avoiding CORS issues entirely in production.

### 9.3 Railway Configuration (`railway.json`)

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && pip install -r requirements.txt"
  },
  "deploy": {
    "startCommand": "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/api/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### 9.4 LLM Prompt Structure

Each persona has a **system prompt** stored in `backend/app/utils/prompts.py`. Structure:

```
You are {name}, {role}.

Personality: {personality description}

Values:
- {value_1}
- {value_2}

Rules:
- You must DISAGREE with at least one other persona.
- You must reference specific points from previous rounds.
- Keep each response under {max_tokens} tokens.
- Use plain language. No bullet points. No markdown.
- If this is round 3, present your final hardened position and recommend a clear course of action.

The question is: {question}
```

**Critical design rule:** Persona agents receive the full history of previous rounds in their context window. This enables cross-referencing.

### 9.5 Rate Limiting

The `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_SECONDS` environment variables control a simple in-memory rate limiter (token bucket or sliding window per IP). Implemented as a FastAPI middleware.

For hackathon: 10 debates/minute/IP is sufficient. Prevents demo abuse without blocking legitimate usage.

### 9.6 Session Expiry

In-memory sessions expire after `SESSION_TTL_SECONDS` (default 1800 seconds / 30 minutes). A background task runs every 60 seconds and purges expired sessions. This prevents memory leaks.

---

## 10. Deployment Strategy

### Hackathon Deployment (Fastest Path)

```
Frontend: Vercel (git push → auto-deploy)
  └── https://mirror-app.vercel.app

Backend: Railway (git push → auto-deploy)
  └── https://mirror-api.railway.app

Domain: Use Vercel's default subdomain. No custom domain needed.
```

### Step-by-Step Deployment

1. **Push to GitHub** (required for submission)
2. **Backend (Railway):**
   - Create new project → Deploy from GitHub repo
   - Set root directory to `backend/`
   - Add `ANTHROPIC_API_KEY` and `AGENTFIELD_API_KEY` to Railway environment variables
   - Railway auto-detects `railway.json` for build/deploy config
   - Get URL: `https://mirror-api.up.railway.app`
3. **Frontend (Vercel):**
   - Import GitHub repo
   - Set root directory to `frontend/`
   - Add `VITE_API_URL=https://mirror-api.up.railway.app` to env vars
   - Vercel auto-detects Vite
   - Deploy. Get URL: `https://mirror-app.vercel.app`
4. **Update CORS** on Railway to include the Vercel URL
5. **Test end-to-end** — submit question, watch debate stream

### Infrastructure Cost

| Service | Cost | Notes |
|---|---|---|
| Vercel (Hobby) | Free | 100GB bandwidth, SSL, custom domains |
| Railway (Starter) | Free | $5 credit, no credit card required initially |
| Anthropic API | ~$0.10/debate | Haiku: $0.25/1M in, $1.25/1M out. Sonnet: $3/1M in, $15/1M out. A full debate is ~2-3K tokens. |
| AgentField.ai | Free | No cost for hackathon usage |
| **Total per debate** | **~$0.03** | Cheap enough for 100+ demo runs |

---

## 11. Performance Considerations

### 11.1 SSE Streaming Performance

The primary performance risk is **LLM latency**. A single persona response can take 1-3 seconds. With 4 personas × 3 rounds = 12 sequential calls + 1 synthesis call = 13 LLM calls per debate.

**Mitigations:**

| Technique | Impact | Implementation |
|---|---|---|
| Use Haiku for personas | 2-4x faster than Sonnet | `PERSONA_MODEL=claude-3-haiku-20240307` |
| Stream LLM response to SSE immediately | Perceived latency drops to <500ms | Forward each chunk from LLM stream directly to SSE event |
| Persona calls are sequential (not parallel) per round | Required for cross-referencing | Do NOT parallelize. Order matters. |
| Cache persona prompts | Reduces prompt processing | Pre-compile system prompts as constants |
| Low max_tokens per persona | 300 tokens = ~1-2 second response | `PERSONA_MAX_TOKENS=300` |

### 11.2 Memory

Each in-memory debate session stores:
- Question: ~0.5 KB
- 12 persona statements: ~12 × 1 KB = ~12 KB
- Synthesis result: ~3 KB
- Metadata: ~1 KB
- **Total: ~17 KB per debate**

At `SESSION_TTL_SECONDS=1800` with rate limit of 10/min:
- Max concurrent debates: ~300 (10/min × 30 min TTL)
- Max memory: ~300 × 17 KB = ~5.1 MB

**Conclusion:** Memory is not a concern for hackathon scale.

### 11.3 Concurrency

FastAPI + Uvicorn with async workers handles the concurrent SSE connections. Each SSE connection holds an open HTTP connection but no thread. Uvicorn's event loop can handle thousands of concurrent idle connections.

**Note:** Use a single Uvicorn worker for hackathon. Multiple workers would require an external session store (Redis). Not needed at this scale.

### 11.4 LLM Rate Limits

Anthropic's API rate limits for free/tier-1 accounts are typically:
- 5 requests per second for Haiku
- 2 requests per second for Sonnet

With 12 persona calls per debate, the bottleneck is not rate limits but sequential dependency. Stay under 1 debate/second per API key.

---

## 12. Security Notes

### 12.1 API Key Protection

- `ANTHROPIC_API_KEY` is set as a Railway environment variable, never committed to git.
- The `AGENTFIELD_API_KEY` follows the same pattern.
- Frontend never receives or stores API keys — all LLM calls happen server-side.

### 12.2 Input Sanitization

- Question input is limited to 500 characters.
- Strip HTML tags and control characters from user input.
- Rate-limited per IP (not per user — no auth in MVP).

### 12.3 SSE Connection Handling

- SSE connections time out after 120 seconds (debate max duration).
- Client disconnect is detected via `request.is_disconnected()` in FastAPI.
- If client disconnects mid-debate, the background task is cancelled to save LLM costs.

### 12.4 CORS

- In production, CORS origins are restricted to the Vercel deployment URL.
- No wildcard `*` in production.

### 12.5 No User Data

- MVP stores no PII.
- Client IP is stored only for rate limiting and anonymized after 24 hours.
- No cookies, no local storage beyond debate state.

---

## 13. AgentField.ai Integration Details

### Integration Point

Each persona is registered as an **AgentField agent**. The orchestrator is the **parent agent** that coordinates them.

```python
# backend/app/services/agentfield_service.py

class AgentFieldService:
    """Wraps debate agents for AgentField.ai tracking."""

    def register_persona_agent(self, persona_id: str, question: str) -> str:
        """Register a persona agent and return its run ID."""
        payload = {
            "agent_id": f"mirror-persona-{persona_id}",
            "input": {
                "persona": persona_id,
                "question": question,
                "history": []
            }
        }
        response = httpx.post(
            f"{AGENTFIELD_API_URL}/runs",
            headers={"Authorization": f"Bearer {AGENTFIELD_API_KEY}"},
            json=payload
        )
        return response.json()["run_id"]

    def record_statement(self, run_id: str, statement: str, round: int):
        """Log a persona's statement to AgentField."""
        httpx.post(
            f"{AGENTFIELD_API_URL}/runs/{run_id}/events",
            headers={"Authorization": f"Bearer {AGENTFIELD_API_KEY}"},
            json={
                "event": "statement",
                "data": {
                    "round": round,
                    "statement": statement
                }
            }
        )
```

### AgentField Dashboard Shows

- Each persona agent's lifecycle (created, running, completed)
- Latency per persona call
- Full debate history per agent
- Orchestrator agent coordinating sub-agents

This counts toward the **"Depth of AgentField.ai Integration"** judging criterion.

---

## 14. Local Development Quick Start

```bash
# 1. Clone repo
git clone <repo-url>
cd mirror

# 2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env: add ANTHROPIC_API_KEY
uvicorn app.main:app --reload --port 8000

# 3. Frontend setup (new terminal)
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local: VITE_API_URL=http://localhost:8000
npm run dev

# 4. Open http://localhost:5173
# Type a question. Watch the debate.
```

### Requirements.txt

```
fastapi==0.111.0
uvicorn[standard]==0.29.0
httpx==0.27.0
pydantic==2.7.0
pydantic-settings==2.3.0
python-dotenv==1.0.1
python-multipart==0.0.9
```

### package.json (key dependencies)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "vite": "^5.3.0"
  }
}
```

---

*This architecture document is designed for immediate execution in an 8-hour hackathon sprint. Every decision optimizes for the intersection of speed, demo quality, and judging criteria. The schema and structure are forward-compatible with v1.5+ features like auth, persistence, and custom personas.*
