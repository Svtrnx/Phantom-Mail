from pydantic import RedisDsn, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="./backend/.env", extra="ignore")
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "API"
    AUTH_COOKIE_NAME: str

    # ACCESS_TOKEN_EXPIRE_MINUTES: int

    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_USERNAME: str | None = None
    REDIS_PASSWORD: str | None = None
    REDIS_DB: int = 0
    REDIS_MAX_CONNECTIONS: int

    @computed_field  # type: ignore
    @property
    def REDIS_URL(self) -> str:
        user_info = ""
        if self.REDIS_USERNAME and self.REDIS_PASSWORD:
            user_info = f"{self.REDIS_USERNAME}:{self.REDIS_PASSWORD}@"

        return f"redis://{user_info}{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"


settings = Settings()  # type: ignore