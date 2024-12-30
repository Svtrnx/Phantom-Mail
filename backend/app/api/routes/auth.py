from fastapi import APIRouter, Request, HTTPException, status, Depends
from fastapi.responses import RedirectResponse
from backend.app.api.dependencies import SessionDep
from backend.app.core.limiter import limiter
from backend.app.api.schemas.auth import Token, AuthData
from backend.app.core.config import settings
from backend.app.core.security import create_access_token
from backend.app.api.modules.utils import generate_random_id
from backend.app.api.services.database.postgres.user import create_user
from backend.app.api.models.user import User
import logging
from datetime import timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

auth = APIRouter()




@auth.get("/index")
@limiter.limit("2/second")
async def redirect(request: Request):
    logger.info(f"token: {settings.SECRET_KEY}")
    return {"status": 'success'}

 
@auth.get("/authentication", response_model=Token)
@limiter.limit("2/second")
async def authorize_func(request: Request, session: SessionDep, user_data: AuthData = Depends(AuthData)):
    if not request.cookies.get(str(settings.AUTH_COOKIE_NAME)):
        
        user = await create_user(session=session, user_data=user_data)
        if not isinstance(user, User):
            raise HTTPException(400, "User Already Exists")
            
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user}, expires_delta=access_token_expires
        )
        response = RedirectResponse(url=f'{settings.API_V1_STR}/auth/index', status_code=status.HTTP_302_FOUND)
        response.set_cookie(key=str(settings.AUTH_COOKIE_NAME),value=f"Bearer {access_token}", samesite='strict', httponly=True,
                        secure=True, max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60)
        return response
    else:
        raise HTTPException(401, "Authentication is required")
 
        