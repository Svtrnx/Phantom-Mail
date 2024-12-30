from backend.app.core.cookie import OAuth2PasswordBearerWithCookie
from backend.app.core.config import settings
from typing import Union
from fastapi import Depends, HTTPException, Request
from backend.app.core.database.redis import redis_pool, init_redis_pool
from redis.asyncio import Redis
from datetime import datetime, timedelta
import jwt
oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="authentication")

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


async def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    auth_exception = HTTPException(401, "Authentication is required")
    if not (token_ := request.cookies.get(settings.AUTH_COOKIE_NAME)):
        raise auth_exception
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except jwt.InvalidTokenError as e:
        raise auth_exception
    if not (user := payload['sub']):
        raise auth_exception
    # if not (user := await get_user_by_user_id(session, user)):
    #     raise auth_exception
    return user


async def get_redis() -> Redis:
    """
    Get Redis object.
    If it is not initialized, it will be initialized.
    """
    if redis_pool is None:
        await init_redis_pool()
    return redis_pool