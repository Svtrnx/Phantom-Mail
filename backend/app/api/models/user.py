from sqlalchemy import DateTime, Integer, String, Text, Boolean, Float, BigInteger, Column
from sqlalchemy.orm import DeclarativeBase, mapped_column
from sqlalchemy.sql import func
from datetime import timezone


class Base(DeclarativeBase):
    """Base for models"""


class User(Base):
	__tablename__ = "users"
	id = mapped_column(BigInteger, primary_key=True)
	email = mapped_column(String(64), nullable=False)
	password = mapped_column(String(256), nullable=False)
	created_at = mapped_column(DateTime(timezone=True), server_default=func.now(timezone.utc))