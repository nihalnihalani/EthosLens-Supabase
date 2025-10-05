from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import sys
import os

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from services.creative_generation import CreativeGenerationService

router = APIRouter()
creative_service = CreativeGenerationService()

class VideoGenerationRequest(BaseModel):
    prompt: str
    model: str = "veo3"
    aspect_ratio: str = "16:9"
    cultural_target: Optional[str] = None
    cultural_strength: Optional[float] = 0.8

class ImageGenerationRequest(BaseModel):
    prompt: str
    model: str = "imagen3"
    cultural_target: Optional[str] = None

@router.post("/video/generate")
async def generate_video(request: VideoGenerationRequest):
    """Generate video content with cultural intelligence"""
    try:
        # Use real creative generation service
        result = await creative_service.generate_video_content(
            prompt=request.prompt,
            target_audience=request.cultural_target or "general",
            style_preferences={"model": request.model, "aspect_ratio": request.aspect_ratio}
        )
        
        return {
            "status": "success",
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/image/generate")
async def generate_image(request: ImageGenerationRequest):
    """Generate image content with cultural intelligence"""
    try:
        # Use real creative generation service
        result = await creative_service.generate_image_content(
            prompt=request.prompt,
            target_audience=request.cultural_target or "general",
            style_preferences={"model": request.model}
        )
        
        return {
            "status": "success",
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/voice/transcribe")
async def transcribe_voice():
    """Transcribe voice to text"""
    try:
        # Placeholder for voice transcription logic
        return {
            "status": "success",
            "message": "Voice transcription completed",
            "transcript": "Placeholder transcript"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
