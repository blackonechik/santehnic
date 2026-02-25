import { prisma } from './prisma'
import { Prisma } from '@prisma/client'

export type EventType = 'landing_view' | 'cta_click' | 'lead_created'

interface CreateEventParams {
  eventType: EventType
  sessionId?: string
  metadata?: Record<string, unknown>
  leadId?: string
}

export async function createConversionEvent({
  eventType,
  sessionId,
  metadata,
  leadId,
}: CreateEventParams) {
  return prisma.conversionEvent.create({
    data: {
      eventType,
      sessionId,
      metadata: (metadata || {}) as Prisma.InputJsonValue,
      leadId,
    },
  })
}

export async function getEventStats() {
  const stats = await prisma.conversionEvent.groupBy({
    by: ['eventType'],
    _count: true,
  })

  return stats.reduce(
    (acc, stat) => {
      acc[stat.eventType] = stat._count
      return acc
    },
    {} as Record<string, number>
  )
}
