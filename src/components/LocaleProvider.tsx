'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getDictionary,
  isLocale,
  type Dict,
  type Locale,
} from '@/lib/i18n'

export interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dict
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)


export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
      if (isLocale(stored) && stored !== DEFAULT_LOCALE) {
        setLocale(stored)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    } catch {
      // ignore storage errors
    }
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getDictionary(locale),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
