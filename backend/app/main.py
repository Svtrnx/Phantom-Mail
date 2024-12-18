from fastapi import FastAPI
from backend.app.core.config import settings
from backend.app.api.main import api_router

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(api_router, prefix=settings.API_V1_STR)