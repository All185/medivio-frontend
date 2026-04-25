'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'fr' | 'en' | 'es' | 'pt' | 'ar'

import fr from '../messages/fr.json'
import en from '../messages/en.json'
import es from '../messages/es.json'
import pt from '../messages/pt.json'
import ar from '../messages/ar.json'

const translations: Record<Locale, any> = { fr, en, es, pt, ar }

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'fr',
  setLocale: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = localStorage.getItem('medivio_locale') as Locale
    if (saved) setLocaleState(saved)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('medivio_locale', newLocale)
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)