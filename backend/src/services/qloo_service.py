"""
Qloo API Service for Cultural Intelligence and Taste Analysis
Based on the comprehensive implementation from Alloy
"""

import httpx
import asyncio
from typing import List, Dict, Any, Optional, Set
from loguru import logger
import json
from datetime import datetime

from core.config import settings

QLOO_HACKATHON_BASE_URL = "https://hackathon.api.qloo.com"

# Entity types supported by Qloo API
QLOO_ENTITY_TYPE_LIST = [
    "urn:entity:brand",
    "urn:entity:person", 
    "urn:entity:artist",
    "urn:entity:movie",
    "urn:entity:tv_show",
    "urn:entity:book",
    "urn:entity:podcast",
    "urn:entity:place",
    "urn:entity:destination",
]

class QlooService:
    """Service for interacting with Qloo Taste AI API"""
    
    def __init__(self):
        self.base_url = QLOO_HACKATHON_BASE_URL
        self.api_key = settings.QLOO_API_KEY
        self.timeout_config = httpx.Timeout(connect=10.0, read=30.0, write=10.0, pool=30.0)
    
    async def get_audience_profile(self, target_audience: str) -> Dict[str, Any]:
        """
        Get detailed audience profile using Qloo's cultural intelligence
        """
        logger.info(f"Getting audience profile for: {target_audience}")
        
        async with httpx.AsyncClient(timeout=self.timeout_config) as client:
            try:
                # First try to find the audience segment as an entity
                qloo_id = await self._find_qloo_id(client, target_audience)
                
                if qloo_id:
                    # Get detailed tastes for this entity
                    tastes = await self._get_tastes_for_entity(client, qloo_id)
                    
                    # Convert tastes to audience profile format
                    return self._convert_tastes_to_profile(tastes, target_audience)
                else:
                    # Fallback to demographic-based profile
                    return self._get_demographic_profile(target_audience)
                    
            except Exception as e:
                logger.error(f"Error getting audience profile for {target_audience}: {e}")
                return self._get_fallback_profile(target_audience)
    
    async def _find_qloo_id(self, client: httpx.AsyncClient, entity_name: str) -> Optional[str]:
        """Find Qloo entity ID by searching across supported types"""
        headers = {"x-api-key": self.api_key}
        
        for entity_type in QLOO_ENTITY_TYPE_LIST:
            params = {"query": entity_name, "types": entity_type}
            try:
                resp = await client.get(f"{self.base_url}/search", params=params, headers=headers, timeout=10.0)
                
                if resp.status_code == 200:
                    data = resp.json()
                    results = data.get("results", [])
                    if results:
                        qloo_id = results[0].get("id")
                        if qloo_id:
                            logger.success(f"Found Qloo ID for '{entity_name}' (as type {entity_type}): {qloo_id}")
                            return qloo_id
                elif resp.status_code == 429:
                    logger.warning(f"Rate limited by Qloo /search for type {entity_type}. Waiting...")
                    await asyncio.sleep(2)
            
            except Exception as e:
                logger.error(f"Qloo /search request failed for '{entity_name}' with type {entity_type}: {e}")
                continue
        
        logger.warning(f"Could not find a Qloo entity for '{entity_name}' across all supported types.")
        return None
    
    async def _get_tastes_for_entity(self, client: httpx.AsyncClient, qloo_id: str) -> Set[str]:
        """Get taste data for a specific entity"""
        headers = {"x-api-key": self.api_key}
        params = {
            "signal.interests.entities": qloo_id,
            "filter.type": "urn:tag",
            "take": 50
        }

        try:
            resp = await client.get(f"{self.base_url}/v2/insights", params=params, headers=headers, timeout=15.0)

            if resp.status_code == 200:
                data = resp.json()
                entities = data.get("results", {}).get("entities", [])
                tastes = {entity.get('name') for entity in entities if entity.get('name')}
                if tastes:
                    logger.success(f"Fetched {len(tastes)} tastes for ID {qloo_id}")
                    return tastes
            elif resp.status_code == 429:
                logger.warning("Rate limited by Qloo /insights. Waiting...")
                await asyncio.sleep(2)
            else:
                logger.warning(f"Qloo insights for ID {qloo_id} failed with status {resp.status_code}: {resp.text[:200]}")
        
        except Exception as e:
            logger.error(f"Qloo /insights request failed for ID {qloo_id}: {e}")

        return set()
    
    def _convert_tastes_to_profile(self, tastes: Set[str], audience_segment: str) -> Dict[str, Any]:
        """Convert Qloo taste data to audience profile format"""
        taste_list = list(tastes)
        
        # Categorize tastes into different preference types
        aesthetic_preferences = {
            "preferred_style": "modern",
            "colors": [taste for taste in taste_list if any(color in taste.lower() for color in ['color', 'red', 'blue', 'green', 'black', 'white'])][:5],
            "visual_elements": taste_list[:10]
        }
        
        content_preferences = {
            "prefers_video": True,
            "prefers_images": True,
            "format_preferences": taste_list[:8],
            "topics_of_interest": taste_list[:15]
        }
        
        values = [taste for taste in taste_list if any(value in taste.lower() 
                 for value in ['authentic', 'sustainable', 'innovative', 'quality', 'community'])][:10]
        
        return {
            "segment": audience_segment,
            "qloo_entity_found": True,
            "total_tastes": len(tastes),
            "aesthetic_preferences": aesthetic_preferences,
            "content_preferences": content_preferences,
            "values": values or ["authenticity", "quality", "innovation"],
            "engagement_patterns": {
                "peak_times": ["evening", "weekend"],
                "preferred_platforms": ["instagram", "tiktok", "youtube"],
                "interaction_style": "visual-first"
            },
            "cultural_affinity_score": min(95, 70 + len(tastes) * 0.5)
        }
    
    def _get_demographic_profile(self, target_audience: str) -> Dict[str, Any]:
        """Get demographic-based profile when Qloo entity not found"""
        audience_lower = target_audience.lower()
        
        profiles = {
            "millennials": {
                "aesthetic_preferences": {
                    "preferred_style": "authentic",
                    "colors": ["warm", "natural", "earth tones"],
                    "visual_elements": ["candid moments", "real people", "experiences"]
                },
                "content_preferences": {
                    "prefers_video": True,
                    "prefers_images": True,
                    "format_preferences": ["stories", "long-form video", "carousel posts"],
                    "topics_of_interest": ["sustainability", "experiences", "technology", "wellness"]
                },
                "values": ["authenticity", "experiences", "social responsibility", "work-life balance"],
                "cultural_affinity_score": 78
            },
            "gen z": {
                "aesthetic_preferences": {
                    "preferred_style": "bold",
                    "colors": ["vibrant", "neon", "contrasting"],
                    "visual_elements": ["dynamic movement", "inclusive imagery", "creative editing"]
                },
                "content_preferences": {
                    "prefers_video": True,
                    "prefers_images": True,
                    "format_preferences": ["short videos", "reels", "tiktok style"],
                    "topics_of_interest": ["social justice", "creativity", "gaming", "music"]
                },
                "values": ["inclusivity", "creativity", "social change", "digital-first"],
                "cultural_affinity_score": 85
            },
            "luxury": {
                "aesthetic_preferences": {
                    "preferred_style": "elegant",
                    "colors": ["gold", "black", "white", "platinum"],
                    "visual_elements": ["premium materials", "sophisticated lighting", "minimalist"]
                },
                "content_preferences": {
                    "prefers_video": True,
                    "prefers_images": True,
                    "format_preferences": ["cinematic video", "high-resolution images"],
                    "topics_of_interest": ["craftsmanship", "exclusivity", "heritage", "quality"]
                },
                "values": ["quality", "exclusivity", "craftsmanship", "heritage"],
                "cultural_affinity_score": 92
            }
        }
        
        # Find matching profile or use default
        for key, profile in profiles.items():
            if key in audience_lower:
                profile.update({
                    "segment": target_audience,
                    "qloo_entity_found": False,
                    "total_tastes": 0,
                    "engagement_patterns": {
                        "peak_times": ["evening", "weekend"],
                        "preferred_platforms": ["instagram", "facebook", "youtube"],
                        "interaction_style": "engagement-focused"
                    }
                })
                return profile
        
        return self._get_fallback_profile(target_audience)
    
    def _get_fallback_profile(self, target_audience: str) -> Dict[str, Any]:
        """Fallback profile when all else fails"""
        return {
            "segment": target_audience,
            "qloo_entity_found": False,
            "total_tastes": 0,
            "aesthetic_preferences": {
                "preferred_style": "modern",
                "colors": ["blue", "green", "neutral"],
                "visual_elements": ["clean", "professional", "approachable"]
            },
            "content_preferences": {
                "prefers_video": True,
                "prefers_images": True,
                "format_preferences": ["mixed content"],
                "topics_of_interest": ["general interest"]
            },
            "values": ["quality", "reliability", "value"],
            "engagement_patterns": {
                "peak_times": ["business hours"],
                "preferred_platforms": ["facebook", "linkedin"],
                "interaction_style": "informational"
            },
            "cultural_affinity_score": 65
        }
    
    async def analyze_cultural_trends(self, topics: List[str]) -> Dict[str, Any]:
        """Analyze cultural trends for given topics using Qloo data"""
        logger.info(f"Analyzing cultural trends for topics: {topics}")
        
        async with httpx.AsyncClient(timeout=self.timeout_config) as client:
            trend_data = {}
            
            for topic in topics[:5]:  # Limit to 5 topics to avoid rate limits
                try:
                    qloo_id = await self._find_qloo_id(client, topic)
                    if qloo_id:
                        tastes = await self._get_tastes_for_entity(client, qloo_id)
                        trend_data[topic] = {
                            "qloo_id": qloo_id,
                            "related_tastes": list(tastes)[:10],
                            "trend_strength": min(100, len(tastes) * 2),
                            "cultural_relevance": "high" if len(tastes) > 20 else "medium"
                        }
                    else:
                        trend_data[topic] = {
                            "qloo_id": None,
                            "related_tastes": [],
                            "trend_strength": 50,
                            "cultural_relevance": "unknown"
                        }
                    
                    # Rate limiting
                    await asyncio.sleep(0.5)
                    
                except Exception as e:
                    logger.error(f"Error analyzing trend for {topic}: {e}")
                    trend_data[topic] = {"error": str(e)}
            
            return {
                "analysis_timestamp": datetime.utcnow().isoformat(),
                "topics_analyzed": len(trend_data),
                "trend_data": trend_data,
                "overall_trend_score": sum(data.get("trend_strength", 0) for data in trend_data.values()) / len(trend_data) if trend_data else 0
            }
    
    async def get_cultural_compatibility(self, brand_context: str, target_audience: str) -> Dict[str, Any]:
        """Analyze cultural compatibility between brand and audience"""
        logger.info(f"Analyzing cultural compatibility: {brand_context} -> {target_audience}")
        
        # Get audience profile
        audience_profile = await self.get_audience_profile(target_audience)
        
        # Simple compatibility scoring based on available data
        audience_values = audience_profile.get("values", [])
        audience_interests = audience_profile.get("content_preferences", {}).get("topics_of_interest", [])
        
        # Extract key terms from brand context
        brand_terms = brand_context.lower().split()
        common_terms = [term for term in brand_terms if any(term in str(value).lower() for value in audience_values + audience_interests)]
        
        compatibility_score = min(100, len(common_terms) * 10 + audience_profile.get("cultural_affinity_score", 50))
        
        return {
            "compatibility_score": compatibility_score,
            "audience_profile": audience_profile,
            "brand_alignment": {
                "shared_values": common_terms[:5],
                "potential_conflicts": [],
                "opportunities": audience_interests[:5]
            },
            "recommendations": [
                f"Focus on {audience_profile.get('aesthetic_preferences', {}).get('preferred_style', 'modern')} aesthetic",
                f"Emphasize {', '.join(audience_values[:3])} values",
                f"Use {', '.join(audience_profile.get('engagement_patterns', {}).get('preferred_platforms', ['social media']))} platforms"
            ]
        }