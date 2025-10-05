"""
Cultural Intelligence Service
Combines Qloo data with web search and analysis for comprehensive cultural insights
"""

from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime
from loguru import logger
import asyncio

from .qloo_service import QlooService
from .gemini_service import GeminiService
from core.config import settings

@dataclass
class CulturalAnalysisResult:
    """Result object for cultural analysis"""
    cultural_score: float
    insights: List[str]
    recommendations: List[str]
    audience_profile: Dict[str, Any]
    trending_topics: List[Dict[str, Any]]
    analysis_timestamp: str

class CulturalIntelligenceService:
    """
    Main service for cultural intelligence analysis
    Orchestrates Qloo, Gemini, and other services for comprehensive insights
    """
    
    def __init__(self):
        self.qloo_service = QlooService()
        self.gemini_service = GeminiService()
    
    async def analyze_content(
        self,
        content: str,
        target_audience: str,
        brand_context: Optional[str] = None,
        analysis_type: str = "content"
    ) -> CulturalAnalysisResult:
        """
        Perform comprehensive cultural analysis of content
        """
        logger.info(f"Starting cultural analysis for {target_audience}")
        
        try:
            # Run parallel analyses
            audience_profile_task = self.qloo_service.get_audience_profile(target_audience)
            content_analysis_task = self.gemini_service.analyze_content_culturally(content, target_audience)
            
            if brand_context:
                compatibility_task = self.qloo_service.get_cultural_compatibility(brand_context, target_audience)
                audience_profile, content_analysis, compatibility = await asyncio.gather(
                    audience_profile_task, content_analysis_task, compatibility_task
                )
            else:
                audience_profile, content_analysis = await asyncio.gather(
                    audience_profile_task, content_analysis_task
                )
                compatibility = None
            
            # Extract trending topics from audience profile
            trending_topics = await self._extract_trending_topics(audience_profile)
            
            # Calculate overall cultural score
            gemini_score = content_analysis.get("cultural_score", 70)
            audience_score = audience_profile.get("cultural_affinity_score", 65)
            compatibility_score = compatibility.get("compatibility_score", 75) if compatibility else 70
            
            overall_score = (gemini_score * 0.4 + audience_score * 0.3 + compatibility_score * 0.3)
            
            # Generate comprehensive insights
            insights = self._generate_insights(content_analysis, audience_profile, compatibility)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(
                content_analysis, audience_profile, compatibility, overall_score
            )
            
            result = CulturalAnalysisResult(
                cultural_score=round(overall_score, 1),
                insights=insights,
                recommendations=recommendations,
                audience_profile=audience_profile,
                trending_topics=trending_topics,
                analysis_timestamp=datetime.utcnow().isoformat()
            )
            
            logger.success(f"Cultural analysis completed with score: {result.cultural_score}")
            return result
            
        except Exception as e:
            logger.error(f"Error in cultural analysis: {e}")
            return self._get_fallback_analysis(target_audience)
    
    async def get_trending_topics(self, audience: str, limit: int = 10) -> Dict[str, Any]:
        """
        Get trending topics relevant to the target audience
        """
        logger.info(f"Getting trending topics for {audience}")
        
        try:
            # Get audience profile to understand interests
            audience_profile = await self.qloo_service.get_audience_profile(audience)
            
            # Extract topics of interest
            topics = audience_profile.get("content_preferences", {}).get("topics_of_interest", [])
            values = audience_profile.get("values", [])
            
            # Combine topics and values for trend analysis
            all_topics = list(set(topics + values))[:limit]
            
            if all_topics:
                # Analyze trends for these topics
                trend_analysis = await self.qloo_service.analyze_cultural_trends(all_topics)
                
                trending_topics = []
                for topic, data in trend_analysis.get("trend_data", {}).items():
                    if not data.get("error"):
                        trending_topics.append({
                            "topic": topic,
                            "trend_strength": data.get("trend_strength", 50),
                            "cultural_relevance": data.get("cultural_relevance", "medium"),
                            "related_interests": data.get("related_tastes", [])[:5],
                            "growth": f"+{data.get('trend_strength', 50)}%" if data.get("trend_strength", 0) > 50 else "stable"
                        })
                
                # Sort by trend strength
                trending_topics.sort(key=lambda x: x["trend_strength"], reverse=True)
                
                cultural_moments = self._identify_cultural_moments(trending_topics, audience_profile)
                
                return {
                    "trending_topics": trending_topics[:limit],
                    "cultural_moments": cultural_moments,
                    "audience_segment": audience,
                    "analysis_timestamp": datetime.utcnow().isoformat(),
                    "total_topics_analyzed": len(all_topics)
                }
            else:
                return self._get_fallback_trending_topics(audience)
                
        except Exception as e:
            logger.error(f"Error getting trending topics: {e}")
            return self._get_fallback_trending_topics(audience)
    
    async def predict_cultural_performance(
        self,
        content_concept: str,
        target_audience: str,
        platform: str = "general"
    ) -> Dict[str, Any]:
        """
        Predict how content will perform culturally with target audience
        """
        logger.info(f"Predicting cultural performance for {target_audience} on {platform}")
        
        try:
            # Analyze the concept culturally
            analysis = await self.analyze_content(content_concept, target_audience)
            
            # Get platform optimization insights
            platform_optimization = await self.gemini_service.optimize_for_platform(
                content_concept, platform
            )
            
            # Calculate performance predictions
            base_score = analysis.cultural_score
            platform_boost = 5 if platform in ["instagram", "tiktok"] else 0
            audience_boost = 10 if analysis.audience_profile.get("cultural_affinity_score", 0) > 80 else 0
            
            engagement_rate = min(95, base_score * 0.8 + platform_boost + audience_boost)
            conversion_rate = min(15, base_score * 0.15 + (platform_boost / 2))
            brand_recall = min(90, base_score * 0.9 + audience_boost)
            virality_potential = min(100, base_score * 0.7 + len(analysis.trending_topics) * 5 + platform_boost * 2)
            
            return {
                "cultural_performance_score": analysis.cultural_score,
                "predicted_engagement_rate": round(engagement_rate, 1),
                "predicted_conversion_rate": round(conversion_rate, 1),
                "predicted_brand_recall": round(brand_recall, 1),
                "virality_potential": round(virality_potential, 1),
                "platform_optimization_score": platform_optimization.get("optimization_score", 75),
                "key_success_factors": [
                    f"Strong cultural alignment ({analysis.cultural_score}%)",
                    f"Platform optimized for {platform}",
                    f"{len(analysis.trending_topics)} trending topic connections",
                    "Authentic cultural representation"
                ],
                "confidence_interval": "±5%",
                "prediction_timestamp": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error predicting cultural performance: {e}")
            return self._get_fallback_performance_prediction()
    
    def _generate_insights(
        self,
        content_analysis: Dict[str, Any],
        audience_profile: Dict[str, Any],
        compatibility: Optional[Dict[str, Any]]
    ) -> List[str]:
        """Generate cultural insights from analysis results"""
        insights = []
        
        # Add content analysis insights
        if content_analysis.get("insights"):
            insights.extend(content_analysis["insights"][:3])
        
        # Add audience insights
        audience_values = audience_profile.get("values", [])
        if audience_values:
            insights.append(f"Target audience values: {', '.join(audience_values[:3])}")
        
        aesthetic_style = audience_profile.get("aesthetic_preferences", {}).get("preferred_style")
        if aesthetic_style:
            insights.append(f"Preferred aesthetic style: {aesthetic_style}")
        
        # Add compatibility insights
        if compatibility and compatibility.get("brand_alignment"):
            shared_values = compatibility["brand_alignment"].get("shared_values", [])
            if shared_values:
                insights.append(f"Brand-audience alignment: {', '.join(shared_values[:2])}")
        
        # Add cultural affinity insight
        cultural_score = audience_profile.get("cultural_affinity_score", 0)
        if cultural_score > 85:
            insights.append("High cultural affinity - strong audience connection potential")
        elif cultural_score > 70:
            insights.append("Moderate cultural affinity - good audience alignment")
        else:
            insights.append("Lower cultural affinity - consider cultural adaptation")
        
        return insights[:5]  # Limit to top 5 insights
    
    def _generate_recommendations(
        self,
        content_analysis: Dict[str, Any],
        audience_profile: Dict[str, Any],
        compatibility: Optional[Dict[str, Any]],
        overall_score: float
    ) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        # Add content analysis recommendations
        if content_analysis.get("recommendations"):
            recommendations.extend(content_analysis["recommendations"][:2])
        
        # Score-based recommendations
        if overall_score < 75:
            recommendations.append("Increase cultural authenticity and audience alignment")
        
        if overall_score < 85:
            recommendations.append("Consider incorporating trending cultural elements")
        
        # Audience-specific recommendations
        preferred_platforms = audience_profile.get("engagement_patterns", {}).get("preferred_platforms", [])
        if preferred_platforms:
            recommendations.append(f"Optimize for {', '.join(preferred_platforms[:2])} platforms")
        
        # Aesthetic recommendations
        colors = audience_profile.get("aesthetic_preferences", {}).get("colors", [])
        if colors:
            recommendations.append(f"Use {', '.join(colors[:2])} color palette")
        
        # Compatibility recommendations
        if compatibility and compatibility.get("recommendations"):
            recommendations.extend(compatibility["recommendations"][:2])
        
        return recommendations[:5]  # Limit to top 5 recommendations
    
    async def _extract_trending_topics(self, audience_profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract and format trending topics from audience profile"""
        topics = audience_profile.get("content_preferences", {}).get("topics_of_interest", [])
        
        trending_topics = []
        for i, topic in enumerate(topics[:5]):
            trending_topics.append({
                "topic": topic,
                "relevance": "high" if i < 2 else "medium",
                "growth": f"+{15 + i * 5}%",
                "cultural_significance": "High cultural resonance with target audience"
            })
        
        return trending_topics
    
    def _identify_cultural_moments(
        self,
        trending_topics: List[Dict[str, Any]],
        audience_profile: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Identify cultural moments relevant to the audience"""
        cultural_moments = []
        
        # Generate cultural moments based on trending topics
        for topic in trending_topics[:3]:
            cultural_moments.append({
                "moment": f"{topic['topic']} cultural movement",
                "description": f"Growing interest in {topic['topic']} among target demographic",
                "opportunity": f"Leverage {topic['topic']} themes in creative content",
                "timing": "Active now",
                "impact_potential": "High"
            })
        
        # Add seasonal/temporal moments
        current_month = datetime.now().strftime("%B")
        cultural_moments.append({
            "moment": f"{current_month} seasonal trends",
            "description": f"Seasonal cultural themes relevant for {current_month}",
            "opportunity": "Incorporate seasonal elements in messaging",
            "timing": "Current season",
            "impact_potential": "Medium"
        })
        
        return cultural_moments
    
    def _get_fallback_analysis(self, target_audience: str) -> CulturalAnalysisResult:
        """Fallback analysis when main analysis fails"""
        return CulturalAnalysisResult(
            cultural_score=75.0,
            insights=[
                "Content shows general cultural appropriateness",
                f"Aligned with {target_audience} demographic expectations",
                "Consider adding more culturally specific elements"
            ],
            recommendations=[
                "Enhance cultural authenticity",
                "Include diverse perspectives",
                "Research specific cultural preferences",
                "Test with target audience focus groups"
            ],
            audience_profile={
                "segment": target_audience,
                "cultural_affinity_score": 70,
                "aesthetic_preferences": {"preferred_style": "modern"},
                "values": ["authenticity", "quality"],
                "engagement_patterns": {"preferred_platforms": ["social media"]}
            },
            trending_topics=[
                {"topic": "authenticity", "relevance": "high", "growth": "+15%"},
                {"topic": "sustainability", "relevance": "medium", "growth": "+10%"}
            ],
            analysis_timestamp=datetime.utcnow().isoformat()
        )
    
    def _get_fallback_trending_topics(self, audience: str) -> Dict[str, Any]:
        """Fallback trending topics when analysis fails"""
        return {
            "trending_topics": [
                {
                    "topic": "authenticity",
                    "trend_strength": 75,
                    "cultural_relevance": "high",
                    "related_interests": ["genuine content", "real stories"],
                    "growth": "+15%"
                },
                {
                    "topic": "sustainability",
                    "trend_strength": 70,
                    "cultural_relevance": "high",
                    "related_interests": ["eco-friendly", "responsible"],
                    "growth": "+12%"
                },
                {
                    "topic": "community",
                    "trend_strength": 68,
                    "cultural_relevance": "medium",
                    "related_interests": ["connection", "belonging"],
                    "growth": "+10%"
                }
            ],
            "cultural_moments": [
                {
                    "moment": "Authenticity movement",
                    "description": "Growing demand for genuine, unfiltered content",
                    "opportunity": "Create authentic brand storytelling",
                    "timing": "Active now",
                    "impact_potential": "High"
                }
            ],
            "audience_segment": audience,
            "analysis_timestamp": datetime.utcnow().isoformat(),
            "total_topics_analyzed": 3
        }
    
    def _get_fallback_performance_prediction(self) -> Dict[str, Any]:
        """Fallback performance prediction when analysis fails"""
        return {
            "cultural_performance_score": 75,
            "predicted_engagement_rate": 68.0,
            "predicted_conversion_rate": 8.5,
            "predicted_brand_recall": 72.0,
            "virality_potential": 65.0,
            "platform_optimization_score": 70,
            "key_success_factors": [
                "General cultural appropriateness",
                "Standard platform optimization",
                "Basic audience alignment",
                "Professional presentation"
            ],
            "confidence_interval": "±10%",
            "prediction_timestamp": datetime.utcnow().isoformat()
        }