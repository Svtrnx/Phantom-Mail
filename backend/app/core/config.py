from pydantic import computed_field, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict # type: ignore
from pydantic_core import MultiHostUrl # type: ignore
import secrets

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="./backend/.env", extra="ignore")
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Phantom Mail"
    AUTH_COOKIE_NAME: str
    ALGORITHM: str

    SECRET_KEY: str
    FERNET_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    INCLUDE_SWAGGER_SCHEMA: bool

    # POSTGRES CONN
    POSTGRES_SERVER: str
    POSTGRES_PORT: int
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    # REDIS CONN
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_USERNAME: str | None = None
    REDIS_PASSWORD: str | None = None
    REDIS_DB: int = 0
    REDIS_MAX_CONNECTIONS: int

    @computed_field  # type: ignore
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        return MultiHostUrl.build(
            scheme="postgresql+asyncpg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )

    @computed_field  # type: ignore
    @property
    def REDIS_URL(self) -> str:
        user_info = ""
        if self.REDIS_USERNAME and self.REDIS_PASSWORD:
            user_info = f"{self.REDIS_USERNAME}:{self.REDIS_PASSWORD}@"

        return f"redis://{user_info}{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"


settings = Settings()  # type: ignore