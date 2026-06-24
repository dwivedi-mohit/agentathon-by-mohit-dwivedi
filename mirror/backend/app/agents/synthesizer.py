import json
import logging
from ..services.llm_service import llm_service
from ..models.schemas import SynthesisBrief, OptionBrief

logger = logging.getLogger(__name__)


async def generate_synthesis(question: str, debate_history: list, emit_chunk):
    full_text = ""
    async for chunk in llm_service.generate_synthesis(question, debate_history):
        full_text += chunk
        await emit_chunk(chunk)

    try:
        data = json.loads(full_text)
        options = [OptionBrief(**opt) for opt in data.get("options", [])]
        return SynthesisBrief(
            options=options,
            raw_summary=data.get("raw_summary", ""),
        )
    except (json.JSONDecodeError, Exception) as e:
        logger.error(f"Failed to parse synthesis: {e}")
        return SynthesisBrief(
            options=[
                OptionBrief(
                    option="Synthesis Error",
                    summary="Could not parse the synthesis result.",
                    upside=[],
                    downside=[],
                    confidence="low",
                    action_steps=["Please try again"],
                    championed_by=[],
                )
            ],
            raw_summary="The synthesis could not be parsed.",
        )
