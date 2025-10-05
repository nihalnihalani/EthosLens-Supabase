from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"
    PREMIUM = "premium"

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: str
    role: UserRole = UserRole.USER
    is_active: bool = True
    avatar_url: Optional[str] = None
    preferences: Optional[dict] = Field(default_factory=dict, sa_column_kwargs={"type_": "JSON"})

class User(UserBase, table=True):
    __tablename__ = "users"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)
    last_login: Optional[datetime] = Field(default=None)
    
    # Relationships
    projects: List["Project"] = Relationship(back_populates="owner")
    cultural_analyses: List["CulturalAnalysis"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    password: str

class UserUpdate(SQLModel):
    email: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    preferences: Optional[dict] = None

class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime
    last_login: Optional[datetime] = None