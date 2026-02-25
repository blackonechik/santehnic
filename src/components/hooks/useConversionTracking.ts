'use client'

import { useCallback, useState, useEffect } from 'react'

export function useConversionTracking() {
  const [sessionId, setSessionId] = useState<string>('')

  // Инициализируем session ID только на клиенте
  // Это необходимый паттерн для клиентской инициализации
  useEffect(() => {
    let id = sessionStorage.getItem('session_id')
    if (!id) {
      id = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('session_id', id)
    }
    setSessionId(id)
  }, [])

  const trackEvent = useCallback(async (eventType: string, metadata?: Record<string, unknown>) => {
    // Ждём инициализации sessionId
    if (!sessionId) return
    
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          sessionId,
          metadata,
        }),
      })
    } catch (error) {
      console.error('Failed to track event:', error)
    }
  }, [sessionId])

  return { sessionId, trackEvent }
}
