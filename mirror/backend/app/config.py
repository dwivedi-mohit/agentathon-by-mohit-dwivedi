from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "Mirror"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    LOG_LEVEL: str = "info"

    HOST: str = "0.0.0.0"
    PORT: int = 8000
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:4173"

    GROQ_API_KEY: str = ""
    AGENTFIELD_API_KEY: str = ""
    AGENTFIELD_AGENT_ID: str = ""

    RATE_LIMIT_REQUESTS: int = 10
    RATE_LIMIT_WINDOW_SECONDS: int = 60
    SESSION_TTL_SECONDS: int = 1800

    PERSONA_MODEL: str = "llama-3.3-70b-versatile"
    SYNTHESIZER_MODEL: str = "llama-3.3-70b-versatile"
    PERSONA_MAX_TOKENS: int = 300
    SYNTHESIZER_MAX_TOKENS: int = 1000
    LLM_TEMPERATURE: float = 0.8

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
