"""
Gemini AI Service for Creative Generation and Strategy
Enhanced with Veo-3 integration capabilities
"""

import google.generativeai as genai
from typing import Dict, Any, List, Optional, AsyncGenerator
from loguru import logger
import json
import asyncio
from datetime import datetime

from core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

class GeminiService:
    """Service for interacting with Google's Gemini AI models"""
    
    def __init__(self):
        self.text_model_name = "gemini-2.5-flash"  # For text/strategy generation
        self.image_model_name = "gemini-2.5-flash-image-preview"  # For image generation
        self.video_model_name = "veo-3.0-generate-preview"  # For video generation
        
        self.text_model = genai.GenerativeModel(self.text_model_name)
        self.image_model = genai.GenerativeModel(self.image_model_name)
        
        self.default_config = {
            "temperature": 0.7,
            "top_p": 0.8,
            "max_output_tokens": 2048
        }
    
    async def generate_strategy(self, strategy_prompt: str) -> Dict[str, Any]:
        """
        Generate comprehensive creative strategy using Gemini
        """
        logger.info("Generating creative strategy with Gemini")
        
        try:
            enhanced_prompt = f"""
            You are a world-class creative strategist with deep expertise in advertising and cultural intelligence.
            Analyze the provided information and create a comprehensive creative strategy.
            
            {strategy_prompt}
            
            Provide your response as a structured JSON object with the following keys:
            - core_concept: The main creative concept (string)
            - visual_direction: Object with style, colors, composition, lighting
            - messaging_strategy: Object with primary_message, tone, key_points, call_to_action
            - execution_recommendations: Array of specific execution steps
            - cultural_integration: Array of cultural integration points
            - rationale: Detailed explanation of the strategy choices
            
            Ensure all recommendations are culturally sensitive and aligned with the target audience.
            """
            
            response = await self.text_model.generate_content_async(
                enhanced_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            strategy_data = json.loads(response.text)
            logger.success("Creative strategy generated successfully")
            return strategy_data
            
        except Exception as e:
            logger.error(f"Error generating creative strategy: {e}")
            return self._get_fallback_strategy()
    
    async def generate_video_concept(self, prompt: str, cultural_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate video concept with Veo-3 style prompts
        """
        logger.info("Generating video concept for Veo-3")
        
        try:
            cultural_elements = cultural_context.get("cultural_insights", [])
            aesthetic_prefs = cultural_context.get("aesthetic_preferences", {})
            
            enhanced_prompt = f"""
            Create a detailed video concept for this request: {prompt}
            
            Cultural Context:
            - Cultural insights: {', '.join(cultural_elements[:5])}
            - Preferred style: {aesthetic_prefs.get('preferred_style', 'modern')}
            - Visual elements: {', '.join(aesthetic_prefs.get('visual_elements', [])[:5])}
            
            Generate a comprehensive video concept including:
            1. Scene description with specific visual details
            2. Lighting and color palette
            3. Camera movements and angles
            4. Cultural authenticity elements
            5. Emotional tone and pacing
            6. Technical specifications (aspect ratio, duration, style)
            
            Format as JSON with keys: scene_description, lighting, camera_work, cultural_elements, emotional_tone, technical_specs, veo_prompt
            The veo_prompt should be a detailed prompt optimized for Veo-3 video generation.
            """
            
            response = await self.text_model.generate_content_async(
                enhanced_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            concept_data = json.loads(response.text)
            
            # Add metadata
            concept_data["generation_timestamp"] = datetime.utcnow().isoformat()
            concept_data["model_used"] = self.model_name
            concept_data["cultural_alignment_score"] = self._calculate_alignment_score(cultural_context)
            
            logger.success("Video concept generated successfully")
            return concept_data
            
        except Exception as e:
            logger.error(f"Error generating video concept: {e}")
            return self._get_fallback_video_concept(prompt)
    
    async def generate_image_concept(self, prompt: str, cultural_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate image concept with Imagen style prompts
        """
        logger.info("Generating image concept for Imagen")
        
        try:
            cultural_elements = cultural_context.get("cultural_insights", [])
            aesthetic_prefs = cultural_context.get("aesthetic_preferences", {})
            
            enhanced_prompt = f"""
            Create a detailed image concept for: {prompt}
            
            Cultural Context:
            - Cultural insights: {', '.join(cultural_elements[:5])}
            - Preferred colors: {', '.join(aesthetic_prefs.get('colors', [])[:5])}
            - Visual style: {aesthetic_prefs.get('preferred_style', 'modern')}
            
            Generate a comprehensive image concept including:
            1. Detailed visual description
            2. Color palette and lighting
            3. Composition and framing
            4. Cultural authenticity elements
            5. Mood and atmosphere
            6. Technical details (resolution, aspect ratio, style)
            
            Format as JSON with keys: visual_description, color_palette, composition, cultural_elements, mood, technical_specs, imagen_prompt
            The imagen_prompt should be optimized for high-quality image generation.
            """
            
            response = await self.text_model.generate_content_async(
                enhanced_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            concept_data = json.loads(response.text)
            
            # Add metadata
            concept_data["generation_timestamp"] = datetime.utcnow().isoformat()
            concept_data["model_used"] = self.model_name
            concept_data["cultural_alignment_score"] = self._calculate_alignment_score(cultural_context)
            
            logger.success("Image concept generated successfully")
            return concept_data
            
        except Exception as e:
            logger.error(f"Error generating image concept: {e}")
            return self._get_fallback_image_concept(prompt)
    
    async def analyze_content_culturally(self, content: str, target_audience: str) -> Dict[str, Any]:
        """
        Analyze content for cultural appropriateness and alignment
        """
        logger.info(f"Analyzing cultural alignment for {target_audience}")
        
        try:
            analysis_prompt = f"""
            Analyze the following content for cultural appropriateness and alignment with the target audience.
            
            Content: {content}
            Target Audience: {target_audience}
            
            Provide analysis as JSON with:
            - cultural_score: Score from 0-100 for cultural appropriateness
            - insights: Array of cultural insights and observations
            - recommendations: Array of recommendations for improvement
            - potential_issues: Array of potential cultural sensitivity issues
            - strengths: Array of cultural strengths in the content
            - audience_alignment: Score from 0-100 for audience alignment
            
            Consider cultural sensitivity, representation, authenticity, and audience resonance.
            """
            
            response = await self.model.generate_content_async(
                analysis_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            analysis_data = json.loads(response.text)
            analysis_data["analysis_timestamp"] = datetime.utcnow().isoformat()
            
            logger.success("Cultural analysis completed")
            return analysis_data
            
        except Exception as e:
            logger.error(f"Error in cultural analysis: {e}")
            return self._get_fallback_analysis()
    
    async def generate_campaign_variations(self, base_concept: str, variations_count: int = 3) -> List[Dict[str, Any]]:
        """
        Generate multiple variations of a campaign concept
        """
        logger.info(f"Generating {variations_count} campaign variations")
        
        try:
            variations_prompt = f"""
            Based on this base creative concept: {base_concept}
            
            Generate {variations_count} distinct creative variations that:
            1. Maintain the core message but explore different executions
            2. Target different emotional responses or perspectives
            3. Use different visual or narrative approaches
            4. Consider different cultural angles
            
            For each variation, provide:
            - variation_name: Descriptive name
            - concept: The variation concept
            - key_differences: What makes this variation unique
            - target_emotion: Primary emotion it aims to evoke
            - execution_style: How it should be executed
            - cultural_angle: Cultural perspective it emphasizes
            
            Return as JSON array of variation objects.
            """
            
            response = await self.model.generate_content_async(
                variations_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            variations_data = json.loads(response.text)
            
            # Add metadata to each variation
            for i, variation in enumerate(variations_data):
                variation["variation_id"] = f"var_{int(datetime.utcnow().timestamp())}_{i}"
                variation["generated_at"] = datetime.utcnow().isoformat()
            
            logger.success(f"Generated {len(variations_data)} campaign variations")
            return variations_data
            
        except Exception as e:
            logger.error(f"Error generating campaign variations: {e}")
            return self._get_fallback_variations(base_concept)
    
    async def optimize_for_platform(self, content: str, platform: str) -> Dict[str, Any]:
        """
        Optimize content for specific platforms (Instagram, TikTok, YouTube, etc.)
        """
        logger.info(f"Optimizing content for {platform}")
        
        try:
            platform_specs = {
                "instagram": {"aspect_ratios": ["1:1", "9:16", "4:5"], "duration": "15-60s", "style": "polished"},
                "tiktok": {"aspect_ratios": ["9:16"], "duration": "15-30s", "style": "authentic"},
                "youtube": {"aspect_ratios": ["16:9"], "duration": "30s-2min", "style": "cinematic"},
                "facebook": {"aspect_ratios": ["16:9", "1:1"], "duration": "15-60s", "style": "storytelling"},
                "linkedin": {"aspect_ratios": ["16:9", "1:1"], "duration": "30-90s", "style": "professional"}
            }
            
            spec = platform_specs.get(platform.lower(), platform_specs["instagram"])
            
            optimization_prompt = f"""
            Optimize this content for {platform}: {content}
            
            Platform specifications:
            - Preferred aspect ratios: {spec['aspect_ratios']}
            - Typical duration: {spec['duration']}
            - Content style: {spec['style']}
            
            Provide optimization recommendations as JSON:
            - optimized_concept: Content adapted for the platform
            - technical_specs: Specific technical requirements
            - content_adjustments: How content should be modified
            - engagement_tactics: Platform-specific engagement strategies
            - hashtag_suggestions: Relevant hashtags (if applicable)
            - posting_recommendations: Best practices for posting
            """
            
            response = await self.model.generate_content_async(
                optimization_prompt,
                generation_config={
                    **self.default_config,
                    "response_mime_type": "application/json"
                }
            )
            
            optimization_data = json.loads(response.text)
            optimization_data["platform"] = platform
            optimization_data["optimized_at"] = datetime.utcnow().isoformat()
            
            logger.success(f"Content optimized for {platform}")
            return optimization_data
            
        except Exception as e:
            logger.error(f"Error optimizing for {platform}: {e}")
            return self._get_fallback_optimization(platform)
    
    def _calculate_alignment_score(self, cultural_context: Dict[str, Any]) -> float:
        """Calculate cultural alignment score based on available context"""
        score = 50  # Base score
        
        if cultural_context.get("cultural_insights"):
            score += len(cultural_context["cultural_insights"]) * 5
        
        if cultural_context.get("aesthetic_preferences"):
            score += 10
        
        if cultural_context.get("values"):
            score += len(cultural_context["values"]) * 3
        
        return min(100, score)
    
    def _get_fallback_strategy(self) -> Dict[str, Any]:
        """Fallback strategy when generation fails"""
        return {
            "core_concept": "Authentic brand storytelling with cultural sensitivity",
            "visual_direction": {
                "style": "modern",
                "colors": ["warm", "inviting"],
                "composition": "dynamic",
                "lighting": "natural"
            },
            "messaging_strategy": {
                "primary_message": "Connect authentically with your audience",
                "tone": "conversational",
                "key_points": ["authenticity", "quality", "values"],
                "call_to_action": "Experience the difference"
            },
            "execution_recommendations": [
                "Focus on authentic storytelling",
                "Use diverse representation",
                "Emphasize brand values"
            ],
            "cultural_integration": [
                "Include diverse perspectives",
                "Respect cultural nuances",
                "Ensure authentic representation"
            ],
            "rationale": "Fallback strategy prioritizing authenticity and cultural sensitivity"
        }
    
    def _get_fallback_video_concept(self, prompt: str) -> Dict[str, Any]:
        """Fallback video concept when generation fails"""
        return {
            "scene_description": f"Professional video concept for: {prompt}",
            "lighting": "Natural, warm lighting",
            "camera_work": "Steady, engaging shots",
            "cultural_elements": ["Inclusive representation", "Authentic scenarios"],
            "emotional_tone": "Positive and engaging",
            "technical_specs": {
                "aspect_ratio": "16:9",
                "duration": "30 seconds",
                "style": "professional"
            },
            "veo_prompt": f"Create a professional, culturally authentic video for: {prompt}",
            "generation_timestamp": datetime.utcnow().isoformat(),
            "cultural_alignment_score": 75
        }
    
    def _get_fallback_image_concept(self, prompt: str) -> Dict[str, Any]:
        """Fallback image concept when generation fails"""
        return {
            "visual_description": f"Professional image concept for: {prompt}",
            "color_palette": ["Warm", "Inviting", "Professional"],
            "composition": "Balanced and engaging",
            "cultural_elements": ["Diverse representation", "Authentic styling"],
            "mood": "Positive and professional",
            "technical_specs": {
                "resolution": "1024x1024",
                "aspect_ratio": "1:1",
                "style": "photorealistic"
            },
            "imagen_prompt": f"Create a professional, culturally authentic image for: {prompt}",
            "generation_timestamp": datetime.utcnow().isoformat(),
            "cultural_alignment_score": 75
        }
    
    def _get_fallback_analysis(self) -> Dict[str, Any]:
        """Fallback cultural analysis when generation fails"""
        return {
            "cultural_score": 75,
            "insights": ["Content appears culturally appropriate", "Consider adding more diverse perspectives"],
            "recommendations": ["Enhance cultural authenticity", "Include diverse representation"],
            "potential_issues": ["Limited cultural context available"],
            "strengths": ["Professional presentation", "Clear messaging"],
            "audience_alignment": 70,
            "analysis_timestamp": datetime.utcnow().isoformat()
        }
    
    def _get_fallback_variations(self, base_concept: str) -> List[Dict[str, Any]]:
        """Fallback variations when generation fails"""
        return [
            {
                "variation_name": "Emotional Focus",
                "concept": f"Emotional variation of: {base_concept}",
                "key_differences": "Emphasizes emotional connection",
                "target_emotion": "Warmth and connection",
                "execution_style": "Personal and intimate",
                "cultural_angle": "Universal human emotions"
            },
            {
                "variation_name": "Modern Approach",
                "concept": f"Modern interpretation of: {base_concept}",
                "key_differences": "Contemporary styling and approach",
                "target_emotion": "Innovation and progress",
                "execution_style": "Clean and modern",
                "cultural_angle": "Forward-thinking perspective"
            },
            {
                "variation_name": "Community Focus",
                "concept": f"Community-centered version of: {base_concept}",
                "key_differences": "Emphasizes community and togetherness",
                "target_emotion": "Belonging and unity",
                "execution_style": "Inclusive and diverse",
                "cultural_angle": "Community values and connection"
            }
        ]
    
    def _get_fallback_optimization(self, platform: str) -> Dict[str, Any]:
        """Fallback optimization when generation fails"""
        return {
            "optimized_concept": f"Content optimized for {platform}",
            "technical_specs": {
                "aspect_ratio": "1:1",
                "duration": "30 seconds",
                "format": "MP4 or JPG"
            },
            "content_adjustments": [f"Adapted for {platform} best practices"],
            "engagement_tactics": ["Use engaging visuals", "Include clear call-to-action"],
            "hashtag_suggestions": ["#brand", "#quality", "#authentic"],
            "posting_recommendations": ["Post during peak hours", "Engage with comments"],
            "platform": platform,
            "optimized_at": datetime.utcnow().isoformat()
        }