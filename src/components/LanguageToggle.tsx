'use client'

import { useLocale } from '@/hooks/useLocale'
import styles from './LanguageToggle.module.css'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()
  const nextLocale = locale === 'de' ? 'en' : 'de'

  return (
    <button
      type="button"
      onClick={() => setLocale(nextLocale)}
      className={styles.toggle}
      aria-label={t.controls.language}
      title={t.controls.language}
    >
      <span className={`${styles.segment} ${locale === 'de' ? styles.active : ''}`}>DE</span>
      <span className={`${styles.segment} ${locale === 'en' ? styles.active : ''}`}>EN</span>
    </button>
  )
}
