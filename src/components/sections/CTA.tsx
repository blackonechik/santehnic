'use client'

import { useState } from 'react'

interface CTAProps {
  onLeadSubmit?: () => void
}

export default function CTA({ onLeadSubmit }: CTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', consent: false })
      onLeadSubmit?.()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Ошибка отправки')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок секции */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Оставьте заявку сейчас
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Перезвоню в течение 5 минут, проконсультирую и рассчитаю стоимость работ
            </p>
          </div>

          {/* Форма */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Заявка отправлена!
                </h3>
                <p className="text-gray-600 mb-6">
                  Спасибо! Я перезвоню вам в ближайшее время.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Имя */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Иван"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Телефон */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+7 (999) 123-45-67"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@mail.ru"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Согласие */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Я согласен на обработку{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        персональных данных
                      </a>{' '}
                      и согласен с{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>
                </div>

                {/* Сообщение об ошибке */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                {/* Кнопка отправки */}
                <button
                  type="submit"
                  disabled={status === 'loading' || !formData.consent}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-blue-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  {status === 'loading' ? 'Отправка...' : '🚀 Получить консультацию'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </form>
            )}
          </div>

          {/* Контакты */}
          <div className="mt-12 text-center text-white">
            <p className="text-blue-100 mb-4">Или свяжитесь напрямую:</p>
            <a
              href="tel:+79991234567"
              className="text-3xl font-bold hover:text-yellow-400 transition-colors"
            >
              +7 (999) 123-45-67
            </a>
            <p className="text-blue-200 mt-2">Работаю ежедневно с 8:00 до 22:00</p>
          </div>
        </div>
      </div>
    </section>
  )
}
