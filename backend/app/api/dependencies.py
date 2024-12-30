from typing import Annotated
from redis.asyncio import Redis
from fastapi import Depends
from backend.app.core.security import get_current_user
from backend.app.core.database.postgres import AsyncSession, get_db
from backend.app.core.security import get_redis

# Get redis connection
RedisDep = Annotated[Redis, Depends(get_redis)]

# Get user 
CurrentUserDep = Annotated[str, Depends(get_current_user)]

# Session dep
SessionDep = Annotated[AsyncSession, Depends(get_db)]

