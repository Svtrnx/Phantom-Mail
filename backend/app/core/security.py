from typing import Union
from datetime import datetime, timedelta
from cryptography.fernet import Fernet
import jwt
from app.core.cookie import OAuth2PasswordBearerWithCookie
from app.core.config import settings


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="authentication")

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


cipher_suite = Fernet(settings.FERNET_SECRET_KEY.encode())

async def encrypt_password(password: str) -> str:
    return cipher_suite.encrypt(password.encode()).decode()

async def decrypt_password(encrypted_password: str) -> str:
    return cipher_suite.decrypt(encrypted_password.encode()).decode()
