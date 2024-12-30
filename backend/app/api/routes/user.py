from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from backend.app.core.limiter import limiter
from backend.app.api.dependencies import CurrentUserDep

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

user = APIRouter()


@user.get("/me")
@limiter.limit("2/second")
async def me_func(request: Request, current_user: CurrentUserDep):
	logger.info(f"token: {current_user}")
	return {"status": 'success'}