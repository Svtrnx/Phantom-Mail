from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from app.core.config import settings
from typing import AsyncGenerator

engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI), max_overflow=10, pool_size=20, pool_pre_ping=True, pool_recycle=2000)
SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()