from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import sys
import os

# Add the src directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..'))

from services.cultural_intelligence import CulturalIntelligenceService

router = APIRouter()
cultural_service = CulturalIntelligenceService()

class CulturalAnalysisRequest(BaseModel):
    content: str
    target_audience: str
    analysis_type: str = "content"
    brand_context: Optional[str] = None

class TrendRequest(BaseModel):
    audience: Optional[str] = None
    industry: Optional[str] = None

@router.post("/analyze")
async def analyze_cultural_alignment(request: CulturalAnalysisRequest):
    """Perform cultural intelligence analysis"""
    try:
        # Use real cultural intelligence service
        analysis = await cultural_service.analyze_content(
            content=request.content,
            target_audience=request.target_audience,
            brand_context=request.brand_context,
            analysis_type=request.analysis_type
        )
        
        return {
            "status": "success",
            "analysis": analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/trends")
async def get_cultural_trends(audience: Optional[str] = None, industry: Optional[str] = None):
    """Get current cultural trends and insights"""
    try:
        # Placeholder for trends logic
        return {
            "status": "success",
            "trends": [
                {
                    "trend": "Sustainability Focus",
                    "relevance_score": 0.89,
                    "audience_impact": "high",
                    "description": "Environmental consciousness is driving purchasing decisions"
                },
                {
                    "trend": "Authentic Storytelling",
                    "relevance_score": 0.76,
                    "audience_impact": "medium",
                    "description": "Consumers prefer genuine, relatable content"
                }
            ],
            "audience": audience,
            "industry": industry
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/audience/{audience_segment}")
async def get_audience_profile(audience_segment: str):
    """Get detailed audience profile and cultural insights"""
    try:
        # Placeholder for audience profile logic
        return {
            "status": "success",
            "audience_segment": audience_segment,
            "profile": {
                "demographics": {
                    "age_range": "25-35",
                    "income_level": "middle_to_high",
                    "education": "college_educated"
                },
                "cultural_insights": {
                    "values": ["sustainability", "authenticity", "innovation"],
                    "preferences": ["eco-friendly", "tech-savvy", "socially_conscious"],
                    "behaviors": ["research_before_buying", "social_media_active", "brand_loyal"]
                },
                "trending_topics": ["climate_change", "mental_health", "work_life_balance"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/compatibility-score")
async def calculate_compatibility_score(
    brand_values: str,
    audience_segment: str,
    content_style: Optional[str] = None
):
    """Calculate brand-audience cultural compatibility score"""
    try:
        # Placeholder for compatibility calculation
        return {
            "status": "success",
            "compatibility_score": 0.87,
            "alignment_factors": [
                "Shared sustainability values",
                "Authentic communication style",
                "Innovation focus"
            ],
            "potential_conflicts": [
                "Price sensitivity mismatch",
                "Brand perception gap"
            ],
            "recommendations": [
                "Emphasize value proposition",
                "Address accessibility concerns"
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))