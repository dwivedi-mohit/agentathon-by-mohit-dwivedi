# Product Requirements Document: Mirror

**Status:** v0.1 — Pre-MVP
**Author:** Senior PM, Early-Stage
**Date:** June 2026
**Event:** Agent{A}thon 2026

---

## 1. Elevator Pitch

Mirror is a decision-making app that doesn't tell you the answer. You ask a business question. Mirror spawns 4 AI personas with conflicting viewpoints who debate your question in real time. A synthesizer agent then distills their argument into a structured brief with 3 actionable options. You decide.

---

## 2. Problem Statement

Every AI tool today is an answer machine — it gives you one confident answer, often wrong, always overconfident. For early-stage founders and SMB owners making high-stakes decisions (hiring, pricing, expansion, product), a single AI answer is dangerous. What they need is structured disagreement — the ability to see a problem from multiple perspectives before committing.

The cost of a bad decision for a bootstrapped founder is existential. Current tools optimize for speed of answer, not quality of decision.

**Root cause:** The hindsight bias in LLMs is well-documented — models cannot easily argue against their own prior output. Mirror externalizes the debate into separate agents, forcing genuine perspective diversity.

---

## 3. Target Audience

### Primary: The Solo Founder
- **Raj**, 28, founder of a 3-person fintech startup
- No co-founder to argue with. Makes decisions alone, second-guesses everything.
- Uses ChatGPT daily but does not trust it for strategic decisions.
- Mirror gives him structured debate without needing a co-founder.

### Secondary: The SMB Owner
- **Meera**, 42, owns a wholesale distribution business, 15 employees
- No time to research decisions. Her network gives biased advice.
- Prefers WhatsApp over any app. Needs Hindi support eventually.
- A 2-minute debate gives her a decision brief she can act on in 30 seconds.

### Tertiary: The Student / First-time Founder
- **Arjun**, 21, building his first startup
- No framework for evaluating decisions. Optimism bias.
- Has time but lacks experience.
- Gains simulated experience through persona agents.

---

## 4. Core Features

Legend: **[M]** = Must-have (MVP) | **[N]** = Nice-to-have (Post-MVP)

### 4.1 Question Intake

| Feature | Pri | Description |
|---|---|---|
| Text input for business question | [M] | Free-text field, 500 char limit, with example prompts |
| Structured question template | [N] | Guided form: "I want to decide between [A] and [B]" |
| Voice input | [N] | Hindi + English speech-to-text |
| Question history | [N] | Saved debates, searchable |

### 4.2 Persona System

| Feature | Pri | Description |
|---|---|---|
| 4 fixed personas (Uday, Kiran, Mohan, Priya) | [M] | Distinct names, biographies, visual avatars, prompt personas |
| Persona intro cards | [M] | Each persona has a small bio card shown before debate starts |
| Custom personas | [N] | User defines name, role, personality |
| Number of personas selector | [N] | 2, 3, or 4 agents per debate |
| Persona temperature control | [N] | Slider for "how extreme" each persona is |

### 4.3 Debate Engine

| Feature | Pri | Description |
|---|---|---|
| Turn-based debate (3 rounds) | [M] | Each persona speaks once per round, 100-200 words per turn |
| Real-time streaming output | [M] | Text streams into UI via SSE |
| Cross-referencing between personas | [M] | Persona B can reference Persona A's argument |
| Unlimited debate rounds | [N] | Continue until user stops it |
| Interrupt / interject | [N] | User jumps in mid-debate with additional context |
| "Call bullshit" button | [N] | User flags weak argument, persona must defend or concede |
| Hindi debate support | [N] | Switch language mid-stream |

### 4.4 Synthesizer

| Feature | Pri | Description |
|---|---|---|
| Structured brief output | [M] | 3 options with upside, downside, confidence, recommendation |
| Option comparison table | [M] | Side-by-side view of tradeoffs |
| Actionable next steps | [M] | "If you choose Option A, here is your 3-step action plan" |
| Decision timeline | [N] | 90-day projection per option |
| Export to PDF / WhatsApp | [N] | Share brief with co-founder or mentor |

