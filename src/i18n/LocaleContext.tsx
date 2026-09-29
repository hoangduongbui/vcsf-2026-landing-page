import { useEffect, useState, type ReactNode } from 'react'
import type { Locale } from '../data/content'
import { LocaleContext } from './context'

export function LocaleProvider({ children, initial = 'vi' }: { children: ReactNode; initial?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initial)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
