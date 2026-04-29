'use client'

import { useEffect } from 'react'
import { useLocale } from '@/hooks/useLocale'
import styles from './SuccessModal.module.css'

interface Props {
  onClose: () => void
  onNext: () => void
}

export function SuccessModal({ onClose, onNext }: Props) {
  const { t } = useLocale()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Enter') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onNext])

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal aria-label={t.trainer.success.aria}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className={styles.title}>{t.trainer.success.title}</h2>
        <p className={styles.subtitle}>{t.trainer.success.subtitle}</p>
        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClose} type="button">
            {t.trainer.success.close}
          </button>
          <button className={styles.btnPrimary} onClick={onNext} type="button">
            {t.trainer.success.next}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
