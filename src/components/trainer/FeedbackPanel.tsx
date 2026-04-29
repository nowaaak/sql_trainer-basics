'use client'

import type { FeedbackState } from '@/data/types'
import { useLocale } from '@/hooks/useLocale'
import styles from './FeedbackPanel.module.css'

interface Props {
  feedback: FeedbackState
  currentHints: string[]
  hintLevel: number
  onShowNextHint: () => void
}

export function FeedbackPanel({ feedback, currentHints, hintLevel, onShowNextHint }: Props) {
  const { t } = useLocale()
  const typeClass = styles[feedback.type]
  const visibleHints = currentHints.slice(0, hintLevel)
  const hasMoreHints = hintLevel < currentHints.length && feedback.type === 'error'

  return (
    <div className={`${styles.card} ${typeClass}`} role="alert">
      <div className={styles.iconWrap}>
        <FeedbackIcon type={feedback.type} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{feedback.title}</p>
        <p className={styles.message}>{feedback.message}</p>

        {visibleHints.length > 0 && (
          <div className={styles.hints}>
            {visibleHints.map((hint, i) => (
              <div key={i} className={styles.hint}>
                <span className={styles.hintNum}>{i + 1}</span>
                {hint}
              </div>
            ))}
          </div>
        )}

        {hasMoreHints && (
          <button className={styles.hintBtn} onClick={onShowNextHint} type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            {hintLevel === 0
              ? t.trainer.feedback.hintShow
              : `${t.trainer.feedback.hintNext} (${hintLevel + 1}/${currentHints.length})`}
          </button>
        )}
      </div>
    </div>
  )
}

function FeedbackIcon({ type }: { type: FeedbackState['type'] }) {
  if (type === 'success') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  }
  if (type === 'error') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
