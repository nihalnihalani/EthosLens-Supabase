import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    if (!requestData.prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Forward request to backend service
    const response = await fetch(`${BACKEND_URL}/api/creative/video/generate`, {
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
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate video' }, 
      { status: 500 }
    )
  }
}