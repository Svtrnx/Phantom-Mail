import httpx
from backend.app.core.logger import logger

API_URL = "https://api.mail.tm"

async def get_email_address_domain():
    try:
        async with httpx.AsyncClient() as session:
            response = await session.get(f"{API_URL}/domains")
            return response.json()['hydra:member'][0]['domain']
    except Exception as e:
        logger.error(f'get_email_address_domain error: {e}')
        return None

async def get_token(session, data):
    try:
        response = await session.post(f"{API_URL}/token", json=data)
        return response.json()['token']
    except Exception as e:
        logger.error(f'get_token error: {e}')
        return None

async def create_email(email, password):
    try:
        async with httpx.AsyncClient() as session:
            data = {
                "address": email,
                "password": password,
            }
            await session.post(f"{API_URL}/accounts", json=data)
            
            token_response = await get_token(session, data)
            return {
                "token": token_response,
                "email": email,
                "password": password,
            }
    except Exception as e:
        logger.error(f'create_email error: {e}')
        return None