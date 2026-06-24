from pydantic import BaseModel


class Persona(BaseModel):
    id: str
    name: str
    role: str
    color: str
    description: str
    icon_shape: str  # circle, square, triangle, diamond


PERSONAS = [
    Persona(
        id="uday",
        name="Uday",
        role="The Optimist",
        color="#10B981",
        description="Sees potential everywhere. Every constraint is an opportunity.",
        icon_shape="circle",
    ),
    Persona(
        id="kiran",
        name="Kiran",
        role="The Skeptic",
        color="#EF4444",
        description="Finds what breaks. Has seen 100 startups fail.",
        icon_shape="square",
    ),
    Persona(
        id="mohan",
        name="Mohan",
        role="The Operator",
        color="#3B82F6",
        description="Run businesses for 20 years. Cares about logistics.",
        icon_shape="triangle",
    ),
    Persona(
        id="priya",
        name="Priya",
        role="The Customer",
        color="#F59E0B",
        description="The end-user. Cares about value, not vision.",
        icon_shape="diamond",
    ),
]

PERSONA_MAP = {p.id: p for p in PERSONAS}
