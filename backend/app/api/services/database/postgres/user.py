from backend.app.api.dependencies import SessionDep
from backend.app.api.schemas.auth import AuthData
from backend.app.api.models.user import User


async def create_user(
    session: SessionDep,
    user_data: AuthData
) -> User:
    try:
        """
        User is created if doesn't exist based on email.
        Returns the created user.
        """
        new_user = User(**user_data.model_dump())
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user) 
        return new_user
    except Exception as e:
        print(e)
        return None
