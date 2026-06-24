import time
import uuid
from .schemas import SynthesisBrief, PersonaInfo
from .persona import PERSONAS


class Statement:
    def __init__(self, persona_id: str, text: str, round_num: int):
        self.persona_id = persona_id
        self.text = text
        self.round_num = round_num


class DebateRound:
    def __init__(self, round_number: int):
        self.round_number = round_number
        self.statements: list[Statement] = []

    def add_statement(self, persona_id: str, text: str):
        self.statements.append(Statement(persona_id, text, self.round_number))

    def to_dict(self):
        return {
            "round_number": self.round_number,
            "statements": [
                {"persona_id": s.persona_id, "text": s.text}
                for s in self.statements
            ],
        }


class DebateSession:
    def __init__(self, question: str, num_rounds: int = 3):
        self.session_id = str(uuid.uuid4())
        self.question = question
        self.num_rounds = num_rounds
        self.status = "pending"
        self.rounds: list[DebateRound] = []
        self.synthesis: SynthesisBrief | None = None
        self.created_at = time.time()
        self.completed_at: float | None = None
        self.duration_ms: int | None = None
        self.personas = [PersonaInfo(**p.model_dump()).model_dump() for p in PERSONAS]

    def to_result(self):
        return {
            "session_id": self.session_id,
            "question": self.question,
            "status": self.status,
            "personas": self.personas,
            "rounds": [r.to_dict() for r in self.rounds],
            "synthesis": self.synthesis.model_dump() if self.synthesis else None,
            "created_at": time.strftime(
                "%Y-%m-%dT%H:%M:%SZ", time.gmtime(self.created_at)
            ),
            "duration_ms": self.duration_ms,
        }
