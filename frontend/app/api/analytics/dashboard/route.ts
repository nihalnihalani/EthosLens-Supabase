import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    // Forward request to backend service
    const response = await fetch(`${BACKEND_URL}/api/analytics/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Backend service error: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Analytics dashboard fetch error:', error)
    
    // Return empty/default data structure instead of error
    return NextResponse.json({
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
    })
  }
}