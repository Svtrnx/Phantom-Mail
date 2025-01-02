from fastapi import APIRouter, Request, Depends, HTTPException
from backend.app.core.logger import logger
from backend.app.core.limiter import limiter
from backend.app.api.modules.mail_api import get_email_address_domain, get_messages, get_message, delete_message, patch_message
from backend.app.api.dependencies import SessionDep, CurrentUserDep
from backend.app.api.schemas.mail import DomainData, MessagesData, MessageData, MessagesFormData, MessageFormData

mail = APIRouter()


@mail.get("/domain", response_model=DomainData)
@limiter.limit("2/second")
async def get_domain_func(request: Request):
    try:
        domain = await get_email_address_domain()
        return {
            "domain": domain
        }
    except Exception as e:
        logger.error(f'get_domain_func error: {e}')
        raise HTTPException(400, "Bad Request")


@mail.get("/messages", response_model=MessagesData)
@limiter.limit("2/second")
async def get_messages_func(request: Request, form_data: MessagesFormData = Depends(MessagesFormData)):
    try:
        messages = await get_messages(form_data.token)
        return {
            "messages": messages
        }
    except Exception as e:
        logger.error(f'get_messages_func error: {e}')
        raise HTTPException(400, "Bad Request")
    
    
@mail.get("/messages/{message_id}", response_model=MessageData)
@limiter.limit("2/second")
async def get_message_func(request: Request, form_data: MessageFormData = Depends(MessageFormData)):
    try:
        message = await get_message(form_data.token, form_data.message_id)
        return {
            "message": message
        }
    except Exception as e:
        logger.error(f'get_message_func error: {e}')
        raise HTTPException(400, "Bad Request")
    
    
@mail.delete("/messages/{message_id}")
@limiter.limit("2/second")
async def delete_message_func(request: Request, form_data: MessageFormData = Depends(MessageFormData)):
    try:
        response = await delete_message(form_data.token, form_data.message_id)
        if response == False:
            raise HTTPException(400, "Bad Request")
        
        return {
            "status": "success"
        }
    except Exception as e:
        logger.error(f'get_messages_func error: {e}')
        raise HTTPException(400, "Bad Request")
    
@mail.patch("/messages/{message_id}")
@limiter.limit("2/second")
async def patch_message_func(request: Request, form_data: MessageFormData = Depends(MessageFormData)):
    try:
        response = await patch_message(form_data.token, form_data.message_id)
        if response == False:
            raise HTTPException(400, "Bad Request")
        
        return {
            "status": "success"
        }
    except Exception as e:
        logger.error(f'get_messages_func error: {e}')
        raise HTTPException(400, "Bad Request")


