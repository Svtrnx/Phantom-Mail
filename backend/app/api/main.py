from fastapi import APIRouter

from app.api.routes.auth import auth
from app.api.routes.user import user
from app.api.routes.mail import mail

api_router = APIRouter()
api_router.include_router(auth, prefix="/auth", tags=["auth"])
api_router.include_router(user, prefix="/user", tags=["user"])
api_router.include_router(mail, prefix="/mail", tags=["mail"])
