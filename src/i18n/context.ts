import { createContext, useContext } from 'react'
import { L, type Locale, type Strings } from '../data/content'

export interface LocaleValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

export const LocaleContext = createContext<LocaleValue>({ locale: 'vi', setLocale: () => {} })

export const useLocale = () => useContext(LocaleContext)

/** UI strings for the current locale. */
export function useT(): Strings {
  return L[useContext(LocaleContext).locale]
}
