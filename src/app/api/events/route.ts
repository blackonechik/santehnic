import { NextRequest, NextResponse } from 'next/server'
import { createConversionEvent } from '@/lib/events'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, sessionId, metadata } = body

    if (!eventType) {
      return NextResponse.json(
        { error: 'eventType обязателен' },
        { status: 400 }
      )
    }

    const event = await createConversionEvent({
      eventType,
      sessionId,
      metadata,
    })

    return NextResponse.json({ success: true, eventId: event.id }, { status: 201 })
  } catch (error) {
    console.error('Error tracking event:', error)
    return NextResponse.json(
      { error: 'Ошибка при записи события' },
      { status: 500 }
    )
  }
}
