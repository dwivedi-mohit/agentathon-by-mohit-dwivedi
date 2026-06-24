import time
from fastapi import APIRouter
from ..config import settings
from ..store.session_store import session_store
from ..models.schemas import HealthResponse

router = APIRouter()
_start_time = time.time()


@router.get("/api/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        uptime_seconds=int(time.time() - _start_time),
        active_debates=session_store.active_count,
    )
