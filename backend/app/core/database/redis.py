from redis.asyncio import Redis
from backend.app.core.config import settings
import asyncio

redis_pool: Redis | None = None
redis_lock = asyncio.Lock()


async def init_redis_pool():
    """
    Init the connection pool Redis.
    """
    global redis_pool
    async with redis_lock:
        if redis_pool is None: 
            redis_pool = await Redis.from_url(
                settings.REDIS_URL,
                max_connections=settings.REDIS_MAX_CONNECTIONS,
                decode_responses=False 
            )
