interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: string
}

export async function sendTelegramNotification(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured. Skipping notification.')
    return false
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`
    
    const body: TelegramMessage = {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      return false
    }

    console.log('Telegram notification sent successfully')
    return true
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return false
  }
}

export function formatLeadMessage(lead: {
  name: string
  email: string
  phone: string
  createdAt: Date
}): string {
  const date = lead.createdAt.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
  })

  return `
🚿 <b>Новая заявка от клиента!</b>

👤 <b>Имя:</b> ${lead.name}
📧 <b>Email:</b> ${lead.email}
📞 <b>Телефон:</b> ${lead.phone}
📅 <b>Дата:</b> ${date}

⚡ Свяжитесь с клиентом как можно скорее!
  `.trim()
}
