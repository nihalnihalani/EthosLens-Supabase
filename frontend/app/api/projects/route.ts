import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function GET(request: NextRequest) {
  try {
    // Forward request to backend service
    const response = await fetch(`${BACKEND_URL}/api/projects`, {
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
    console.error('Projects fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json()

    // Forward request to backend service
    const response = await fetch(`${BACKEND_URL}/api/projects`, {
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
    console.error('Project creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' }, 
      { status: 500 }
    )
  }
}
