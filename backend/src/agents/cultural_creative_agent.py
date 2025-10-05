"""
Enhanced AI Agent for Cultural Creative Intelligence
Combines cultural analysis with creative generation recommendations
"""

from typing import Dict, List, Any, Optional
import asyncio
from datetime import datetime
import json

from services.cultural_intelligence import CulturalIntelligenceService
from services.creative_generation import CreativeGenerationService
from services.qloo_service import QlooService
from services.gemini_service import GeminiService
from core.config import settings

class CulturalCreativeAgent:
    """
    Advanced AI agent that orchestrates cultural analysis and creative generation
    Based on ReAct (Reasoning + Acting) pattern from Alloy project
    Enhanced with creative generation capabilities from VEO-3 project
    """
    
    def __init__(self):
        self.cultural_service = CulturalIntelligenceService()
        self.creative_service = CreativeGenerationService()
        self.qloo_service = QlooService()
        self.gemini_service = GeminiService()
        
        self.conversation_history = []
        self.analysis_cache = {}
        
    async def execute_cultural_creative_workflow(
        self,
        brief: str,
        target_audience: str,
        brand_context: Optional[str] = None,
        creative_type: str = "video"  # video, image, campaign
    ) -> Dict[str, Any]:
        """
        Main workflow that combines cultural intelligence with creative generation
        """
        
        workflow_id = f"workflow_{datetime.utcnow().timestamp()}"
        
        # Step 1: Cultural Analysis
        cultural_analysis = await self._analyze_cultural_context(
            brief, target_audience, brand_context
        )
        
        # Step 2: Creative Strategy Generation
        creative_strategy = await self._generate_creative_strategy(
            brief, cultural_analysis, creative_type
        )
        
        # Step 3: Content Generation Recommendations
        content_recommendations = await self._generate_content_recommendations(
            creative_strategy, cultural_analysis
        )
        
        # Step 4: Optimization Suggestions
        optimization_suggestions = await self._generate_optimization_suggestions(
            cultural_analysis, creative_strategy
        )
        
        # Step 5: Performance Predictions
        performance_predictions = await self._predict_performance(
            cultural_analysis, creative_strategy
        )
        
        return {
            "workflow_id": workflow_id,
            "cultural_analysis": cultural_analysis,
            "creative_strategy": creative_strategy,
            "content_recommendations": content_recommendations,
            "optimization_suggestions": optimization_suggestions,
            "performance_predictions": performance_predictions,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def _analyze_cultural_context(
        self, brief: str, target_audience: str, brand_context: Optional[str]
    ) -> Dict[str, Any]:
        """Analyze cultural context using Taste AI and cultural intelligence"""
        
        # Get audience profile from Qloo Taste AI
        audience_profile = await self.qloo_service.get_audience_profile(target_audience)
        
        # Perform cultural analysis
        cultural_analysis = await self.cultural_service.analyze_content(
            content=brief,
            target_audience=target_audience,
            brand_context=brand_context,
            analysis_type="content"
        )
        
        # Get trending topics relevant to audience
        trending_topics = await self.cultural_service.get_trending_topics(
            audience=target_audience
        )
        
        return {
            "audience_profile": audience_profile,
            "cultural_score": cultural_analysis.cultural_score,
            "cultural_insights": cultural_analysis.insights,
            "trending_topics": trending_topics.get("trending_topics", []),
            "cultural_moments": trending_topics.get("cultural_moments", []),
            "values_alignment": audience_profile.get("values", []),
            "aesthetic_preferences": audience_profile.get("aesthetic_preferences", {}),
            "content_preferences": audience_profile.get("content_preferences", {})
        }
    
    async def _generate_creative_strategy(
        self, brief: str, cultural_analysis: Dict[str, Any], creative_type: str
    ) -> Dict[str, Any]:
        """Generate creative strategy using enhanced Gemini analysis"""
        
        strategy_prompt = f"""
        Based on the following inputs, create a comprehensive creative strategy:
        
        BRIEF: {brief}
        CREATIVE TYPE: {creative_type}
        
        CULTURAL ANALYSIS:
        - Cultural Score: {cultural_analysis['cultural_score']}%
        - Key Insights: {', '.join(cultural_analysis['cultural_insights'])}
        - Trending Topics: {', '.join([t.get('topic', '') for t in cultural_analysis['trending_topics'][:5]])}
        - Values Alignment: {', '.join(cultural_analysis['values_alignment'])}
        
        AUDIENCE PREFERENCES:
        - Aesthetic: {json.dumps(cultural_analysis['aesthetic_preferences'])}
        - Content: {json.dumps(cultural_analysis['content_preferences'])}
        
        Please provide:
        1. Core Creative Concept
        2. Visual Direction
        3. Messaging Strategy
        4. Execution Recommendations
        5. Cultural Integration Points
        
        Format as structured JSON.
        """
        
        strategy_response = await self.gemini_service.generate_strategy(strategy_prompt)
        
        return {
            "core_concept": strategy_response.get("core_concept", ""),
            "visual_direction": strategy_response.get("visual_direction", {}),
            "messaging_strategy": strategy_response.get("messaging_strategy", {}),
            "execution_recommendations": strategy_response.get("execution_recommendations", []),
            "cultural_integration": strategy_response.get("cultural_integration", []),
            "rationale": strategy_response.get("rationale", "")
        }
    
    async def _generate_content_recommendations(
        self, creative_strategy: Dict[str, Any], cultural_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate specific content creation recommendations"""
        
        # Generate prompts for video/image generation
        enhanced_prompts = await self._enhance_prompts_with_cultural_context(
            base_concept=creative_strategy["core_concept"],
            cultural_insights=cultural_analysis["cultural_insights"],
            aesthetic_preferences=cultural_analysis["aesthetic_preferences"]
        )
        
        # Generate content variations
        content_variations = await self._generate_content_variations(
            creative_strategy, cultural_analysis
        )
        
        return {
            "enhanced_prompts": enhanced_prompts,
            "content_variations": content_variations,
            "recommended_formats": self._get_recommended_formats(cultural_analysis),
            "aspect_ratios": self._get_recommended_aspect_ratios(cultural_analysis),
            "style_guidelines": self._get_style_guidelines(cultural_analysis),
            "tone_recommendations": self._get_tone_recommendations(cultural_analysis)
        }
    
    async def _generate_optimization_suggestions(
        self, cultural_analysis: Dict[str, Any], creative_strategy: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Generate optimization suggestions for better cultural alignment"""
        
        suggestions = []
        
        # Cultural score optimization
        if cultural_analysis["cultural_score"] < 85:
            suggestions.append({
                "type": "cultural_alignment",
                "priority": "high",
                "suggestion": "Incorporate more authentic cultural references",
                "specific_actions": [
                    "Add trending cultural moments",
                    "Include diverse representation",
                    "Use culturally relevant symbols/colors"
                ]
            })
        
        # Trending topic integration
        trending_topics = cultural_analysis["trending_topics"][:3]
        if trending_topics:
            suggestions.append({
                "type": "trend_integration",
                "priority": "medium",
                "suggestion": f"Leverage trending topics: {', '.join([t.get('topic', '') for t in trending_topics])}",
                "specific_actions": [
                    f"Incorporate {topic.get('topic', '')} theme" 
                    for topic in trending_topics
                ]
            })
        
        return suggestions
    
    async def _predict_performance(
        self, cultural_analysis: Dict[str, Any], creative_strategy: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Predict performance metrics based on cultural alignment"""
        
        base_score = cultural_analysis["cultural_score"]
        
        # Simulate performance predictions based on cultural score
        engagement_rate = min(95, base_score * 1.2)
        conversion_rate = min(15, base_score * 0.15)
        brand_recall = min(90, base_score * 1.1)
        virality_potential = min(100, base_score * 0.8 + len(cultural_analysis["trending_topics"]) * 5)
        
        return {
            "predicted_engagement_rate": round(engagement_rate, 1),
            "predicted_conversion_rate": round(conversion_rate, 1),
            "predicted_brand_recall": round(brand_recall, 1),
            "virality_potential": round(virality_potential, 1),
            "cultural_resonance": base_score,
            "confidence_interval": "±5%",
            "key_success_factors": [
                "Strong cultural alignment",
                "Trending topic integration",
                "Authentic representation",
                "Platform-optimized format"
            ]
        }
    
    async def _enhance_prompts_with_cultural_context(
        self, base_concept: str, cultural_insights: List[str], aesthetic_preferences: Dict[str, Any]
    ) -> List[str]:
        """Enhance creative prompts with cultural context"""
        
        enhanced_prompts = []
        
        # Base enhanced prompt
        cultural_context = ", ".join(cultural_insights[:3])
        aesthetic_style = aesthetic_preferences.get("preferred_style", "modern")
        
        enhanced_prompts.append(
            f"{base_concept}. Incorporate {cultural_context}. Style: {aesthetic_style}, culturally authentic, high-quality professional content."
        )
        
        # Variations with different cultural emphasis
        for insight in cultural_insights[:2]:
            enhanced_prompts.append(
                f"{base_concept}. Emphasizing {insight}. {aesthetic_style} aesthetic with authentic cultural elements."
            )
        
        return enhanced_prompts
    
    async def _generate_content_variations(
        self, creative_strategy: Dict[str, Any], cultural_analysis: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Generate different content variations"""
        
        variations = []
        
        core_concept = creative_strategy["core_concept"]
        trending_topics = cultural_analysis["trending_topics"][:3]
        
        for i, topic in enumerate(trending_topics):
            variations.append({
                "variation_name": f"Trending Variation {i+1}",
                "concept": f"{core_concept} with {topic.get('topic', 'trending theme')} integration",
                "cultural_relevance": topic.get('relevance', 'medium'),
                "expected_engagement": f"+{topic.get('growth', '15%')} engagement boost"
            })
        
        return variations
    
    def _get_recommended_formats(self, cultural_analysis: Dict[str, Any]) -> List[str]:
        """Get recommended content formats based on audience preferences"""
        content_prefs = cultural_analysis.get("content_preferences", {})
        
        formats = []
        if content_prefs.get("prefers_video", True):
            formats.extend(["vertical_video", "square_video", "horizontal_video"])
        if content_prefs.get("prefers_images", True):
            formats.extend(["carousel_images", "single_hero_image", "collage"])
            
        return formats or ["vertical_video", "square_image"]
    
    def _get_recommended_aspect_ratios(self, cultural_analysis: Dict[str, Any]) -> List[str]:
        """Get recommended aspect ratios based on platform preferences"""
        # Default recommendations based on cultural analysis
        return ["9:16", "1:1", "16:9"]  # Mobile-first approach
    
    def _get_style_guidelines(self, cultural_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Get style guidelines based on aesthetic preferences"""
        aesthetic_prefs = cultural_analysis.get("aesthetic_preferences", {})
        
        return {
            "color_palette": aesthetic_prefs.get("colors", ["vibrant", "authentic"]),
            "visual_style": aesthetic_prefs.get("style", "modern"),
            "lighting": "natural, authentic",
            "composition": "dynamic, engaging",
            "authenticity_level": "high"
        }
    
    def _get_tone_recommendations(self, cultural_analysis: Dict[str, Any]) -> Dict[str, str]:
        """Get tone and messaging recommendations"""
        return {
            "primary_tone": "conversational",
            "emotional_appeal": "authentic",
            "communication_style": "direct",
            "cultural_sensitivity": "high"
        }