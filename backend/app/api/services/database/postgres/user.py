from sqlalchemy.future import select
from typing import AsyncGenerator
from fastapi import HTTPException
from backend.app.api.schemas.auth import AuthData
from backend.app.api.models.user import User
from backend.app.core.logger import logger
from backend.app.core.security import encrypt_password, decrypt_password
from backend.app.api.modules.mail_api import create_email

async def create_user(
    session: AsyncGenerator,
    user_data: AuthData
) -> User | None:
    try:
        """
        User is created if doesn't exist based on email.
        Returns the created user.
        """
        user_data.password = await encrypt_password(user_data.password)
        new_user = User(**user_data.model_dump())
        session.add(new_user)
        email_data = await create_email(email=user_data.email, password=await decrypt_password(user_data.password))
        if not isinstance(email_data, dict):
            raise HTTPException(400, "Bad Request")
        
        await session.commit()
        await session.refresh(new_user) 
        return new_user
    except Exception as e:
        await session.rollback()
        logger.error(f'create_user error: {e}')
        return None


async def get_user_by_email(session: AsyncGenerator, email: str) -> User | None:
    try:
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        user.password = await decrypt_password(user.password)
        return user
    except Exception as e:
        logger.error(f'get_user_by_email error: {e}')
        return None
    
    
async def get_user(session: AsyncGenerator, user_data: User) -> User | None:
    try:
        result = await session.execute(select(User).where((User.email == user_data.email)))
        user = result.scalars().first()
        password = await decrypt_password(user.password)
        if user_data.password != password:
            return None
        return user
    except Exception as e:
        logger.error(f'get_user_by_email error: {e}')
        return None