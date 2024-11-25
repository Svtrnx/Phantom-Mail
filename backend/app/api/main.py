from fastapi import APIRouter

from backend.app.api.routes.auth import auth

api_router = APIRouter()
api_router.include_router(auth, prefix="/auth", tags=["auth"])
