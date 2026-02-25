'use client'

interface HeaderProps {
  onCtaClick?: () => void
}

export default function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-2">
            <span className="text-3xl">🔧</span>
            <div>
              <span className="font-bold text-gray-900 text-lg">Сантехник Москва</span>
              <p className="text-xs text-gray-500 hidden sm:block">Профессиональные услуги</p>
            </div>
          </a>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">
              Преимущества
            </a>
            <a href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors">
              Отзывы
            </a>
            <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Контакты и CTA */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+79991234567"
              className="hidden sm:block font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              +7 (999) 123-45-67
            </a>
            <button
              onClick={onCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full transition-colors"
            >
              Вызвать мастера
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
