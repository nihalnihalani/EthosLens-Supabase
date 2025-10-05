'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { 
  ArrowLeftRight, 
  Download, 
  Share, 
  Eye,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  RefreshCw
} from 'lucide-react'

interface BeforeAfterProject {
  id: string
  name: string
  beforeVersion: {
    url: string
    culturalScore: number
    createdAt: string
    description: string
    metrics: {
      engagement: number
      conversion: number
      brandRecall: number
    }
  }
  afterVersion: {
    url: string
    culturalScore: number
    createdAt: string
    description: string
    metrics: {
      engagement: number
      conversion: number
      brandRecall: number
    }
    improvements: string[]
  }
  type: 'video' | 'image'
  targetAudience: string
  improvementSummary: string
}

const mockBeforeAfterProjects: BeforeAfterProject[] = [
  {
    id: '1',
    name: 'Luxury Watch Campaign Optimization',
    type: 'video',
    targetAudience: 'Millennials',
    beforeVersion: {
      url: '/api/placeholder/400/225',
      culturalScore: 78,
      createdAt: '2025-01-10',
      description: 'Initial campaign focusing on product features',
      metrics: {
        engagement: 2.1,
        conversion: 0.8,
        brandRecall: 65
      }
    },
    afterVersion: {
      url: '/api/placeholder/400/225',
      culturalScore: 94,
      createdAt: '2025-01-15',
      description: 'Culturally-enhanced campaign with authentic storytelling',
      metrics: {
        engagement: 4.7,
        conversion: 2.3,
        brandRecall: 89
      },
      improvements: [
        'Added authentic millennial lifestyle context',
        'Incorporated sustainable luxury messaging',
        'Enhanced cultural authenticity',
        'Improved emotional connection'
      ]
    },
    improvementSummary: '+124% engagement, +188% conversion, +37% brand recall'
  },
  {
    id: '2',
    name: 'Tech Product Launch Revision',
    type: 'image',
    targetAudience: 'Gen Z',
    beforeVersion: {
      url: '/api/placeholder/400/400',
      culturalScore: 72,
      createdAt: '2025-01-12',
      description: 'Corporate-style product showcase',
      metrics: {
        engagement: 1.8,
        conversion: 1.2,
        brandRecall: 58
      }
    },
    afterVersion: {
      url: '/api/placeholder/400/400',
      culturalScore: 91,
      createdAt: '2025-01-16',
      description: 'Dynamic, inclusive, and culturally relevant presentation',
      metrics: {
        engagement: 3.9,
        conversion: 2.8,
        brandRecall: 82
      },
      improvements: [
        'Vibrant, Gen Z-aligned color palette',
        'Inclusive diverse representation',
        'Social media optimized composition',
        'Trending cultural elements integrated'
      ]
    },
    improvementSummary: '+117% engagement, +133% conversion, +41% brand recall'
  },
  {
    id: '3',
    name: 'Fashion Brand Relaunch',
    type: 'video',
    targetAudience: 'Luxury Market',
    beforeVersion: {
      url: '/api/placeholder/400/225',
      culturalScore: 69,
      createdAt: '2025-01-08',
      description: 'Traditional luxury fashion presentation',
      metrics: {
        engagement: 1.5,
        conversion: 0.9,
        brandRecall: 71
      }
    },
    afterVersion: {
      url: '/api/placeholder/400/225',
      culturalScore: 96,
      createdAt: '2025-01-18',
      description: 'Sophisticated, culturally-aware luxury storytelling',
      metrics: {
        engagement: 5.2,
        conversion: 3.1,
        brandRecall: 93
      },
      improvements: [
        'Heritage and craftsmanship storytelling',
        'Sophisticated cultural references',
        'Premium aesthetic enhancement',
        'Emotional luxury positioning'
      ]
    },
    improvementSummary: '+247% engagement, +244% conversion, +31% brand recall'
  }
]

interface BeforeAfterComparisonProps {
  projects?: BeforeAfterProject[]
}

