'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  { code: 'fr' as const, label: '🇫🇷 FR' },
  { code: 'en' as const, label: '🇬🇧 EN' },
  { code: 'es' as const, label: '🇪🇸 ES' },
  { code: 'pt' as const, label: '🇧🇷 PT' },
  { code: 'ar' as const, label: '🇸🇦 AR' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-2 py-1 rounded text-xs font-medium transition ${
            locale === lang.code
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}