### 4.5 User System

| Feature | Pri | Description |
|---|---|---|
| Anonymous usage (no signup) | [M] | Enter question, get debate, no account needed |
| Save debates to account | [N] | Optional email/password or Google OAuth |
| Decision journal | [N] | Track past decisions and their outcomes |

### 4.6 AgentField.ai Integration

| Feature | Pri | Description |
|---|---|---|
| AgentField orchestration layer | [M] | Debate engine runs on AgentField.ai |
| Expose via AgentField dashboard | [N] | Show agent health, latency, usage |

---

## 5. User Flow (Happy Path)

1. **Landing page** — One input field. Placeholder: *"Should I open a second store in Ghaziabad?"*
2. **User types question** and hits Enter
3. **Persona intro screen** — 4 cards slide in with names, one-line bio, personality badge
4. **Debate Round 1** — Cards animate one at a time. Text streams in. ~10 seconds per persona.
5. **Round 2** — Personas respond to each other: "Uday, you are ignoring..."
6. **Round 3** — Final positions hardened. Higher confidence.
7. **Synthesizer card** — 3 options with checkmarks
8. **Action screen** — "Option A: Open within 2 months. Here is your 5-step plan."
9. **User can** — Re-run with modified question, share, or start a new debate.

**Total time:** ~90 seconds for a full debate.

---

## 6. MVP Definition (v1.0 — Hackathon Ship)

### In scope (build these, nothing else):
- Text-only input
- 4 fixed personas with avatar cards
- 3 debate rounds, turn-based
- SSE streaming output
- Synthesizer brief with 3 options + action items
- No login required
- Responsive web (mobile-first)
- AgentField.ai orchestration

### Explicitly excluded from MVP:
- Voice input / output
- User accounts
- Custom personas
- Unlimited rounds
- Decision journal
- Hindi support
- Export / Share
- Interrupt feature
- Any post-debate analytics

### Why this MVP:
The hackathon is 8 hours. The debate engine + streaming UI is the core differentiator. Everything else is polish that cannot win the Technical Implementation or Innovation categories. The MVP demonstrates the novel mechanic.

---

## 7. Success Metrics

### For Hackathon Judging

| Metric | Target | Rationale |
|---|---|---|
| Debate coherence | 4/5 judge rating on demo | The agents must actually argue |
| Demo flow | Under 60 seconds | Judges have short attention |
| Streaming performance | < 500ms first token | Feels alive, not like a chatbot |
| Uniqueness | No other team does anything similar | Innovation (25) |

### For Product (Post-Hackathon)

| Metric | Target | Signal |
|---|---|---|
| Debates started per user | 3+ in first session | Retention signal |
| Synthesis read rate | 80%+ of users click it | Did they get value? |
| Share rate | 15%+ | Viral loop potential |
| Return rate (7-day) | 25%+ | Habit potential |
| "Decision made" click | 40%+ | Did they act? |

---

## 8. Deliberate Non-Builds (v1)

### 8.1 User Authentication
- Every second a user spends signing up is a second they could experience the core mechanic.
- **When:** v1.5, after validating retention without accounts.

### 8.2 Custom Personas
- The 4 fixed personas are a design choice — fundamental perspectives (optimism, skepticism, operations, customer). Custom personas add infinite complexity with unclear marginal value.
- **When:** v2.0, once we understand what users actually want.

### 8.3 Hindi / Multilingual
- Massive engineering effort. Hindi LLM prompting is harder. Judge panel will be English-first.
- **When:** v2.0 — India scale.

### 8.4 Voice
- STT + TTS pipeline adds latency, cost, failure modes. Text is faster, cheaper, more reliable.
- **When:** v1.5 as optional mode.

### 8.5 Unlimited Debate Rounds
- 3 rounds force concision — a design constraint, not a limitation.
- **When:** Never in default mode. Possible expert-mode toggle.

