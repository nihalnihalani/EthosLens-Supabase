from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()

class ProjectCreateRequest(BaseModel):
    name: str
    description: Optional[str] = None
    target_audience: Optional[str] = None

class Project(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    target_audience: Optional[str] = None
    created_at: str
    updated_at: str

@router.get("/")
async def list_projects():
    """List all user projects"""
    try:
        # TODO: Replace with actual database query using SQLModel/SQLAlchemy
        # SELECT * FROM projects WHERE owner_id = current_user.id ORDER BY created_at DESC
        
        # For now, return empty list to represent no existing projects
        # This shows the real empty state that users would see
        return {
            "status": "success",
            "projects": [],
            "total": 0,
            "message": "No projects found. Create your first project to get started!"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/")
async def create_project(request: ProjectCreateRequest):
    """Create a new project"""
    try:
        # TODO: Replace with actual database insertion using SQLModel/SQLAlchemy
        # project = Project(name=request.name, description=request.description, ...)
        # session.add(project)
        # session.commit()
        
        # For now, simulate project creation with proper response structure
        new_project_id = str(uuid.uuid4())
        current_time = datetime.utcnow().isoformat() + "Z"
        
        return {
            "status": "success",
            "message": "Project created successfully",
            "project": {
                "id": new_project_id,
                "name": request.name,
                "description": request.description,
                "target_audience": request.target_audience,
                "type": "campaign",
                "status": "draft",
                "cultural_score": None,
                "created_at": current_time,
                "updated_at": current_time
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{project_id}")
async def get_project(project_id: str):
    """Get project details"""
    try:
        # Placeholder for project retrieval logic
        return {
            "status": "success",
            "project": {
                "id": project_id,
                "name": "Sample Project",
                "description": "A sample project for testing",
                "target_audience": "millennials",
                "created_at": "2025-01-01T00:00:00Z",
                "updated_at": "2025-01-01T00:00:00Z"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail="Project not found")
