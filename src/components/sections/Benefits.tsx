export default function Benefits() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Срочный выезд',
      description: 'Приеду в течение 30-60 минут в любой район Москвы. Работаю круглосуточно, без выходных и праздников.',
    },
    {
      icon: '💰',
      title: 'Честные цены',
      description: 'Называю стоимость до начала работ. Никаких наценок «по факту». Скидки пенсионерам и льготникам.',
    },
    {
      icon: '🛡️',
      title: 'Гарантия качества',
      description: 'Даю гарантию на все виды работ до 3 лет. Использую только качественные материалы и инструмент.',
    },
    {
      icon: '🧰',
      title: 'Полный спектр услуг',
      description: 'От замены прокладки до монтажа системы отопления. Решаю проблемы любой сложности.',
    },
    {
      icon: '👨‍🔧',
      title: 'Опытный мастер',
      description: '15 лет практики, высшее техническое образование. Постоянно повышаю квалификацию.',
    },
    {
      icon: '🧹',
      title: 'Чистота после работ',
      description: 'Убираю за собой мусор. Бережно отношусь к вашему имуществу. Работаю в бахилах.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Почему выбирают меня
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Профессиональный подход к каждой задаче — от мелкого ремонта до комплексного монтажа
          </p>
        </div>

        {/* Сетка преимуществ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Иконка */}
              <div className="text-5xl mb-4">{benefit.icon}</div>

              {/* Заголовок */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              {/* Описание */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA полоса */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Нужен сантехник прямо сейчас?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Не ждите, пока проблема усугубится! Звоните или оставляйте заявку — 
            решу вашу задачу быстро и качественно.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+79991234567"
              className="bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              📞 Позвонить сейчас
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
