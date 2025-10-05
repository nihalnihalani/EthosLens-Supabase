from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class ProjectType(str, Enum):
    VIDEO = "video"
    IMAGE = "image"
    CAMPAIGN = "campaign"

class ProjectStatus(str, Enum):
    DRAFT = "draft"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class ProjectBase(SQLModel):
    name: str
    description: Optional[str] = None
    project_type: ProjectType
    status: ProjectStatus = ProjectStatus.DRAFT
    cultural_target: Optional[str] = None
    cultural_strength: Optional[float] = Field(default=0.7, ge=0.0, le=1.0)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, sa_column_kwargs={"type_": "JSON"})

class Project(ProjectBase, table=True):
    __tablename__ = "projects"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = Field(default=None)
    
    # Relationships
    owner: "User" = Relationship(back_populates="projects")
    creative_contents: List["CreativeContent"] = Relationship(back_populates="project")
    cultural_analyses: List["CulturalAnalysis"] = Relationship(back_populates="project")

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    cultural_target: Optional[str] = None
    cultural_strength: Optional[float] = None
    metadata: Optional[Dict[str, Any]] = None

class ProjectResponse(ProjectBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None