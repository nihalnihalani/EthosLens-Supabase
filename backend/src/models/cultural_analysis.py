from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum
import uuid

class AnalysisType(str, Enum):
    AUDIENCE = "audience"
    CONTENT = "content"
    TREND = "trend"
    COMPATIBILITY = "compatibility"

class CulturalAnalysisBase(SQLModel):
    analysis_type: AnalysisType
    target_audience: str
    cultural_score: float = Field(ge=0.0, le=100.0)
    insights: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    recommendations: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    strengths: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    opportunities: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    risk_factors: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    trends_identified: List[str] = Field(default_factory=list, sa_column_kwargs={"type_": "JSON"})
    confidence_score: float = Field(ge=0.0, le=100.0)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, sa_column_kwargs={"type_": "JSON"})

class CulturalAnalysis(CulturalAnalysisBase, table=True):
    __tablename__ = "cultural_analyses"
    
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    project_id: Optional[uuid.UUID] = Field(foreign_key="projects.id", default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: "User" = Relationship(back_populates="cultural_analyses")
    project: Optional["Project"] = Relationship(back_populates="cultural_analyses")

class CulturalAnalysisCreate(CulturalAnalysisBase):
    project_id: Optional[uuid.UUID] = None
    content: Optional[str] = None
    brand_context: Optional[str] = None

class CulturalAnalysisResponse(CulturalAnalysisBase):
    id: uuid.UUID
    user_id: uuid.UUID
    project_id: Optional[uuid.UUID] = None
    created_at: datetime

class TrendAnalysisResponse(SQLModel):
    trending_topics: List[Dict[str, Any]]
    cultural_moments: List[Dict[str, Any]]
    audience_insights: Dict[str, Any]
    recommendations: List[str]
    timestamp: datetime