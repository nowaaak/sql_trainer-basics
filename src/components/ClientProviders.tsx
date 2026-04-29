'use client'

import type { ReactNode } from 'react'
import { LocaleProvider } from './LocaleProvider'

export function ClientProviders({ children }: { children: ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>
}