### 8.6 History / Journal
- Persistence requires backend + database. No database in MVP. LocalStorage adds complexity.
- **When:** v1.5 with user accounts.

### 8.7 Post-Question Analytics / Trends
- Requires aggregation across users, which requires accounts and privacy decisions.
- **When:** v3.0 if scale warrants.

---

## 9. Technical Stack Recommendation

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | React + Tailwind | Fast dev, rich animation via Framer Motion |
| Backend | Python FastAPI | Great SSE support, easy LLM integration |
| Orchestration | AgentField.ai | +10 bonus points, debuggable |
| LLM | Claude Haiku (personas) + Claude Sonnet (synthesizer) | Haiku fast for streaming; Sonnet for synthesis |
| Deployment | Vercel (frontend) + Railway (backend) | Free tier, quick deploy |
| State | In-memory debate state | MVP does not need persistence |

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Personas agree with each other | Medium | High | Force system prompts to disagree. Add adversarial instruction. |
| LLM latency > 2s per turn | High | Medium | Use smaller model (Haiku), stream immediately, show typing indicator |
| AgentField.ai API fails during event | Low | High | Fallback: direct API calls. Do not hard-block on AgentField. |
| Judges do not understand mechanic in 30s | Medium | High | Demo script shows all 4 personas + synthesis in first 20 seconds |
| Debate content is boring | Medium | Critical | Pre-craft demo question with naturally controversial tradeoffs |
| Cannot finish in 8 hours | Medium | Critical | Pre-build persona prompts, frontend boilerplate, deployment config before event |

---

## 11. Hackathon Point Maximization

| Category | Max | How Mirror Captures It |
|---|---|---|
| Innovation & Creativity | 25 | No other team does multi-agent structured disagreement. Novel mechanic. |
| Technical Implementation | 25 | SSE streaming, multi-agent orchestration, persona prompt engineering |
| Problem Solving & Impact | 20 | Real problem (solo founders cannot make decisions) with a real mechanism |
| Product Design & UX | 15 | Turn-based cards, streaming text, synthesis brief |
| Scalability & Feasibility | 10 | Zero user state, stateless API, cheap per-debate cost |
| Presentation & Demo | 5 | 45-second demo that is inherently dramatic (agents arguing) |
| AgentField.ai Integration | 10 | Use AgentField as the orchestrator |
| Community Builder | 10 | LinkedIn post: "building an AI that argues with itself" |

**Projected total: 95–105 / 120**

---

## 12. Persona Definitions

### Uday — The Optimist
- **Personality:** Sees potential everywhere. Every constraint is an opportunity.
- **Stress:** Revenue upside, expansion, speed, market gap.
- **Tagline:** "There is never a perfect time. Start now."

### Kiran — The Skeptic
- **Personality:** Finds what breaks. Has seen 100 startups fail.
- **Stress:** Cash burn, hidden costs, execution risk, competition.
- **Tagline:** "Hope is not a strategy."

### Mohan — The Operator
- **Personality:** Run businesses for 20 years. Cares about logistics.
- **Stress:** Staffing, supply chain, permits, daily ops, timelines.
- **Tagline:** "The idea is easy. The execution is everything."

### Priya — The Customer
- **Personality:** The end-user. Does not care about the business — cares about value.
- **Stress:** Price sensitivity, convenience, switching cost, trust.
- **Tagline:** "I do not care about your vision. I care about what I get."

---

## 13. Open Questions (Tracked for Decision)

| Question | Decision | Status |
|---|---|---|
| Brand name: Mirror vs Panchayat vs Samvaad vs Bahas vs Divergence | TBD | ⏳ Pending |
| Track: Open Innovation vs Track 3 (Paytm) | TBD | ⏳ Pending |
| Team size and skill distribution | TBD | ⏳ Pending |
| Pre-existing assets to reuse | TBD | ⏳ Pending |
| Demo question for judges | TBD | ⏳ Pending |

---

*This PRD is a living document. All decisions above are validated against the 8-hour hackathon constraint and the Agent{A}thon 2026 judging rubric.*
