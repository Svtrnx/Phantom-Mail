from pydantic import BaseModel, Field, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str
    
class AuthData(BaseModel):
	email: EmailStr | None = Field(max_length=64)
	password: str = Field(min_length=5, max_length=256)