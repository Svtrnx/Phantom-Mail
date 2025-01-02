import httpx
from app.core.logger import logger

API_URL = "https://api.mail.tm"

async def get_email_address_domain():
    try:
        async with httpx.AsyncClient() as session:
            response = await session.get(f"{API_URL}/domains")
            return response.json()['hydra:member'][0]['domain']
    except Exception as e:
        logger.error(f'get_email_address_domain error: {e}')
        return None

async def get_token(data):
    try:
        async with httpx.AsyncClient() as session:
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
            
            token_response = await get_token(data)
            if token_response == None:
                return None
            return {
                "token": token_response,
                "email": email,
                "password": password,
            }
    except Exception as e:
        logger.error(f'create_email error: {e}')
        return None
    
    
async def get_messages(token):
    try:
        async with httpx.AsyncClient() as session:
            headers = {
                "Authorization": f"Bearer {token}"
            }
            
            messages = await session.get(f"{API_URL}/messages", headers=headers)
            return messages.json()['hydra:member']
            
    except Exception as e:
        logger.error(f'get_messages error: {e}')
        return None
    
    
async def get_message(token, message_id):
    try:
        async with httpx.AsyncClient() as session:
            headers = {
                "Authorization": f"Bearer {token}"
            }
            
            message = await session.get(f"{API_URL}/messages/{message_id}", headers=headers)
            return message.json()
            
    except Exception as e:
        logger.error(f'get_messages error: {e}')
        return None
    
    
async def delete_message(token, message_id):
    try:
        async with httpx.AsyncClient() as session:
            headers = {
                "Authorization": f"Bearer {token}"
            }
            
            message = await session.delete(f"{API_URL}/messages/{message_id}", headers=headers)
            if message.status_code == 200 or message.status_code == 204:
                return True
            else:
                return False
            
    except Exception as e:
        logger.error(f'get_messages error: {e}')
        return None
    
    
async def patch_message(token, message_id):
    try:
        async with httpx.AsyncClient() as session:
            headers = {
                "Accept": "application/ld+json",
                "Content-Type": "application/merge-patch+json",
                "Authorization": f"Bearer {token}"
            }
            
            data = {
                "seen": True
            }
            
            message = await session.patch(f"{API_URL}/messages/{message_id}", headers=headers, json=data)
            if message.status_code == 200:
                return True
            else:
                return False
            
    except Exception as e:
        logger.error(f'get_messages error: {e}')
        return None