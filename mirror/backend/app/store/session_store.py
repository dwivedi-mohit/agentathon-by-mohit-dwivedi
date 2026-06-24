import time
import threading
from ..models.debate import DebateSession


class SessionStore:
    def __init__(self, ttl_seconds: int = 1800):
        self._sessions: dict[str, DebateSession] = {}
        self._ttl = ttl_seconds
        self._lock = threading.Lock()
        self._start_cleanup_thread()

    def create(self, session: DebateSession) -> DebateSession:
        with self._lock:
            self._sessions[session.session_id] = session
        return session

    def get(self, session_id: str) -> DebateSession | None:
        with self._lock:
            session = self._sessions.get(session_id)
            if session:
                if time.time() - session.created_at > self._ttl:
                    del self._sessions[session_id]
                    return None
            return session

    def mark_cancelled(self, session_id: str):
        with self._lock:
            if session_id in self._sessions:
                self._sessions[session_id].status = "cancelled"

    @property
    def active_count(self) -> int:
        with self._lock:
            now = time.time()
            return sum(
                1
                for s in self._sessions.values()
                if s.status in ("pending", "debating") and now - s.created_at < self._ttl
            )

    def _cleanup(self):
        while True:
            time.sleep(60)
            with self._lock:
                now = time.time()
                expired = [
                    sid
                    for sid, s in self._sessions.items()
                    if now - s.created_at > self._ttl
                ]
                for sid in expired:
                    del self._sessions[sid]

    def _start_cleanup_thread(self):
        t = threading.Thread(target=self._cleanup, daemon=True)
        t.start()


session_store = SessionStore()
