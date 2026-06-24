import json
import httpx
import asyncio
import logging
from ..config import settings
from ..utils.prompts import PERSONA_SYSTEM_PROMPTS, SYNTHESIZER_SYSTEM_PROMPT

logger = logging.getLogger(__name__)

GROQ_API_BASE = "https://api.groq.com/openai/v1/chat/completions"


class LLMService:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.persona_model = settings.PERSONA_MODEL
        self.synthesizer_model = settings.SYNTHESIZER_MODEL
        self.client = httpx.AsyncClient(timeout=60.0)
        self.use_mock = not self.api_key

    async def _stream_groq(self, model: str, system_prompt: str, messages: list, max_tokens: int):
        body = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                *messages,
            ],
            "max_tokens": max_tokens,
            "temperature": settings.LLM_TEMPERATURE,
            "stream": True,
        }

        async with self.client.stream(
            "POST",
            GROQ_API_BASE,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            json=body,
        ) as stream:
            async for line in stream.aiter_lines():
                if not line.startswith("data: "):
                    continue
                payload = line[6:]
                if payload.strip() == "[DONE]":
                    return
                try:
                    data = json.loads(payload)
                    delta = data.get("choices", [{}])[0].get("delta", {})
                    content = delta.get("content", "")
                    if content:
                        yield content
                except json.JSONDecodeError:
                    continue

    async def generate_persona_response(
        self, persona_id: str, question: str, history: list, round_num: int, total_rounds: int
    ):
        if self.use_mock:
            mock = self._mock_persona_response(persona_id, question, round_num, total_rounds)
            for chunk in mock:
                yield chunk
                await asyncio.sleep(0.02)
            return

        system_prompt = PERSONA_SYSTEM_PROMPTS[persona_id]
        round_instruction = f"This is Round {round_num} of {total_rounds}."
        if round_num == 3:
            round_instruction += " Present your final hardened position."

        messages = [{"role": "user", "content": f"Question: {question}"}]
        for h in history:
            messages.append({"role": "assistant", "content": h})

        try:
            async for chunk in self._stream_groq(
                self.persona_model,
                f"{system_prompt}\n\n{round_instruction}",
                messages,
                settings.PERSONA_MAX_TOKENS,
            ):
                yield chunk
        except Exception as e:
            logger.error(f"LLM error for {persona_id}: {e}")
            yield f"[{persona_id} could not respond due to a technical issue.]"

    async def generate_synthesis(self, question: str, history: list):
        if self.use_mock:
            for chunk in self._mock_synthesis(question):
                yield chunk
            return

        messages = [{"role": "user", "content": f"Question: {question}"}]
        for h in history:
            messages.append({"role": "assistant", "content": h})

        try:
            async for chunk in self._stream_groq(
                self.synthesizer_model,
                SYNTHESIZER_SYSTEM_PROMPT,
                messages,
                settings.SYNTHESIZER_MAX_TOKENS,
            ):
                yield chunk
        except Exception as e:
            logger.error(f"Synthesis error: {e}")
            yield json.dumps({
                "options": [
                    {
                        "option": "Unable to generate options",
                        "summary": "The synthesis could not be completed.",
                        "upside": [],
                        "downside": [],
                        "confidence": "low",
                        "action_steps": ["Try asking a different question"],
                        "championed_by": [],
                    }
                ],
                "raw_summary": "The decision synthesis could not be completed due to a technical issue.",
            })

    def _mock_persona_response(self, persona_id: str, question: str, round_num: int, total_rounds: int):
        responses = {
            "uday": [
                "I see a massive opportunity here. The timing is perfect — early movers capture disproportionate market share. ",
                "Of course there are risks, but every successful business took calculated risks. The question isn't whether there are challenges — it's whether the upside justifies them. In this case, I believe it does. ",
                "Let me be direct: do it. Not next quarter, not next year. Start now, iterate fast, and capture the market before someone else does. The data supports first-mover advantage in this space.",
            ],
            "kiran": [
                "I have concerns. The risks here are significant and I'm not convinced the upside justifies them. Let me break down why. ",
                "Uday, you're ignoring the failure rate. 90% of new initiatives fail within 18 months. The optimists always focus on the 10% that succeed. I focus on the 90% that don't. Let's talk about what kills those 90%. ",
                "My final position: proceed with extreme caution. The downside scenarios are real and potentially existential. If you must move forward, cap your exposure and have a clear exit plan.",
            ],
            "mohan": [
                "Let's talk about execution. I've run businesses for 20 years, and the gap between an idea and daily operations kills more businesses than competition ever will. ",
                "Practically speaking, here's what this looks like on the ground: you need reliable supply chains, trained staff, working capital for 3-6 months of operations, and systems that don't require you to be present 16 hours a day. ",
                "My recommendation: pilot first. Test the operations with a minimal version. Prove you can execute before you scale. A successful pilot tells you more than any debate ever could.",
            ],
            "priya": [
                "I'm the customer. I don't care about your business model or your vision. I care about whether this solves my problem conveniently and at a fair price. ",
                "Looking at this from my perspective as a customer: you're asking me to change my behavior. Why would I? What's in it for me? If the answer is just 'it's better,' that's not enough. I need to know WHY it's worth my time and money. ",
                "From my perspective, the best option is the one that makes my life easier with the least friction. If you can deliver that, I'll try it. If not, I'll stick with what I know, even if it's imperfect.",
            ],
        }
        text = responses.get(persona_id, ["I have thoughts on this."])[
            min(round_num - 1, len(responses[persona_id]) - 1)
        ]
        for char in text:
            yield char

    def _mock_synthesis(self, question: str):
        result = {
            "options": [
                {
                    "option": "Move Forward Immediately",
                    "summary": "Capture the opportunity now with a focused, well-funded launch.",
                    "upside": ["First-mover advantage in an underserved market", "Potential for rapid market share capture", "Momentum builds on itself"],
                    "downside": ["Higher upfront investment and risk", "Limited time for planning and preparation", "Execution challenges with compressed timeline"],
                    "confidence": "medium",
                    "action_steps": ["Secure funding for 6 months of operations", "Identify and visit 3 potential locations", "Hire a core team of 2-3 people", "Set up basic operational systems", "Launch with a minimum viable offering"],
                    "championed_by": ["uday"],
                },
                {
                    "option": "Pilot First, Then Scale",
                    "summary": "Test the concept with a minimal investment before committing fully.",
                    "upside": ["Lower financial risk", "Real-world validation before scaling", "Opportunity to refine based on feedback"],
                    "downside": ["Slower path to full market capture", "Potential competitors may move first", "Pilot may not represent full-scale dynamics"],
                    "confidence": "high",
                    "action_steps": ["Define success metrics for the pilot", "Set up a minimal version of the offering", "Run pilot for 4-6 weeks", "Collect and analyze feedback", "Make go/no-go decision based on data"],
                    "championed_by": ["mohan", "kiran"],
                },
                {
                    "option": "Wait and Prepare",
                    "summary": "Take time to research, plan, and build resources before entering.",
                    "upside": ["Thorough preparation reduces execution risk", "Build stronger financial position", "Learn from early market entrants' mistakes"],
                    "downside": ["Risk of losing first-mover advantage", "Market may evolve in unexpected directions", "Momentum and urgency may dissipate"],
                    "confidence": "low",
                    "action_steps": ["Conduct detailed market research for 2-3 months", "Build financial runway and reserves", "Develop a comprehensive operational plan", "Monitor competitors and market conditions", "Set a specific deadline for the go decision"],
                    "championed_by": ["priya"],
                },
            ],
            "raw_summary": "After debating all perspectives, three clear paths emerged. Uday advocates for immediate action to capture first-mover advantage. Kiran and Mohan recommend a pilot approach to validate before scaling. Priya suggests waiting to ensure the offering truly meets customer needs. The strongest consensus is around the pilot approach, which balances opportunity with prudent risk management.",
        }
        yield json.dumps(result)


llm_service = LLMService()
