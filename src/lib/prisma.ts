import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  // Для браузера/edge runtime используем обычное подключение
  if (typeof window !== 'undefined') {
    return new PrismaClient()
  }

  // Для Node.js runtime используем адаптер
  const pool = new pg.Pool({
    connectionString: databaseUrl,
  })
  
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

export function getPrisma() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  const prisma = createPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }

  return prisma
}
