'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const languages = [
  { code: 'fr' as const, label: 'Français', flag: '🇫🇷' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'es' as const, label: 'Español', flag: '🇪🇸' },
  { code: 'pt' as const, label: 'Português', flag: '🇧🇷' },
  { code: 'ar' as const, label: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find(l => l.code === locale) || languages[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-blue-400 transition text-sm font-medium text-gray-700"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className={`text-xs text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 overflow-hidden animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition hover:bg-blue-50 hover:text-blue-600 ${
                locale === lang.code ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {locale === lang.code && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}