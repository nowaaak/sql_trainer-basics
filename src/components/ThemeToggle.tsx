'use client'

import { useState, useEffect } from 'react'
import { useLocale } from '@/hooks/useLocale'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { t } = useLocale()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('sqlTrainerTheme') as 'dark' | 'light' | null
    const active = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'
    setTheme(stored ?? active ?? 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('sqlTrainerTheme', next)
    } catch {
      // ignore
    }
  }

  return (
    <button onClick={toggle} className={styles.toggle} aria-label={t.controls.theme} title={t.controls.theme}>
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