export default function BeforeAfterComparison({ projects = mockBeforeAfterProjects }: BeforeAfterComparisonProps) {
  const [selectedProject, setSelectedProject] = useState<BeforeAfterProject>(projects[0])
  const [comparisonMode, setComparisonMode] = useState<'split' | 'slider'>('slider')
  const [sliderValue, setSliderValue] = useState([50])

  const calculateImprovement = (before: number, after: number) => {
    const improvement = ((after - before) / before) * 100
    return improvement > 0 ? `+${improvement.toFixed(0)}%` : `${improvement.toFixed(0)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Before & After Gallery</h2>
          <p className="text-muted-foreground">
            See the impact of cultural intelligence on creative performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={comparisonMode === 'split' ? 'default' : 'outline'}
            onClick={() => setComparisonMode('split')}
          >
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Split View
          </Button>
          <Button 
            variant={comparisonMode === 'slider' ? 'default' : 'outline'}
            onClick={() => setComparisonMode('slider')}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Slider View
          </Button>
        </div>
      </div>

      {/* Project Selector */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProject.id === project.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="w-3 h-3" />
                    {project.targetAudience}
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{project.name}</h3>
                <p className="text-xs text-green-500 font-medium">{project.improvementSummary}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Comparison View */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visual Comparison */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visual Comparison: {selectedProject.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisonMode === 'split' ? (
                // Split View
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-red-400">Before</span>
                      <Badge variant="outline" className="text-xs">
                        Score: {selectedProject.beforeVersion.culturalScore}%
                      </Badge>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Before Version</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedProject.beforeVersion.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-400">After</span>
                      <Badge variant="outline" className="text-xs">
                        Score: {selectedProject.afterVersion.culturalScore}%
                      </Badge>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">After Version</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedProject.afterVersion.description}
                    </p>
                  </div>
                </div>
              ) : (
                // Slider View
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    {/* Before Image (background) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Before Version</span>
                    </div>
                    
                    {/* After Image (clipped) */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center transition-all duration-200"
                      style={{ 
                        clipPath: `polygon(0 0, ${sliderValue[0]}% 0, ${sliderValue[0]}% 100%, 0 100%)` 
                      }}
                    >
                      <span className="text-sm text-muted-foreground">After Version</span>
                    </div>
                    
                    {/* Slider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-200"
                      style={{ left: `${sliderValue[0]}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <ArrowLeftRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Slider Control */}
                  <div className="px-4">
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Before</span>
                      <span>After</span>
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        Before: {selectedProject.beforeVersion.culturalScore}%
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {selectedProject.beforeVersion.description}
                      </p>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">
                        After: {selectedProject.afterVersion.culturalScore}%
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {selectedProject.afterVersion.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics & Improvements */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cultural Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Cultural Score</span>
                  <span className="text-sm text-green-500">
                    {calculateImprovement(
                      selectedProject.beforeVersion.culturalScore,
                      selectedProject.afterVersion.culturalScore
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-red-200 rounded">
                    <div 
                      className="h-full bg-red-500 rounded"
                      style={{ width: `${selectedProject.beforeVersion.culturalScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {selectedProject.beforeVersion.culturalScore}%
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-green-200 rounded">
                    <div 
                      className="h-full bg-green-500 rounded"
                      style={{ width: `${selectedProject.afterVersion.culturalScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">
                    {selectedProject.afterVersion.culturalScore}%
                  </span>
                </div>
              </div>

              {/* Other Metrics */}
              {['engagement', 'conversion', 'brandRecall'].map((metric) => (
                <div key={metric}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium capitalize">
                      {metric === 'brandRecall' ? 'Brand Recall' : metric}
                    </span>
                    <span className="text-sm text-green-500">
                      {calculateImprovement(
                        selectedProject.beforeVersion.metrics[metric as keyof typeof selectedProject.beforeVersion.metrics],
                        selectedProject.afterVersion.metrics[metric as keyof typeof selectedProject.afterVersion.metrics]
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-red-50 dark:bg-red-950/20 rounded">
                      <span className="text-red-600 dark:text-red-400">
                        {selectedProject.beforeVersion.metrics[metric as keyof typeof selectedProject.beforeVersion.metrics]}
                        {metric === 'brandRecall' ? '%' : '%'}
                      </span>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-950/20 rounded">
                      <span className="text-green-600 dark:text-green-400">
                        {selectedProject.afterVersion.metrics[metric as keyof typeof selectedProject.afterVersion.metrics]}
                        {metric === 'brandRecall' ? '%' : '%'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Improvements Made */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Improvements Made
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedProject.afterVersion.improvements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 p-2 rounded bg-background/50"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div>
                  <div className="text-sm font-medium">Original Version</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(selectedProject.beforeVersion.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <div className="text-sm font-medium">Optimized Version</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(selectedProject.afterVersion.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}