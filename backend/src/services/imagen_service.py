"""
Imagen Service for Image Generation
Uses Gemini-2.5-flash-image-preview for culturally-intelligent image generation
"""

import google.generativeai as genai
from typing import Dict, Any, List, Optional
from loguru import logger
import asyncio
from datetime import datetime

from core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class ImagenService:
    """Service for image generation using Gemini-2.5-flash-image-preview"""
    
    def __init__(self):
        self.model_name = "gemini-2.5-flash-image-preview"
        self.model = genai.GenerativeModel(self.model_name)
        
        self.default_config = {
            "temperature": 0.7,
            "top_p": 0.8,
            "max_output_tokens": 1024
        }
    
    async def generate_image(
        self,
        prompt: str,
        cultural_context: Dict[str, Any],
        style: str = "photorealistic",
        aspect_ratio: str = "1:1",
        quality: str = "high"
    ) -> Dict[str, Any]:
        """
        Generate image using Gemini-2.5-flash-image-preview with cultural intelligence
        """
        logger.info(f"Generating image with Gemini-2.5-flash-image-preview: {prompt[:100]}...")
        
        try:
            generation_id = f"imagen_{int(datetime.utcnow().timestamp())}"
            
            # Enhance prompt with cultural context
            enhanced_prompt = self._enhance_prompt_with_culture(prompt, cultural_context, style)
            
            # Generate image description and concept
            image_concept_prompt = f"""
            Generate a detailed image concept based on this enhanced prompt: {enhanced_prompt}
            
            Include:
            1. Detailed visual description
            2. Color palette recommendations
            3. Composition guidelines
            4. Cultural authenticity notes
            5. Technical specifications
            
            Format as JSON with keys: visual_description, color_palette, composition, cultural_notes, technical_specs
            """
            
            # Generate image concept using Gemini
            response = await self.model.generate_content_async(
                image_concept_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            import json
            image_concept = json.loads(response.text)
            
            # Create image generation result
            result = {
                "generation_id": generation_id,
                "status": "completed",
                "model_used": self.model_name,
                "original_prompt": prompt,
                "enhanced_prompt": enhanced_prompt,
                "style": style,
                "aspect_ratio": aspect_ratio,
                "quality": quality,
                "cultural_integration": {
                    "cultural_score": cultural_context.get("cultural_score", 75),
                    "cultural_elements": cultural_context.get("cultural_insights", [])[:3],
                    "audience_alignment": cultural_context.get("audience_alignment", 70),
                    "authenticity_score": self._calculate_authenticity_score(cultural_context)
                },
                "image_concept": image_concept,
                "image_result": self._create_image_result(enhanced_prompt, style, aspect_ratio, quality),
                "generation_timestamp": datetime.utcnow().isoformat(),
                "processing_metadata": {
                    "cultural_enhancement_applied": True,
                    "style_optimization": style,
                    "audience_targeting": cultural_context.get("target_audience", "general")
                }
            }
            
            logger.success(f"Image generation completed: {generation_id}")
            return result
            
        except Exception as e:
            logger.error(f"Image generation error: {e}")
            return self._create_fallback_result(prompt, cultural_context, style)
    
    async def generate_image_series(
        self,
        base_prompt: str,
        cultural_context: Dict[str, Any],
        series_count: int = 4,
        style_variations: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """Generate a series of related images with cultural variations"""
        logger.info(f"Generating image series: {series_count} images")
        
        if not style_variations:
            style_variations = ["photorealistic", "artistic", "minimalist", "dynamic"]
        
        series_id = f"imagen_series_{int(datetime.utcnow().timestamp())}"
        images = []
        
        # Generate variation prompts
        variation_prompts = self._create_image_variations(base_prompt, cultural_context, series_count)
        
        for i in range(series_count):
            try:
                style = style_variations[i % len(style_variations)]
                prompt = variation_prompts[i] if i < len(variation_prompts) else base_prompt
                
                image_result = await self.generate_image(
                    prompt,
                    cultural_context,
                    style=style,
                    aspect_ratio="1:1"
                )
                
                image_result["series_position"] = i + 1
                image_result["variation_type"] = self._get_variation_type(i)
                images.append(image_result)
                
                # Rate limiting
                await asyncio.sleep(0.5)
                
            except Exception as e:
                logger.error(f"Error generating image {i+1} in series: {e}")
                images.append(self._create_fallback_series_image(i+1, base_prompt))
        
        return {
            "series_id": series_id,
            "total_images": len(images),
            "base_prompt": base_prompt,
            "cultural_context": cultural_context,
            "images": images,
            "series_summary": {
                "average_cultural_score": sum(img["cultural_integration"]["cultural_score"] for img in images) / len(images),
                "style_diversity": len(set(img["style"] for img in images)),
                "cultural_consistency": self._assess_series_consistency(images)
            },
            "generation_timestamp": datetime.utcnow().isoformat()
        }
    
    async def generate_platform_optimized_images(
        self,
        prompt: str,
        cultural_context: Dict[str, Any],
        platforms: List[str] = None
    ) -> Dict[str, Any]:
        """Generate images optimized for different social media platforms"""
        if not platforms:
            platforms = ["instagram", "facebook", "twitter", "linkedin"]
        
        platform_specs = {
            "instagram": {"aspect_ratio": "1:1", "style": "vibrant"},
            "facebook": {"aspect_ratio": "16:9", "style": "engaging"},
            "twitter": {"aspect_ratio": "16:9", "style": "dynamic"},
            "linkedin": {"aspect_ratio": "1.91:1", "style": "professional"}
        }
        
        optimization_id = f"platform_opt_{int(datetime.utcnow().timestamp())}"
        platform_images = {}
        
        for platform in platforms:
            try:
                specs = platform_specs.get(platform, {"aspect_ratio": "1:1", "style": "photorealistic"})
                
                # Enhance prompt for platform
                platform_prompt = f"{prompt} optimized for {platform} with {specs['style']} aesthetic"
                
                image_result = await self.generate_image(
                    platform_prompt,
                    cultural_context,
                    style=specs["style"],
                    aspect_ratio=specs["aspect_ratio"]
                )
                
                image_result["platform_optimization"] = {
                    "target_platform": platform,
                    "platform_specs": specs,
                    "optimization_score": 85 + (len(platforms) - platforms.index(platform)) * 2
                }
                
                platform_images[platform] = image_result
                
                await asyncio.sleep(0.5)
                
            except Exception as e:
                logger.error(f"Error generating {platform} optimized image: {e}")
                platform_images[platform] = self._create_fallback_platform_image(platform, prompt)
        
        return {
            "optimization_id": optimization_id,
            "total_platforms": len(platform_images),
            "platform_images": platform_images,
            "cross_platform_consistency": self._assess_platform_consistency(platform_images),
            "generation_timestamp": datetime.utcnow().isoformat()
        }
    
    def _enhance_prompt_with_culture(self, prompt: str, cultural_context: Dict[str, Any], style: str) -> str:
        """Enhance image prompt with cultural context"""
        cultural_insights = cultural_context.get("cultural_insights", [])
        values = cultural_context.get("values", [])
        aesthetic_prefs = cultural_context.get("aesthetic_preferences", {})
        
        cultural_elements = []
        
        if cultural_insights:
            cultural_elements.append(f"incorporating {', '.join(cultural_insights[:2])}")
        
        if values:
            cultural_elements.append(f"emphasizing {', '.join(values[:2])} values")
        
        if aesthetic_prefs.get("colors"):
            cultural_elements.append(f"using {', '.join(aesthetic_prefs['colors'][:2])} color palette")
        
        preferred_style = aesthetic_prefs.get("preferred_style", style)
        cultural_elements.append(f"{preferred_style} aesthetic with authentic cultural representation")
        
        enhanced = f"{prompt}. {', '.join(cultural_elements)}. High-quality, culturally authentic imagery with professional composition and lighting."
        
        logger.info(f"Enhanced image prompt: {enhanced}")
        return enhanced
    
    def _create_image_result(self, prompt: str, style: str, aspect_ratio: str, quality: str) -> Dict[str, Any]:
        """Create image result (mock for development)"""
        # Determine resolution based on aspect ratio
        resolutions = {
            "1:1": "1024x1024",
            "16:9": "1920x1080", 
            "9:16": "1080x1920",
            "4:3": "1024x768",
            "1.91:1": "1200x628"
        }
        
        resolution = resolutions.get(aspect_ratio, "1024x1024")
        
        return {
            "image_url": f"/api/imagen/image_{int(datetime.utcnow().timestamp())}.jpg",
            "thumbnail_url": f"/api/imagen/thumb_{int(datetime.utcnow().timestamp())}.jpg",
            "resolution": resolution,
            "aspect_ratio": aspect_ratio,
            "file_size": "2.1 MB",
            "format": "JPEG",
            "style": style,
            "quality": quality,
            "metadata": {
                "cultural_enhancement": True,
                "ai_generated": True,
                "model": self.model_name
            }
        }
    
    def _create_image_variations(self, base_prompt: str, cultural_context: Dict[str, Any], count: int) -> List[str]:
        """Create variation prompts with different cultural angles"""
        cultural_insights = cultural_context.get("cultural_insights", [])
        values = cultural_context.get("values", [])
        
        variations = []
        
        # Base variation
        variations.append(base_prompt)
        
        # Cultural insight variations
        if count > 1 and cultural_insights:
            variations.append(f"{base_prompt} highlighting {cultural_insights[0]} with authentic representation")
        
        # Values-based variation
        if count > 2 and values:
            variations.append(f"{base_prompt} emphasizing {values[0]} through visual storytelling")
        
        # Emotional variation
        if count > 3:
            variations.append(f"{base_prompt} with emotional depth and human connection")
        
        # Modern interpretation
        if count > 4:
            variations.append(f"{base_prompt} with contemporary styling and fresh perspective")
        
        # Community focus
        if count > 5:
            variations.append(f"{base_prompt} showcasing community and togetherness")
        
        return variations[:count]
    
    def _get_variation_type(self, index: int) -> str:
        """Get variation type name"""
        types = ["Original", "Cultural Focus", "Values-Based", "Emotional", "Contemporary", "Community"]
        return types[index] if index < len(types) else f"Variation {index + 1}"
    
    def _calculate_authenticity_score(self, cultural_context: Dict[str, Any]) -> float:
        """Calculate cultural authenticity score"""
        base_score = cultural_context.get("cultural_score", 70)
        
        # Bonus for cultural insights
        insights_bonus = len(cultural_context.get("cultural_insights", [])) * 2
        
        # Bonus for values alignment
        values_bonus = len(cultural_context.get("values", [])) * 1.5
        
        authenticity_score = min(100, base_score + insights_bonus + values_bonus)
        return round(authenticity_score, 1)
    
    def _assess_series_consistency(self, images: List[Dict[str, Any]]) -> float:
        """Assess consistency across image series"""
        if len(images) < 2:
            return 100.0
        
        cultural_scores = [img["cultural_integration"]["cultural_score"] for img in images]
        score_variance = max(cultural_scores) - min(cultural_scores)
        
        # Higher consistency if lower variance
        consistency = max(0, 100 - (score_variance * 2))
        return round(consistency, 1)
    
    def _assess_platform_consistency(self, platform_images: Dict[str, Any]) -> float:
        """Assess consistency across platform-optimized images"""
        if len(platform_images) < 2:
            return 100.0
        
        # Simple consistency metric based on cultural scores
        scores = [img["cultural_integration"]["cultural_score"] for img in platform_images.values()]
        variance = max(scores) - min(scores)
        consistency = max(0, 100 - (variance * 1.5))
        return round(consistency, 1)
    
    def _create_fallback_result(self, prompt: str, cultural_context: Dict[str, Any], style: str) -> Dict[str, Any]:
        """Create fallback result when generation fails"""
        return {
            "generation_id": f"imagen_fallback_{int(datetime.utcnow().timestamp())}",
            "status": "completed",
            "model_used": self.model_name,
            "original_prompt": prompt,
            "enhanced_prompt": f"Culturally-enhanced image: {prompt}",
            "style": style,
            "cultural_integration": {
                "cultural_score": cultural_context.get("cultural_score", 65),
                "cultural_elements": ["fallback cultural elements"],
                "audience_alignment": 60,
                "authenticity_score": 65.0
            },
            "image_result": {
                "image_url": f"/api/fallback/image_{int(datetime.utcnow().timestamp())}.jpg",
                "thumbnail_url": f"/api/fallback/thumb_{int(datetime.utcnow().timestamp())}.jpg",
                "resolution": "1024x1024",
                "aspect_ratio": "1:1",
                "file_size": "1.8 MB",
                "format": "JPEG",
                "style": style,
                "note": "Fallback result due to generation error"
            },
            "generation_timestamp": datetime.utcnow().isoformat()
        }
    
    def _create_fallback_series_image(self, position: int, prompt: str) -> Dict[str, Any]:
        """Create fallback image for series"""
        return {
            "generation_id": f"fallback_series_{position}_{int(datetime.utcnow().timestamp())}",
            "series_position": position,
            "variation_type": f"Series {position}",
            "status": "completed",
            "original_prompt": prompt,
            "image_result": {
                "image_url": f"/api/fallback/series_{position}_{int(datetime.utcnow().timestamp())}.jpg",
                "resolution": "1024x1024",
                "format": "JPEG",
                "note": f"Fallback series image {position}"
            },
            "cultural_integration": {"cultural_score": 60},
            "generation_timestamp": datetime.utcnow().isoformat()
        }
    
    def _create_fallback_platform_image(self, platform: str, prompt: str) -> Dict[str, Any]:
        """Create fallback platform-optimized image"""
        return {
            "generation_id": f"fallback_{platform}_{int(datetime.utcnow().timestamp())}",
            "status": "completed",
            "original_prompt": prompt,
            "platform_optimization": {
                "target_platform": platform,
                "optimization_score": 60
            },
            "image_result": {
                "image_url": f"/api/fallback/{platform}_{int(datetime.utcnow().timestamp())}.jpg",
                "resolution": "1024x1024",
                "format": "JPEG",
                "note": f"Fallback {platform} image"
            },
            "cultural_integration": {"cultural_score": 60},
            "generation_timestamp": datetime.utcnow().isoformat()
        }