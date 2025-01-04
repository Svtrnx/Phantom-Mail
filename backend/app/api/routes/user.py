from fastapi import APIRouter, Request, HTTPException
from app.core.limiter import limiter
from app.api.dependencies import CurrentUserDep
from app.core.logger import logger
from app.api.schemas.auth import AuthData

user = APIRouter()


@user.get("/me", response_model=AuthData)
@limiter.limit("4/second")
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