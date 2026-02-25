'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: 'Сколько стоит выезд сантехника?',
      answer: 'Выезд в пределах МКАД — бесплатный при условии выполнения работ. Диагностика — от 500₽ (при выполнении работ не оплачивается).',
    },
    {
      question: 'Как быстро вы можете приехать?',
      answer: 'Среднее время прибытия — 30-60 минут в зависимости от района Москвы и загруженности дорог. В экстренных случаях стараюсь приехать как можно быстрее.',
    },
    {
      question: 'Даёте ли вы гарантию на работы?',
      answer: 'Да, я предоставляю гарантию на все виды работ от 6 месяцев до 3 лет. Гарантия зависит от типа работ и используемых материалов.',
    },
    {
      question: 'Работаете ли вы с материалами заказчика?',
      answer: 'Да, работаю как со своими материалами (со скидкой от поставщиков), так и с материалами заказчика. Рекомендую проверенные бренды.',
    },
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Принимаю оплату наличными, банковскими картами, а также переводом на карту. Оплата производится после выполнения работ и проверки качества.',
    },
    {
      question: 'Работаете ли вы по договору?',
      answer: 'Да, при необходимости заключаю договор на выполнение работ. Это даёт дополнительные гарантии обеим сторонам.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ответы на популярные вопросы о моих услугах
          </p>
        </div>

        {/* Список FAQ */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Не нашли ответ на свой вопрос?{' '}
            <a href="#contact" className="text-blue-600 hover:underline font-semibold">
              Свяжитесь со мной
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
