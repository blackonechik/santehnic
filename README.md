# 🚰 Сантехник Москва — Landing Page

Веб-приложение для сантехника с функционалом сбора лидов, отслеживания конверсий и уведомлениями в Telegram.

## 🛠 Стек технологий

- **Frontend:** Next.js 15, React 19, TypeScript, TailwindCSS 4
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Containerization:** Docker, Docker Compose
- **Notifications:** Telegram Bot API

## 📋 Функционал

### Landing Page (5 секций)
1. **Hero** — главный экран с CTA кнопками
2. **Proof** — социальное доказательство (статистика, отзывы)
3. **Benefits** — преимущества работы
4. **FAQ** — часто задаваемые вопросы
5. **CTA** — форма захвата лидов

### Форма лида
- Имя (обязательно)
- Email (обязательно, с валидацией)
- Телефон (обязательно)
- Согласие на обработку данных (обязательно)

### Отслеживание событий
- `landing_view` — просмотр страницы
- `cta_click` — клик по CTA кнопке
- `lead_created` — создание лида

### Webhook Inbox
- Endpoint: `POST /api/webhook`
- Идемпотентность через `x-webhook-event-id`
- Проверка подписи через `x-webhook-signature`
- Секрет в `WEBHOOK_SECRET`

### Telegram уведомления
- Отправка при создании лида
- Форматированное сообщение с данными клиента

## 🚀 Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

```bash
cp .env.example .env
```

Заполните `.env`:
```env
DATABASE_URL="postgresql://plumber:plumber_secret@localhost:5432/plumber_leads"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_chat_id"
WEBHOOK_SECRET="whsec_your_secret_key_here"
```

### 3. Запуск базы данных (Docker)

```bash
# Требуется установленный Docker Desktop
npm run docker:up

# Или вручную
docker-compose up -d postgres
```

### 4. Миграции базы данных

```bash
# Генерация клиента
npx prisma generate

# Применение миграций
npm run db:migrate

# Сидирование (опционально)
npm run db:seed
```

### 5. Запуск приложения

```bash
npm run dev
```

Приложение доступно по адресу: http://localhost:3000

## 📦 Docker Compose

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f app

# Остановка
docker-compose down

# Остановка с удалением данных
docker-compose down -v
```

## 🔌 API Endpoints

### POST /api/leads
Создание лида

```json
{
  "name": "Иван",
  "email": "ivan@example.com",
  "phone": "+7 (999) 123-45-67",
  "consent": true
}
```

### POST /api/events
Отслеживание событий

```json
{
  "eventType": "cta_click",
  "sessionId": "sess_123",
  "metadata": { "location": "header" }
}
```

### POST /api/webhook
Получение webhook событий

Headers:
- `x-webhook-event-id`: уникальный ID события
- `x-webhook-signature`: HMAC-SHA256 подпись (опционально)
- `x-webhook-source`: источник события

### GET /api/webhook?eventId=...
Проверка статуса события

## 🧪 Тестирование

### Тест webhook

```bash
# Запустите приложение в одном терминале
npm run dev

# В другом терминале запустите тест webhook
npm run test:webhook
```

## 🤖 Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Добавьте бота в чат/канал
4. Получите ID чата через [@userinfobot](https://t.me/userinfobot)
5. Заполните `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в `.env`

## 🗄 База данных

### Таблицы

**leads** — лиды
- id, name, email, phone, consent, createdAt, updatedAt

**conversion_events** — события конверсии
- id, eventType, sessionId, metadata, leadId, createdAt

**webhook_events** — webhook события
- id, eventId, source, payload, processed, createdAt, processedAt

### Prisma команды

```bash
# Просмотр данных
npm run db:studio

# Сидирование
npm run db:seed

# Новая миграция
npx prisma migrate dev --name migration_name

# Сброс базы
npx prisma migrate reset
```

## 📊 Структура проекта

```
src/
├── app/
│   ├── api/
│   │   ├── events/route.ts      # Events API
│   │   ├── leads/route.ts       # Leads API
│   │   └── webhook/route.ts     # Webhook API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Landing page
├── components/
│   ├── hooks/
│   │   └── useConversionTracking.ts
│   └── sections/
│       ├── CTA.tsx
│       ├── FAQ.tsx
│       ├── Benefits.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       └── Proof.tsx
└── lib/
    ├── events.ts                # Events helpers
    ├── prisma.ts                # Prisma client
    └── telegram.ts              # Telegram service
prisma/
├── schema.prisma                # DB schema
└── seed.ts                      # Seed data
```

## 🌐 Деплой

### Вариант 1: VPS с Docker Compose

```bash
# Настройте .env.production
cp .env.production.example .env.production

# Запустите production compose
docker-compose -f docker-compose.prod.yml up -d --build

# Выполните миграции
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

Или используйте скрипт деплоя:
```bash
./deploy.sh
```

### Вариант 2: Railway/Render

1. Подключите репозиторий
2. Добавьте PostgreSQL аддон
3. Настройте переменные окружения
4. Deploy

### Вариант 3: Vercel + внешний PostgreSQL

1. Deploy на Vercel
2. Используйте Prisma Postgres или внешний PostgreSQL
3. Настройте `DATABASE_URL`

## 🔐 Безопасность

- Валидация всех входящих данных
- HTTPS в production
- Секрет webhook для проверки подписи
- .env в .gitignore
- Согласие на обработку данных

## 📝 Лицензия

MIT

## 👤 Контакты

Для вопросов по проекту создайте issue в репозитории.
