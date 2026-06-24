from pydantic import BaseModel, Field, field_validator
import re


class DebateRequest(BaseModel):
    question: str = Field(..., min_length=10, max_length=500)
    language: str = Field(default="en", pattern="^(en)$")
    num_rounds: int = Field(default=3, ge=1, le=5)

    @field_validator("question")
    @classmethod
    def sanitize_question(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Question cannot be empty")
        if len(re.sub(r"\s", "", v)) < 3:
            raise ValueError("Question must contain meaningful text")
        return v


class PersonaInfo(BaseModel):
    id: str
    name: str
    role: str
    color: str
    description: str
    icon_shape: str = ""


class DebateResponse(BaseModel):
    session_id: str
    status: str
    question: str
    personas: list[PersonaInfo]
    stream_url: str


class OptionBrief(BaseModel):
    option: str
    summary: str
    upside: list[str]
    downside: list[str]
    confidence: str
    action_steps: list[str]
    championed_by: list[str]


class SynthesisBrief(BaseModel):
    options: list[OptionBrief]
    raw_summary: str


class DebateResult(BaseModel):
    session_id: str
    question: str
    status: str
    personas: list[PersonaInfo]
    rounds: list[dict]
    synthesis: SynthesisBrief | None = None
    created_at: str
    duration_ms: int | None = None


class HealthResponse(BaseModel):
    status: str
    version: str
    uptime_seconds: int
    active_debates: int
