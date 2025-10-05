"""
Creative Generation Service
Orchestrates video and image generation using Veo-3, Imagen, and Gemini
"""

from typing import Dict, List, Any, Optional, AsyncGenerator
from datetime import datetime
import asyncio
import json
from loguru import logger

from .gemini_service import GeminiService
from .cultural_intelligence import CulturalIntelligenceService
from .veo_service import VeoService  
from .imagen_service import ImagenService
from core.config import settings

class CreativeGenerationService:
    """
    Main service for creative content generation
    Combines cultural intelligence with AI-powered creative generation
    """
    
    def __init__(self):
        self.gemini_service = GeminiService()
        self.cultural_service = CulturalIntelligenceService()
        self.veo_service = VeoService()
        self.imagen_service = ImagenService()
        self.generation_history: List[Dict[str, Any]] = []
    
    async def generate_video_content(
        self,
        prompt: str,
        target_audience: str,
        brand_context: Optional[str] = None,
        style_preferences: Optional[Dict[str, Any]] = None,
        aspect_ratio: str = "16:9",
        duration: str = "30s"
    ) -> Dict[str, Any]:
        """
        Generate video content with cultural intelligence
        """
        logger.info(f"Generating video content for {target_audience}")
        
        try:
            generation_id = f"video_{int(datetime.utcnow().timestamp())}"
            
            # Step 1: Cultural analysis
            cultural_analysis = await self.cultural_service.analyze_content(
                prompt, target_audience, brand_context
            )
            
            # Step 2: Enhance prompt with cultural context
            enhanced_prompt = await self._enhance_prompt_culturally(
                prompt, cultural_analysis, "video"
            )
            
            # Step 3: Generate video using Veo-3
            video_result = await self.veo_service.generate_video(
                enhanced_prompt,
                {
                    "cultural_insights": cultural_analysis.insights,
                    "aesthetic_preferences": cultural_analysis.audience_profile.get("aesthetic_preferences", {}),
                    "values": cultural_analysis.audience_profile.get("values", []),
                    "cultural_score": cultural_analysis.cultural_score,
                    "target_audience": target_audience
                },
                duration=duration,
                aspect_ratio=aspect_ratio
            )
            
            # Step 4: Generate variations using Veo-3
            variations_result = await self.veo_service.generate_video_variations(
                enhanced_prompt, 
                {
                    "cultural_insights": cultural_analysis.insights,
                    "cultural_score": cultural_analysis.cultural_score,
                    "target_audience": target_audience
                },
                3
            )
            
            # Step 5: Platform optimizations
            platform_optimizations = await self._generate_platform_optimizations(
                video_result, ["instagram", "tiktok", "youtube"]
            )
            
            # Step 6: Predict performance
            performance_prediction = await self.cultural_service.predict_cultural_performance(
                enhanced_prompt, target_audience, "video"
            )
            
            # Compile final result
            result = {
                "generation_id": generation_id,
                "type": "video",
                "status": "completed",
                "original_prompt": prompt,
                "enhanced_prompt": enhanced_prompt,
                "target_audience": target_audience,
                "cultural_analysis": {
                    "cultural_score": cultural_analysis.cultural_score,
                    "insights": cultural_analysis.insights,
                    "recommendations": cultural_analysis.recommendations
                },
                "video_result": video_result,
                "variations": variations_result,
                "platform_optimizations": platform_optimizations,
                "performance_prediction": performance_prediction,
                "technical_specs": {
                    "aspect_ratio": aspect_ratio,
                    "duration": duration,
                    "format": "MP4",
                    "quality": "HD"
                },
                "veo_prompt": enhanced_prompt,
                "generation_timestamp": datetime.utcnow().isoformat(),
                "estimated_generation_time": "2-3 minutes"
            }
            
            # Add to history
            self.generation_history.append(result)
            
            logger.success(f"Video content generation completed: {generation_id}")
            return result
            
        except Exception as e:
            logger.error(f"Error generating video content: {e}")
            return self._get_fallback_video_result(prompt, target_audience)
    
    async def generate_image_content(
        self,
        prompt: str,
        target_audience: str,
        brand_context: Optional[str] = None,
        style_preferences: Optional[Dict[str, Any]] = None,
        aspect_ratio: str = "1:1",
        image_count: int = 1
    ) -> Dict[str, Any]:
        """
        Generate image content with cultural intelligence
        """
        logger.info(f"Generating image content for {target_audience}")
        
        try:
            generation_id = f"image_{int(datetime.utcnow().timestamp())}"
            
            # Step 1: Cultural analysis
            cultural_analysis = await self.cultural_service.analyze_content(
                prompt, target_audience, brand_context
            )
            
            # Step 2: Enhance prompt with cultural context
            enhanced_prompt = await self._enhance_prompt_culturally(
                prompt, cultural_analysis, "image"
            )
            
            # Step 3: Generate image using Imagen
            image_result = await self.imagen_service.generate_image(
                enhanced_prompt,
                {
                    "cultural_insights": cultural_analysis.insights,
                    "aesthetic_preferences": cultural_analysis.audience_profile.get("aesthetic_preferences", {}),
                    "values": cultural_analysis.audience_profile.get("values", []),
                    "cultural_score": cultural_analysis.cultural_score,
                    "target_audience": target_audience
                },
                style=style_preferences.get("style", "photorealistic") if style_preferences else "photorealistic",
                aspect_ratio=aspect_ratio
            )
            
            # Step 4: Generate variations if requested using Imagen
            variations_result = {}
            if image_count > 1:
                variations_result = await self.imagen_service.generate_image_series(
                    enhanced_prompt,
                    {
                        "cultural_insights": cultural_analysis.insights,
                        "cultural_score": cultural_analysis.cultural_score,
                        "target_audience": target_audience
                    },
                    min(image_count, 5)
                )
            
            # Step 5: Platform optimizations using Imagen
            platform_optimizations = await self.imagen_service.generate_platform_optimized_images(
                enhanced_prompt,
                {
                    "cultural_insights": cultural_analysis.insights,
                    "cultural_score": cultural_analysis.cultural_score,
                    "target_audience": target_audience
                },
                ["instagram", "facebook", "linkedin"]
            )
            
            # Step 6: Predict performance
            performance_prediction = await self.cultural_service.predict_cultural_performance(
                enhanced_prompt, target_audience, "image"
            )
            
            # Compile final result
            result = {
                "generation_id": generation_id,
                "type": "image",
                "status": "completed",
                "original_prompt": prompt,
                "enhanced_prompt": enhanced_prompt,
                "target_audience": target_audience,
                "cultural_analysis": {
                    "cultural_score": cultural_analysis.cultural_score,
                    "insights": cultural_analysis.insights,
                    "recommendations": cultural_analysis.recommendations
                },
                "image_result": image_result,
                "variations": variations_result,
                "platform_optimizations": platform_optimizations,
                "performance_prediction": performance_prediction,
                "technical_specs": {
                    "aspect_ratio": aspect_ratio,
                    "resolution": "1024x1024",
                    "format": "PNG/JPG",
                    "quality": "High"
                },
                "imagen_prompt": enhanced_prompt,
                "generation_timestamp": datetime.utcnow().isoformat(),
                "images_generated": image_count
            }
            
            # Add to history
            self.generation_history.append(result)
            
            logger.success(f"Image content generation completed: {generation_id}")
            return result
            
        except Exception as e:
            logger.error(f"Error generating image content: {e}")
            return self._get_fallback_image_result(prompt, target_audience)
    
    async def generate_campaign_strategy(
        self,
        brief: str,
        target_audience: str,
        brand_context: str,
        campaign_type: str = "mixed",
        budget_tier: str = "medium"
    ) -> Dict[str, Any]:
        """
        Generate comprehensive campaign strategy
        """
        logger.info(f"Generating campaign strategy for {target_audience}")
        
        try:
            strategy_id = f"strategy_{int(datetime.utcnow().timestamp())}"
            
            # Step 1: Cultural analysis of the brief
            cultural_analysis = await self.cultural_service.analyze_content(
                brief, target_audience, brand_context
            )
            
            # Step 2: Get trending topics for audience
            trending_data = await self.cultural_service.get_trending_topics(target_audience)
            
            # Step 3: Generate creative strategy
            strategy_prompt = f"""
            Create a comprehensive advertising campaign strategy based on:
            
            BRIEF: {brief}
            TARGET AUDIENCE: {target_audience}
            BRAND CONTEXT: {brand_context}
            CAMPAIGN TYPE: {campaign_type}
            BUDGET TIER: {budget_tier}
            
            CULTURAL INSIGHTS:
            - Cultural Score: {cultural_analysis.cultural_score}%
            - Key Insights: {', '.join(cultural_analysis.insights)}
            - Trending Topics: {', '.join([t.get('topic', '') for t in trending_data.get('trending_topics', [])])}
            - Audience Values: {', '.join(cultural_analysis.audience_profile.get('values', []))}
            
            AUDIENCE PREFERENCES:
            - Aesthetic: {json.dumps(cultural_analysis.audience_profile.get('aesthetic_preferences', {}))}
            - Platforms: {', '.join(cultural_analysis.audience_profile.get('engagement_patterns', {}).get('preferred_platforms', []))}
            
            Generate a complete campaign strategy including multiple content pieces.
            """
            
            strategy = await self.gemini_service.generate_strategy(strategy_prompt)
            
            # Step 4: Generate content recommendations
            content_recommendations = await self._generate_content_recommendations(
                strategy, cultural_analysis, campaign_type
            )
            
            # Step 5: Timeline and budget recommendations
            timeline = self._generate_campaign_timeline(campaign_type, budget_tier)
            budget_breakdown = self._generate_budget_breakdown(budget_tier, campaign_type)
            
            # Compile final strategy
            result = {
                "strategy_id": strategy_id,
                "campaign_name": f"{target_audience.title()} Campaign Strategy",
                "brief": brief,
                "target_audience": target_audience,
                "brand_context": brand_context,
                "cultural_analysis": {
                    "cultural_score": cultural_analysis.cultural_score,
                    "insights": cultural_analysis.insights,
                    "recommendations": cultural_analysis.recommendations,
                    "trending_topics": trending_data.get("trending_topics", [])[:5]
                },
                "creative_strategy": strategy,
                "content_recommendations": content_recommendations,
                "timeline": timeline,
                "budget_breakdown": budget_breakdown,
                "success_metrics": [
                    "Cultural alignment score > 85%",
                    "Engagement rate > 3.5%",
                    "Brand recall > 70%",
                    "Cultural authenticity score > 90%"
                ],
                "risk_mitigation": [
                    "Regular cultural sensitivity reviews",
                    "A/B testing with target audience",
                    "Real-time sentiment monitoring",
                    "Flexible content adaptation"
                ],
                "generation_timestamp": datetime.utcnow().isoformat()
            }
            
            logger.success(f"Campaign strategy generated: {strategy_id}")
            return result
            
        except Exception as e:
            logger.error(f"Error generating campaign strategy: {e}")
            return self._get_fallback_strategy_result(brief, target_audience)
    
    async def _enhance_prompt_culturally(
        self,
        original_prompt: str,
        cultural_analysis: Any,
        content_type: str
    ) -> str:
        """Enhance prompt with cultural context"""
        
        insights = ', '.join(cultural_analysis.insights[:3])
        values = ', '.join(cultural_analysis.audience_profile.get("values", [])[:3])
        aesthetic = cultural_analysis.audience_profile.get("aesthetic_preferences", {}).get("preferred_style", "modern")
        
        cultural_enhancement = f"Incorporating {insights}. Emphasizing {values} values. {aesthetic} aesthetic with authentic cultural elements."
        
        if content_type == "video":
            return f"{original_prompt}. {cultural_enhancement} Dynamic, engaging video content with authentic storytelling."
        elif content_type == "image":
            return f"{original_prompt}. {cultural_enhancement} High-quality, culturally authentic imagery."
        else:
            return f"{original_prompt}. {cultural_enhancement}"
    
    async def _generate_platform_optimizations(
        self,
        content_concept: Dict[str, Any],
        platforms: List[str]
    ) -> Dict[str, Any]:
        """Generate platform-specific optimizations"""
        
        optimizations = {}
        
        for platform in platforms:
            try:
                concept_text = content_concept.get("scene_description") or content_concept.get("visual_description", "")
                optimization = await self.gemini_service.optimize_for_platform(concept_text, platform)
                optimizations[platform] = optimization
            except Exception as e:
                logger.error(f"Error optimizing for {platform}: {e}")
                optimizations[platform] = {"error": f"Optimization failed for {platform}"}
        
        return optimizations
    
    async def _generate_content_recommendations(
        self,
        strategy: Dict[str, Any],
        cultural_analysis: Any,
        campaign_type: str
    ) -> List[Dict[str, Any]]:
        """Generate specific content piece recommendations"""
        
        recommendations = []
        
        # Hero video content
        recommendations.append({
            "content_type": "hero_video",
            "title": "Main Campaign Video",
            "description": "Primary video content showcasing core campaign message",
            "duration": "30-60 seconds",
            "platforms": ["youtube", "instagram", "facebook"],
            "priority": "high",
            "cultural_elements": cultural_analysis.insights[:3]
        })
        
        # Social media assets
        recommendations.append({
            "content_type": "social_images",
            "title": "Social Media Image Series",
            "description": "Culturally-targeted image content for social platforms",
            "count": "5-8 images",
            "platforms": ["instagram", "facebook", "twitter"],
            "priority": "high",
            "cultural_elements": cultural_analysis.audience_profile.get("values", [])[:3]
        })
        
        # Platform-specific content
        if "video" in campaign_type.lower() or "mixed" in campaign_type.lower():
            recommendations.append({
                "content_type": "short_form_videos",
                "title": "Short-Form Video Series",
                "description": "Platform-optimized short videos for maximum engagement",
                "duration": "15-30 seconds",
                "platforms": ["tiktok", "instagram_reels", "youtube_shorts"],
                "priority": "medium",
                "cultural_elements": ["trending topics integration"]
            })
        
        return recommendations
    
    def _generate_campaign_timeline(self, campaign_type: str, budget_tier: str) -> Dict[str, Any]:
        """Generate campaign timeline based on type and budget"""
        
        base_duration = {
            "small": 4,    # weeks
            "medium": 8,
            "large": 12
        }.get(budget_tier, 6)
        
        return {
            "total_duration": f"{base_duration} weeks",
            "phases": [
                {
                    "phase": "Strategy & Planning",
                    "duration": "1 week",
                    "tasks": ["Cultural analysis", "Content strategy", "Creative briefs"]
                },
                {
                    "phase": "Content Creation",
                    "duration": f"{base_duration // 2} weeks",
                    "tasks": ["Video production", "Image creation", "Copy development"]
                },
                {
                    "phase": "Launch & Optimization",
                    "duration": f"{base_duration // 2} weeks",
                    "tasks": ["Campaign launch", "Performance monitoring", "Real-time optimization"]
                }
            ],
            "key_milestones": [
                f"Week 1: Strategy approval",
                f"Week {base_duration // 2}: Content completion",
                f"Week {base_duration}: Campaign completion"
            ]
        }
    
    def _generate_budget_breakdown(self, budget_tier: str, campaign_type: str) -> Dict[str, Any]:
        """Generate budget breakdown recommendations"""
        
        budget_ranges = {
            "small": {"min": 5000, "max": 15000},
            "medium": {"min": 15000, "max": 50000},
            "large": {"min": 50000, "max": 150000}
        }
        
        range_info = budget_ranges.get(budget_tier, budget_ranges["medium"])
        
        return {
            "tier": budget_tier,
            "estimated_range": f"${range_info['min']:,} - ${range_info['max']:,}",
            "breakdown": {
                "content_creation": "40-50%",
                "cultural_research": "10-15%",
                "platform_optimization": "15-20%",
                "performance_monitoring": "10-15%",
                "contingency": "10-15%"
            },
            "recommendations": [
                f"Prioritize cultural research for {budget_tier} tier campaigns",
                "Allocate sufficient budget for authentic representation",
                "Include performance monitoring and optimization costs"
            ]
        }
    
    def get_generation_history(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent generation history"""
        return self.generation_history[-limit:] if self.generation_history else []
    
    def _get_fallback_video_result(self, prompt: str, target_audience: str) -> Dict[str, Any]:
        """Fallback result when video generation fails"""
        return {
            "generation_id": f"video_fallback_{int(datetime.utcnow().timestamp())}",
            "type": "video",
            "status": "completed",
            "original_prompt": prompt,
            "enhanced_prompt": f"Professional video content for {target_audience}: {prompt}",
            "target_audience": target_audience,
            "cultural_analysis": {
                "cultural_score": 75,
                "insights": ["General audience alignment", "Professional presentation"],
                "recommendations": ["Add cultural specificity", "Include authentic elements"]
            },
            "video_concept": {
                "scene_description": f"Professional video showcasing {prompt}",
                "technical_specs": {"aspect_ratio": "16:9", "duration": "30s"},
                "veo_prompt": f"Create professional video: {prompt}"
            },
            "generation_timestamp": datetime.utcnow().isoformat(),
            "note": "Fallback result due to generation error"
        }
    
    def _get_fallback_image_result(self, prompt: str, target_audience: str) -> Dict[str, Any]:
        """Fallback result when image generation fails"""
        return {
            "generation_id": f"image_fallback_{int(datetime.utcnow().timestamp())}",
            "type": "image",
            "status": "completed",
            "original_prompt": prompt,
            "enhanced_prompt": f"Professional image content for {target_audience}: {prompt}",
            "target_audience": target_audience,
            "cultural_analysis": {
                "cultural_score": 75,
                "insights": ["General audience alignment", "Professional presentation"],
                "recommendations": ["Add cultural specificity", "Include authentic elements"]
            },
            "image_concept": {
                "visual_description": f"Professional image showcasing {prompt}",
                "technical_specs": {"aspect_ratio": "1:1", "resolution": "1024x1024"},
                "imagen_prompt": f"Create professional image: {prompt}"
            },
            "generation_timestamp": datetime.utcnow().isoformat(),
            "note": "Fallback result due to generation error"
        }
    
    def _get_fallback_strategy_result(self, brief: str, target_audience: str) -> Dict[str, Any]:
        """Fallback result when strategy generation fails"""
        return {
            "strategy_id": f"strategy_fallback_{int(datetime.utcnow().timestamp())}",
            "campaign_name": f"{target_audience.title()} Campaign Strategy",
            "brief": brief,
            "target_audience": target_audience,
            "cultural_analysis": {
                "cultural_score": 70,
                "insights": ["General market understanding", "Standard audience alignment"],
                "recommendations": ["Conduct deeper cultural research", "Add authentic elements"]
            },
            "creative_strategy": {
                "core_concept": "Professional campaign approach",
                "execution_recommendations": ["Focus on quality content", "Maintain brand consistency"]
            },
            "generation_timestamp": datetime.utcnow().isoformat(),
            "note": "Fallback strategy due to generation error"
        }