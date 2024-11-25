from fastapi import APIRouter
from backend.app.api.dependencies import RedisDep

auth = APIRouter()


@auth.get("/")
async def test(redis: RedisDep):
	redis