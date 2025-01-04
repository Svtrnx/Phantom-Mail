from fastapi import APIRouter
from pydantic import TypeAdapter

from app.api.routes.auth import auth
from app.api.routes.user import user
from app.api.routes.mail import mail
from app.core.config import settings

api_router = APIRouter()

api_router.include_router(auth, prefix="/auth", tags=["auth"], include_in_schema=TypeAdapter(bool).validate_python(settings.INCLUDE_SWAGGER_SCHEMA_AUTH))
api_router.include_router(user, prefix="/user", tags=["user"], include_in_schema=TypeAdapter(bool).validate_python(settings.INCLUDE_SWAGGER_SCHEMA_USER))
api_router.include_router(mail, prefix="/mail", tags=["mail"], include_in_schema=TypeAdapter(bool).validate_python(settings.INCLUDE_SWAGGER_SCHEMA_MAIL))
