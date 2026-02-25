import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

async function main() {
  console.log('🌱 Seeding database...')

  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required')
  }

  const pool = new pg.Pool({
    connectionString: databaseUrl,
  })
  
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  // Создадим тестовые лиды
  const leads = [
    {
      name: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-45-67',
      consent: true,
    },
    {
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      phone: '+7 (999) 987-65-43',
      consent: true,
    },
  ]

  for (const leadData of leads) {
    await prisma.lead.upsert({
      where: { email: leadData.email },
      update: {},
      create: leadData,
    })
  }

  await prisma.$disconnect()

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
