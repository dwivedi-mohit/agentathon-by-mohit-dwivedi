from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from ..models.schemas import DebateRequest, DebateResponse, PersonaInfo
from ..models.persona import PERSONAS
from ..models.debate import DebateSession
from ..store.session_store import session_store
from ..agents.orchestrator import run_debate

router = APIRouter()


@router.post("/api/debate", response_model=DebateResponse)
async def create_debate(body: DebateRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"

    session = DebateSession(question=body.question, num_rounds=body.num_rounds)
    session_store.create(session)

    return DebateResponse(
        session_id=session.session_id,
        status=session.status,
        question=session.question,
        personas=[PersonaInfo(**p.model_dump()) for p in PERSONAS],
        stream_url=f"/api/debate/{session.session_id}/stream",
    )


@router.get("/api/debate/{session_id}/stream")
async def stream_debate(session_id: str, request: Request):
    session = session_store.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Debate session not found or expired")

    async def event_stream():
        async for event in run_debate(session_id, request):
            yield event

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/api/debate/{session_id}")
async def get_debate_result(session_id: str):
    session = session_store.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Debate session not found or expired")
    return session.to_result()
