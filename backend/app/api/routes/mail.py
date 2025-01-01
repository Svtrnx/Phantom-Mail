from fastapi import APIRouter, Request, Depends, HTTPException
from backend.app.core.logger import logger
from backend.app.core.limiter import limiter
from backend.app.api.modules.mail_api import get_email_address_domain
from backend.app.api.dependencies import SessionDep, CurrentUserDep

mail = APIRouter()


@mail.get("/domain")
@limiter.limit("2/second")
async def get_domain_func(request: Request):
    try:
        domain = await get_email_address_domain()
        return domain
    except Exception as e:
        logger.error(f'get_domain_func error: {e}')
        raise HTTPException(400, "Bad Request")


