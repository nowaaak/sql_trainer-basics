'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LanguageToggle } from '@/components/LanguageToggle'
import { getExerciseContent } from '@/data/exercise-content'
import { useTrainer } from '@/hooks/useTrainer'
import { useLocale } from '@/hooks/useLocale'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CategoryTabs } from './CategoryTabs'
import { ExerciseList } from './ExerciseList'
import { ExercisePanel } from './ExercisePanel'
import { SuccessModal } from './SuccessModal'
import styles from './TrainerShell.module.css'

export function TrainerShell() {
  const { locale, t } = useLocale()
  const trainer = useTrainer()
  const { progress } = trainer
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)

  useEffect(() => {
    if (trainer.currentExercise) {
      setIsMobileListOpen(false)
    }
  }, [trainer.currentExercise])

  const currentExerciseLabel = trainer.currentExercise
    ? getExerciseContent(trainer.currentExercise, locale).title
    : t.trainer.emptyTitle

  return (
    <div className={styles.shell}>
      <div className={styles.stickyHeader}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.backLink} aria-label={t.trainer.backHomeAria}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>
          <div className={styles.logo}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
            </svg>
            <span>SQL Trainer</span>
          </div>
        </div>

        <div className={styles.headerCenter}>
          <CategoryTabs
            currentCategory={trainer.currentCategory}
            onSelect={trainer.selectCategory}
          />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress.percentage}%` }} />
            </div>
            <span className={styles.progressText}>
              {progress.completedCount} / {progress.totalCount}
            </span>
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <div className={styles.mobileRail}>
        <button
          type="button"
          className={styles.mobileListToggle}
          onClick={() => setIsMobileListOpen(open => !open)}
          aria-expanded={isMobileListOpen}
          aria-label={isMobileListOpen ? t.trainer.exerciseListClose : t.trainer.exerciseListOpen}
        >
          <div className={styles.mobileListCopy}>
            <span className={styles.mobileListEyebrow}>{t.trainer.exerciseListTitle}</span>
            <span className={styles.mobileListValue}>{currentExerciseLabel}</span>
          </div>
          <div className={styles.mobileListMeta}>
            <span className={styles.mobileProgressPill}>
              {progress.completedCount} / {progress.totalCount}
            </span>
            <svg
              className={`${styles.mobileListChevron} ${isMobileListOpen ? styles.mobileListChevronOpen : ''}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>
      </div>

      <div className={styles.mobileCategoryRow}>
        <CategoryTabs
          currentCategory={trainer.currentCategory}
          onSelect={trainer.selectCategory}
        />
      </div>
      </div>{/* /stickyHeader */}

      <div className={styles.body}>
        <aside className={`${styles.sidebar} ${isMobileListOpen ? styles.sidebarOpen : ''}`}>
          <ExerciseList
            trainer={trainer}
            completedIds={progress.completedIds}
            onSelectComplete={() => setIsMobileListOpen(false)}
          />
        </aside>

        <main className={styles.main}>
          <ExercisePanel trainer={trainer} completedIds={progress.completedIds} />
        </main>
      </div>

      {trainer.showSuccessModal && (
        <SuccessModal
          onClose={trainer.closeModal}
          onNext={() => { trainer.closeModal(); trainer.nextExercise() }}
        />
      )}
    </div>
  )
}
