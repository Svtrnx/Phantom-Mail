from typing import Annotated, AsyncGenerator
from redis.asyncio import Redis
from fastapi import Depends, HTTPException, Request
import jwt
from backend.app.core.security import oauth2_scheme
from backend.app.core.database.postgres import AsyncSession, get_db
from backend.app.core.database.redis import get_redis
from backend.app.api.models.user import User
from backend.app.api.services.database.postgres.user import get_user_by_email
from backend.app.core.config import settings


async def get_current_user(request: Request, session: AsyncGenerator = Depends(get_db), token: str = Depends(oauth2_scheme)):
    auth_exception = HTTPException(401, "Authentication is required")
    if not (token_ := request.cookies.get(settings.AUTH_COOKIE_NAME)):
        raise auth_exception
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except jwt.InvalidTokenError as e:
        raise auth_exception
    if not (user := payload['sub']):
        raise auth_exception
    if not (user := await get_user_by_email(session, user)):
        raise auth_exception
    return user

# Redis dep
RedisDep = Annotated[Redis, Depends(get_redis)]

# Current user dep
CurrentUserDep = Annotated[User, Depends(get_current_user)]

# Session dep
SessionDep = Annotated[AsyncSession, Depends(get_db)]

