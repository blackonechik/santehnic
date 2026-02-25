import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/prisma'
import { sendTelegramNotification, formatLeadMessage } from '@/lib/telegram'
import { createConversionEvent } from '@/lib/events'

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma()

    const body = await request.json()
    const { name, email, phone, consent } = body

    // Валидация
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Необходимо согласие на обработку данных' },
        { status: 400 }
      )
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Некорректный формат email' },
        { status: 400 }
      )
    }

    // Создаём лид
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        consent,
      },
    })

    // Записываем событие конверсии
    await createConversionEvent({
      eventType: 'lead_created',
      leadId: lead.id,
      metadata: { name, email, phone },
    })

    // Отправляем уведомление в Telegram
    await sendTelegramNotification(formatLeadMessage(lead))

    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена!',
        leadId: lead.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    )
  }
}
