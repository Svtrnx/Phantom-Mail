from pydantic import BaseModel, Field

class DomainData(BaseModel):
	domain: str = Field(max_length=32)

class MessagesData(BaseModel):
    messages: list | dict
    
class MessageData(BaseModel):
    message: list | dict
    
class MessagesFormData(BaseModel):
    token: str = Field(max_length=512)

class MessageFormData(BaseModel):
    message_id: str = Field(max_length=64)
