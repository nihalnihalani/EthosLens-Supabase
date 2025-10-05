import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface CulturalAnalysisRequest {
  content?: string
  targetAudience?: string
  brandContext?: string
  analysisType?: 'content' | 'audience' | 'trend' | 'compatibility'
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // Forward request to backend service
    const response = await fetch(`${BACKEND_URL}/api/cultural/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error(`Backend service error: ${response.status}`)
    }

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Cultural analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to perform cultural analysis' }, 
      { status: 500 }
    )
  }
}
