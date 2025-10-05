from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class ContentType(str, Enum):
    VIDEO = "video"
    IMAGE = "image"
    AUDIO = "audio"

class GenerationStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class CreativeContentBase(SQLModel):
    prompt: str
    content_type: ContentType
    model_used: str
    generation_status: GenerationStatus = GenerationStatus.PENDING
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    cultural_score: Optional[float] = Field(default=None, ge=0.0, le=100.0)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, sa_column_kwargs={"type_": "JSON"})

class CreativeContent(CreativeContentBase, table=True):
    __tablename__ = "creative_contents"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    project_id: uuid.UUID = Field(foreign_key="projects.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = Field(default=None)
    
    # Relationships
    project: "Project" = Relationship(back_populates="creative_contents")

class CreativeContentCreate(CreativeContentBase):
    project_id: uuid.UUID

class CreativeContentUpdate(SQLModel):
    generation_status: Optional[GenerationStatus] = None
    file_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    cultural_score: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None

class CreativeContentResponse(CreativeContentBase):
    id: uuid.UUID
    project_id: uuid.UUID
    created_at: datetime
    completed_at: Optional[datetime] = None