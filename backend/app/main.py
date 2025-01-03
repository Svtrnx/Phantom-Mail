from fastapi import FastAPI
from app.core.config import settings
from app.api.main import api_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import TypeAdapter

app = FastAPI(title=settings.PROJECT_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://phantom-mail.vercel.app", "https://phantom-mail.vercel.app/signin", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix=settings.API_V1_STR, include_in_schema=TypeAdapter(bool).validate_python(settings.INCLUDE_SWAGGER_SCHEMA))