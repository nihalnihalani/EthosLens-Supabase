'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  PlayCircle, 
  Download, 
  Edit, 
  Share,
  Video,
  Image,
  Calendar,
  Target,
  ArrowLeftRight,
  TrendingUp
} from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    name: 'Luxury Watch Campaign',
    type: 'video',
    status: 'completed',
    culturalScore: 94,
    targetAudience: 'Millennials',
    createdAt: '2025-01-15',
    thumbnail: '/api/placeholder/400/225',
    duration: '00:30'
  },
  {
    id: '2',
    name: 'Sustainable Fashion Ad',
    type: 'video',
    status: 'completed',
    culturalScore: 91,
    targetAudience: 'Gen Z',
    createdAt: '2025-01-14',
    thumbnail: '/api/placeholder/400/225',
    duration: '00:15'
  },
  {
    id: '3',
    name: 'Tech Product Hero Image',
    type: 'image',
    status: 'completed',
    culturalScore: 87,
    targetAudience: 'Tech Early Adopters',
    createdAt: '2025-01-13',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    id: '4',
    name: 'Coffee Brand Story',
    type: 'video',
    status: 'in-progress',
    culturalScore: 89,
    targetAudience: 'Millennials',
    createdAt: '2025-01-12',
    thumbnail: '/api/placeholder/400/225',
    duration: '00:45'
  },
  {
    id: '5',
    name: 'Fitness App Promo',
    type: 'image',
    status: 'completed',
    culturalScore: 82,
    targetAudience: 'Gen Z',
    createdAt: '2025-01-11',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    id: '6',
    name: 'Travel Experience Video',
    type: 'video',
    status: 'completed',
    culturalScore: 95,
    targetAudience: 'Luxury Market',
    createdAt: '2025-01-10',
    thumbnail: '/api/placeholder/400/225',
    duration: '01:00'
  }
]

export default function ProjectGallery() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === 'all' || project.type === filterType
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'score') return b.culturalScore - a.culturalScore
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Creative Gallery</h2>
          <p className="text-muted-foreground">
            Browse and manage your generated content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Before/After
          </Button>
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="score">Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="glass-card hover:bg-white/10 transition-all duration-300 group cursor-pointer overflow-hidden">
              {/* Thumbnail */}
              <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  {project.type === 'video' ? (
                    <PlayCircle className="w-16 h-16 text-white/70 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Image className="w-16 h-16 text-white/70 group-hover:scale-110 transition-transform" />
                  )}
                </div>
                
                {/* Duration badge for videos */}
                {project.type === 'video' && project.duration && (
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.duration}
                    </Badge>
                  </div>
                )}

                {/* Type badge */}
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="text-xs">
                    {project.type === 'video' ? (
                      <Video className="w-3 h-3 mr-1" />
                    ) : (
                      <Image className="w-3 h-3 mr-1" />
                    )}
                    {project.type}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-3 h-3" />
                      <span className="text-xs text-muted-foreground">
                        {project.targetAudience}
                      </span>
                    </div>
                    <Badge 
                      variant={project.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground">Cultural Score</span>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-primary">
                          {project.culturalScore}%
                        </div>
                        <div className="w-16 h-1 bg-secondary rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${project.culturalScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowLeftRight className="w-3 h-3 mr-1" />
                      Compare
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="glass-card">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or create a new project
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}