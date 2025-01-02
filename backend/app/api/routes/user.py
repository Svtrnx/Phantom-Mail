from fastapi import APIRouter, Request, HTTPException
from backend.app.core.limiter import limiter
from backend.app.api.dependencies import CurrentUserDep
from backend.app.core.logger import logger
from backend.app.api.schemas.auth import AuthData

user = APIRouter()


@user.get("/me", response_model=AuthData)
@limiter.limit("2/second")
async def me_func(request: Request, current_user: CurrentUserDep):
    try:
        logger.info(f"token: {current_user.email}")
        return {
            "email": current_user.email,
            "password": current_user.password
        }
    except Exception as e:
        logger.error(f'me_func error: {e}')
        raise HTTPException(400, "Bad Request")