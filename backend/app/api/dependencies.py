from typing import Annotated
from redis.asyncio import Redis
from fastapi import Depends
from backend.app.api.redis.connection import redis_pool, init_redis_pool



async def get_redis() -> Redis:
    """
    Get Redis object.
    If it is not initialized, it will be initialized.
    """
    if redis_pool is None:
        await init_redis_pool()
    return redis_pool

# Get redis connection
RedisDep = Annotated[Redis, Depends(get_redis)]