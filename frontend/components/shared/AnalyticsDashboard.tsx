'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Eye,
  Heart,
  Share,
  Video,
  Image
} from 'lucide-react'

interface AnalyticsData {
  totalProjects: number;
  totalViews: number;
  avgCulturalScore: number;
  activeTargets: number;
  recentProjects: Array<{ name: string; score: number; views: number; id?: string }>;
  performanceMetrics: Array<{ label: string; value: string; trend: string }>;
  audienceBreakdown: Array<{ segment: string; percentage: number; color: string }>;
}

const useAnalyticsData = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        } else {
          // Fallback to demo data if API fails
          setAnalyticsData({
            totalProjects: 0,
            totalViews: 0,
            avgCulturalScore: 0,
            activeTargets: 0,
            recentProjects: [],
            performanceMetrics: [
              { label: 'Engagement Rate', value: '0%', trend: 'neutral' },
              { label: 'Cultural Alignment', value: '0%', trend: 'neutral' },
              { label: 'Conversion Rate', value: '0%', trend: 'neutral' },
              { label: 'Brand Recall', value: '0%', trend: 'neutral' }
            ],
            audienceBreakdown: []
          });
        }
      } catch (err) {
        setError('Failed to fetch analytics data');
        // Set empty state on error
        setAnalyticsData({
          totalProjects: 0,
          totalViews: 0,
          avgCulturalScore: 0,
          activeTargets: 0,
          recentProjects: [],
          performanceMetrics: [
            { label: 'Engagement Rate', value: '0%', trend: 'neutral' },
            { label: 'Cultural Alignment', value: '0%', trend: 'neutral' },
            { label: 'Conversion Rate', value: '0%', trend: 'neutral' },
            { label: 'Brand Recall', value: '0%', trend: 'neutral' }
          ],
          audienceBreakdown: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analyticsData, loading, error };
};

export default function AnalyticsDashboard() {
  const { analyticsData, loading, error } = useAnalyticsData();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <Badge variant="secondary" className="text-xs animate-pulse">
            Loading...
          </Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="glass-card animate-pulse">
              <CardContent className="p-4">
                <div className="h-16 bg-white/10 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <Badge variant="destructive" className="text-xs">
            Error loading data
          </Badge>
        </div>
        <Card className="glass-card p-8 text-center">
          <p className="text-muted-foreground">
            Unable to load analytics data. Please try refreshing the page.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Badge variant="secondary" className="text-xs">
          Real-time data
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{analyticsData.totalProjects}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Cultural Score</p>
                <p className="text-2xl font-bold">{analyticsData.avgCulturalScore}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Targets</p>
                <p className="text-2xl font-bold">{analyticsData.activeTargets}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.performanceMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/30"
              >
                <span className="text-sm font-medium">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-500">
                    {metric.value}
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Projects Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Video className="w-5 h-5" />
              Top Performing Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.recentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/30"
              >
                <div>
                  <div className="font-medium text-sm">{project.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {project.views.toLocaleString()} views
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">
                    {project.score}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Cultural Score
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Audience Breakdown */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Audience Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {analyticsData.audienceBreakdown.map((segment, index) => (
                  <motion.div
                    key={segment.segment}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${segment.color}`} />
                      <span className="text-sm font-medium">{segment.segment}</span>
                    </div>
                    <span className="text-sm font-bold">{segment.percentage}%</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="relative">
                <div className="w-48 h-48 mx-auto relative">
                  {/* Simplified donut chart representation */}
                  <div className="w-full h-full rounded-full border-8 border-background relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold">100%</div>
                        <div className="text-xs text-muted-foreground">Coverage</div>
                      </div>
                    </div>
                    {/* Segment indicators */}
                    {analyticsData.audienceBreakdown.map((segment, index) => (
                      <div
                        key={segment.segment}
                        className={`absolute inset-2 rounded-full bg-gradient-to-r ${segment.color} opacity-20`}
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + (segment.percentage / 100) * 50}% 0%, 50% 50%)`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}