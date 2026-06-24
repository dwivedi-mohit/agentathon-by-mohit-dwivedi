import asyncio
from ..services.llm_service import llm_service


async def generate_persona_response(
    persona_id: str,
    question: str,
    history: list,
    round_num: int,
    total_rounds: int,
    emit_chunk,
):
    full_text = ""
    async for chunk in llm_service.generate_persona_response(
        persona_id, question, history, round_num, total_rounds
    ):
        full_text += chunk
        await emit_chunk(persona_id, chunk)
    return full_text
