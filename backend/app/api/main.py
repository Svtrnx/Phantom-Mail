from fastapi import APIRouter

from backend.app.api.routes.auth import auth
from backend.app.api.routes.user import user

api_router = APIRouter()
api_router.include_router(auth, prefix="/auth", tags=["auth"])
api_router.include_router(user, prefix="/user", tags=["user"])
