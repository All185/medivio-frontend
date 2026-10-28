'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

type Locale = 'fr' | 'en' | 'ar' | 'cr' | 'gcr' | 'gyc' | 'es'

import fr from '../messages/fr.json'
import en from '../messages/en.json'
import ar from '../messages/ar.json'
import cr from '../messages/cr.json'
import gcr from '../messages/gcr.json'
import gyc from '../messages/gyc.json'
import es from '../messages/es.json'

const translations: Record<Locale, any> = { fr, en, ar, cr, gcr, gyc, es }

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

  const validLocales: Locale[] = ['fr', 'en', 'ar', 'cr', 'gcr', 'gyc', 'es']

  useEffect(() => {
    const saved = localStorage.getItem('medivio_locale') as Locale
    if (saved && validLocales.includes(saved)) setLocaleState(saved)
  }, [])

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('medivio_locale', newLocale)
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
    setLocaleState(newLocale)
  }

  const t = useCallback((key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }, [locale])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
