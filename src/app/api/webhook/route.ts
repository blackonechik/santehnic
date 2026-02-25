import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import crypto from 'crypto'

// Проверка подписи webhook
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.WEBHOOK_SECRET || ''
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma()

    const signature = request.headers.get('x-webhook-signature')
    const eventId = request.headers.get('x-webhook-event-id')
    
    if (!eventId) {
      return NextResponse.json(
        { error: 'Отсутствует x-webhook-event-id заголовок' },
        { status: 400 }
      )
    }

    // Проверка идемпотентности - если событие уже существует, возвращаем успех
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { eventId },
    })

    if (existingEvent) {
      console.log(`Событие ${eventId} уже обработано ранее`)
      return NextResponse.json({ 
        success: true, 
        message: 'Событие уже обработано',
        duplicate: true 
      })
    }

    const rawBody = await request.text()
    
    // Проверка подписи (если секрет настроен)
    const secret = process.env.WEBHOOK_SECRET
    if (secret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature)
      if (!isValid) {
        return NextResponse.json(
          { error: 'Неверная подпись webhook' },
          { status: 401 }
        )
      }
    }

    const payload = JSON.parse(rawBody)
    const source = request.headers.get('x-webhook-source') || 'unknown'

    // Сохраняем событие
    const webhookEvent = await prisma.webhookEvent.create({
      data: {
        eventId,
        source,
        payload,
        processed: true,
        processedAt: new Date(),
      },
    })

    console.log(`Webhook событие ${eventId} от ${source} успешно обработано`)

    return NextResponse.json({ 
      success: true, 
      eventId: webhookEvent.id 
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Ошибка обработки webhook' },
      { status: 500 }
    )
  }
}

// GET endpoint для проверки статуса событий
export async function GET(request: NextRequest) {
  const prisma = getPrisma()

  const searchParams = request.nextUrl.searchParams
  const eventId = searchParams.get('eventId')

  if (eventId) {
    const event = await prisma.webhookEvent.findUnique({
      where: { eventId },
    })

    if (!event) {
      return NextResponse.json({ error: 'Событие не найдено' }, { status: 404 })
    }

    return NextResponse.json(event)
  }

  // Список последних событий
  const events = await prisma.webhookEvent.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ events })
}
