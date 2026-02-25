#!/usr/bin/env node
/**
 * Тестовый скрипт для проверки webhook endpoint
 * Использование: node test-webhook.js
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require('crypto')
/* eslint-enable @typescript-eslint/no-require-imports */

const WEBHOOK_URL = 'http://localhost:3000/api/webhook'
const WEBHOOK_SECRET = 'whsec_your_secret_key_here'

async function testWebhook() {
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  const payload = {
    event: 'test_event',
    timestamp: new Date().toISOString(),
    data: {
      message: 'Test webhook event',
      value: Math.random(),
    },
  }

  const body = JSON.stringify(payload)
  
  // Создаём подпись
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex')

  console.log('📤 Отправка webhook...')
  console.log(`Event ID: ${eventId}`)
  console.log(`Payload: ${body}`)
  console.log(`Signature: ${signature}`)

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-event-id': eventId,
        'x-webhook-source': 'test-script',
        'x-webhook-signature': signature,
      },
      body,
    })

    const result = await response.json()

    console.log('\n📥 Ответ:')
    console.log(`Status: ${response.status}`)
    console.log(JSON.stringify(result, null, 2))

    if (response.ok) {
      console.log('\n✅ Webhook успешно отправлен!')
    } else {
      console.log('\n❌ Ошибка webhook!')
    }
  } catch (error) {
    console.error('\n❌ Ошибка:', error instanceof Error ? error.message : error)
  }

  // Тест идемпотентности - отправляем тот же eventId
  console.log('\n\n🔄 Тест идемпотентности (повторная отправка)...')
  
  try {
    const response2 = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-event-id': eventId,
        'x-webhook-source': 'test-script',
        'x-webhook-signature': signature,
      },
      body,
    })

    const result2 = await response2.json()
    console.log(`Status: ${response2.status}`)
    console.log(JSON.stringify(result2, null, 2))

    if (result2.duplicate) {
      console.log('\n✅ Идемпотентность работает! Дубль не создан.')
    }
  } catch (error) {
    console.error('\n❌ Ошибка:', error instanceof Error ? error.message : error)
  }
}

testWebhook()
