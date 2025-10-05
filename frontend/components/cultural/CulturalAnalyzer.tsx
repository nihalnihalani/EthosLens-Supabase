'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Heart,
  Search,
  RefreshCw,
  BarChart3,
  Eye,
  Sparkles,
  Globe,
  Calendar
} from 'lucide-react'

const demographicData = [
  {
    segment: 'Gen Z (18-25)',
    size: '32%',
    interests: ['Social Media', 'Gaming', 'Sustainability', 'Mental Health'],
    values: ['Authenticity', 'Diversity', 'Innovation'],
    preferredContent: ['Short Videos', 'Memes', 'Interactive Content'],
    culturalScore: 94,
    engagement: 'High'
  },
  {
    segment: 'Millennials (26-40)',
    size: '28%',
    interests: ['Career', 'Family', 'Travel', 'Technology'],
    values: ['Work-Life Balance', 'Experiences', 'Quality'],
    preferredContent: ['Long-form Articles', 'Tutorials', 'Behind-the-scenes'],
    culturalScore: 87,
    engagement: 'Medium'
  },
  {
    segment: 'Gen X (41-55)',
    size: '22%',
    interests: ['Finance', 'Health', 'Home', 'News'],
    values: ['Reliability', 'Practicality', 'Tradition'],
    preferredContent: ['Email Newsletters', 'Infographics', 'Reviews'],
    culturalScore: 73,
    engagement: 'Medium'
  },
  {
    segment: 'Baby Boomers (56+)',
    size: '18%',
    interests: ['Health', 'Travel', 'Grandchildren', 'Retirement'],
    values: ['Family', 'Security', 'Respect'],
    preferredContent: ['Print-style Articles', 'Videos', 'Photos'],
    culturalScore: 68,
    engagement: 'Low'
  }
]

const trendingTopics = [
  { topic: 'AI & Automation', growth: '+127%', relevance: 'High' },
  { topic: 'Sustainable Living', growth: '+89%', relevance: 'High' },
  { topic: 'Mental Wellness', growth: '+76%', relevance: 'Medium' },
  { topic: 'Remote Work', growth: '+54%', relevance: 'Medium' },
  { topic: 'Digital Privacy', growth: '+43%', relevance: 'High' }
]

const culturalInsights = [
  {
    category: 'Visual Preferences',
    insights: [
      'Bold, high-contrast imagery performs 40% better',
      'Authentic, unfiltered content resonates with 67% of users',
      'Video content drives 3x more engagement than static images'
    ]
  },
  {
    category: 'Messaging Tone',
    insights: [
      'Conversational, friendly tone preferred by 78% of audience',
      'Humor and wit increase recall by 45%',
      'Transparent, honest communication builds trust'
    ]
  },
  {
    category: 'Cultural Moments',
    insights: [
      'Holiday-themed content sees 200% engagement spike',
      'Social awareness campaigns gain 85% more shares',
      'Nostalgic references connect with multi-generational audiences'
    ]
  }
]

export default function CulturalAnalyzer() {
  const [selectedSegment, setSelectedSegment] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResults({
        overallScore: 92,
        topSegments: ['Gen Z', 'Millennials'],
        recommendations: [
          'Focus on authentic, behind-the-scenes content',
          'Incorporate trending sustainability themes',
          'Use vertical video format for mobile-first approach'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Brain className="w-8 h-8" />
            Cultural Intelligence
          </h2>
          <p className="text-muted-foreground">
            Deep audience insights powered by Taste AI™
          </p>
        </div>
        <Button onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Search className="w-4 h-4 mr-2" />
          )}
          Analyze Current Trends
        </Button>
      </div>

      <Tabs defaultValue="demographics" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl glass">
          <TabsTrigger value="demographics" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Demographics
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analysis
          </TabsTrigger>
        </TabsList>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Segment List */}
            <div className="space-y-4">
              {demographicData.map((segment, index) => (
                <motion.div
                  key={segment.segment}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`glass-card cursor-pointer transition-all ${
                      selectedSegment === index ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedSegment(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{segment.segment}</h3>
                        <Badge variant="secondary">{segment.size}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Cultural Score: {segment.culturalScore}%
                        </span>
                        <Badge variant={
                          segment.engagement === 'High' ? 'default' : 
                          segment.engagement === 'Medium' ? 'secondary' : 'outline'
                        }>
                          {segment.engagement}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Segment Details */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedSegment}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {demographicData[selectedSegment].segment} Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Core Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {demographicData[selectedSegment].interests.map((interest) => (
                          <Badge key={interest} variant="outline">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Key Values
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {demographicData[selectedSegment].values.map((value) => (
                          <Badge key={value} variant="secondary">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preferred Content
                      </h4>
                      <div className="space-y-2">
                        {demographicData[selectedSegment].preferredContent.map((content) => (
                          <div key={content} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm">{content}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Cultural Alignment Score</span>
                        <span className="text-2xl font-bold text-primary">
                          {demographicData[selectedSegment].culturalScore}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 mt-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${demographicData[selectedSegment].culturalScore}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingTopics.map((trend, index) => (
                  <motion.div
                    key={trend.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 rounded-lg bg-background/50"
                  >
                    <div>
                      <div className="font-medium">{trend.topic}</div>
                      <div className="text-sm text-muted-foreground">
                        Growth: {trend.growth}
                      </div>
                    </div>
                    <Badge variant={
                      trend.relevance === 'High' ? 'default' : 'secondary'
                    }>
                      {trend.relevance}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Cultural Moments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="font-medium text-primary mb-1">Upcoming: Earth Day</div>
                    <div className="text-sm text-muted-foreground">
                      Sustainability content performs 3x better during this period
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="font-medium mb-1">Mental Health Awareness</div>
                    <div className="text-sm text-muted-foreground">
                      Wellness-focused messaging sees increased engagement
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50">
                    <div className="font-medium mb-1">Back to School Season</div>
                    <div className="text-sm text-muted-foreground">
                      Educational and productivity content trending
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {culturalInsights.map((insight, index) => (
              <motion.div
                key={insight.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{insight.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insight.insights.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/30">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          </div>
                          <p className="text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {analysisResults ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {analysisResults.overallScore}%
                    </div>
                    <div className="text-muted-foreground">
                      Overall Cultural Alignment Score
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Top Target Segments</h4>
                    <div className="flex gap-2">
                      {analysisResults.topSegments.map((segment: string) => (
                        <Badge key={segment} variant="default">{segment}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      {analysisResults.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          </div>
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="glass-card">
              <CardContent className="py-12 text-center">
                <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Click "Analyze Current Trends" to generate cultural insights
                </p>
                <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Start Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}