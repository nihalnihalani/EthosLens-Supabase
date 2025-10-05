'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Video, 
  Image, 
  Target, 
  BarChart3, 
  Sparkles,
  Plus,
  PlayCircle,
  Download,
  Settings,
  Mic,
  Upload,
  Palette
} from 'lucide-react'
import CreativeStudio from '@/components/studio/CreativeStudio'
import CulturalAnalyzer from '@/components/cultural/CulturalAnalyzer'
import ProjectGallery from '@/components/shared/ProjectGallery'
import AnalyticsDashboard from '@/components/shared/AnalyticsDashboard'

const quickActions = [
  {
    icon: Video,
    title: 'Generate Video Ad',
    description: 'Create culturally-targeted video content',
    color: 'from-purple-500 to-pink-500',
    action: 'video'
  },
  {
    icon: Brain,
    title: 'Analyze Audience',
    description: 'Deep cultural intelligence insights',
    color: 'from-blue-500 to-cyan-500',
    action: 'analyze'
  },
  {
    icon: Image,
    title: 'Generate Images',
    description: 'Create branded visual assets',
    color: 'from-green-500 to-emerald-500',
    action: 'image'
  },
  {
    icon: Target,
    title: 'Campaign Strategy',
    description: 'AI-powered creative strategy',
    color: 'from-orange-500 to-red-500',
    action: 'strategy'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [recentProjects, setRecentProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch real projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          setRecentProjects(data.projects || [])
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
        // Fallback to empty array if API fails
        setRecentProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Creative Intelligence Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Transform cultural insights into compelling creative content
              </p>
            </div>
            <Button className="px-6 py-3">
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Button>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl glass">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="studio" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Studio
            </TabsTrigger>
            <TabsTrigger value="cultural" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Cultural AI
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Gallery
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  >
                    <Card 
                      className="p-6 glass-card hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        setSelectedAction(action.action)
                        if (action.action === 'video' || action.action === 'image') {
                          setActiveTab('studio')
                        } else if (action.action === 'analyze') {
                          setActiveTab('cultural')
                        }
                      }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Projects</h2>
                <Button variant="outline" onClick={() => setActiveTab('gallery')}>
                  View All
                </Button>
              </div>
              
              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden glass-card animate-pulse">
                      <div className="aspect-video bg-gradient-to-r from-primary/20 to-secondary/20" />
                      <div className="p-4">
                        <div className="h-4 bg-white/20 rounded mb-2" />
                        <div className="h-3 bg-white/10 rounded w-2/3" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : recentProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentProjects.slice(0, 6).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="overflow-hidden glass-card hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                        <div className="aspect-video bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-white/70 group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {project.name || project.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {project.type || 'Project'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Cultural Score: {project.cultural_score || project.culturalScore || 'N/A'}%
                            </span>
                            <Badge 
                              variant={project.status === 'completed' || project.status === 'Completed' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {project.status || 'Active'}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center glass-card">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start creating your first culturally-intelligent campaign
                  </p>
                  <Button onClick={() => setActiveTab('studio')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </Card>
              )}
            </motion.div>

            {/* Analytics Overview */}
            <AnalyticsDashboard />
          </TabsContent>

          {/* Creative Studio Tab */}
          <TabsContent value="studio">
            <CreativeStudio selectedAction={selectedAction} />
          </TabsContent>

          {/* Cultural Analysis Tab */}
          <TabsContent value="cultural">
            <CulturalAnalyzer />
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <ProjectGallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}