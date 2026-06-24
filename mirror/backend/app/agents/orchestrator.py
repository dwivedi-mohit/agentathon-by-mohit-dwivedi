import asyncio
import time
import logging
from ..models.debate import DebateRound
from ..store.session_store import session_store
from ..utils.streaming import format_sse
from .persona_agent import generate_persona_response
from .synthesizer import generate_synthesis

logger = logging.getLogger(__name__)

PERSONA_ORDER = ["uday", "kiran", "mohan", "priya"]


async def _noop(*args, **kwargs):
    pass


async def run_debate(session_id: str, request):
    session = session_store.get(session_id)
    if not session:
        return

    session.status = "debating"
    start_time = time.time()
    debate_history = []

    try:
        for round_num in range(1, session.num_rounds + 1):
            if await request.is_disconnected():
                session_store.mark_cancelled(session_id)
                return

            debate_round = DebateRound(round_number=round_num)
            round_history = []

            for persona_id in PERSONA_ORDER:
                if await request.is_disconnected():
                    session_store.mark_cancelled(session_id)
                    return

                yield format_sse("persona:start", {
                    "persona_id": persona_id,
                    "round": round_num,
                })

                full_text = await generate_persona_response(
                    persona_id=persona_id,
                    question=session.question,
                    history=debate_history,
                    round_num=round_num,
                    total_rounds=session.num_rounds,
                    emit_chunk=_noop,
                )

                yield format_sse("persona:chunk", {
                    "persona_id": persona_id,
                    "text": full_text,
                    "round": round_num,
                })

                yield format_sse("persona:done", {
                    "persona_id": persona_id,
                    "full_text": full_text,
                    "round": round_num,
                })

                debate_round.add_statement(persona_id, full_text)
                round_history.append(full_text)
                debate_history.append(f"{persona_id}: {full_text}")

            session.rounds.append(debate_round)
            yield format_sse("round:complete", {
                "round": round_num,
                "next_round": round_num + 1 if round_num < session.num_rounds else None,
            })

        yield format_sse("synthesis:start", {})

        synthesis = await generate_synthesis(
            session.question, debate_history, _noop
        )
        session.synthesis = synthesis

        yield format_sse("synthesis:done", {
            "brief": synthesis.model_dump(),
        })

        session.status = "completed"
        session.completed_at = time.time()
        session.duration_ms = int((session.completed_at - start_time) * 1000)

        yield format_sse("debate:complete", {
            "session_id": session_id,
            "duration_ms": session.duration_ms,
        })

    except Exception as e:
        logger.error(f"Debate error: {e}")
        session.status = "failed"
        yield format_sse("error", {"message": "An unexpected error occurred during the debate."})
