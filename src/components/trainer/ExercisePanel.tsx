'use client'

import { getExerciseContent } from '@/data/exercise-content'
import type { useTrainer } from '@/hooks/useTrainer'
import { useLocale } from '@/hooks/useLocale'
import { SchemaViewer } from './SchemaViewer'
import { SqlEditor } from './SqlEditor'
import { FeedbackPanel } from './FeedbackPanel'
import styles from './ExercisePanel.module.css'

type TrainerRef = ReturnType<typeof useTrainer>

interface Props {
  trainer: TrainerRef
  completedIds: number[]
}

export function ExercisePanel({ trainer, completedIds }: Props) {
  const { locale, t } = useLocale()
  const { currentExercise, currentCategory, currentJoinType, filteredExercises, currentIndex } = trainer

  if (!currentExercise) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon} aria-hidden>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
            <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
          </svg>
        </div>
        <p className={styles.emptyTitle}>{t.trainer.emptyTitle}</p>
        <p className={styles.emptyHint}>{t.trainer.emptyHint}</p>
      </div>
    )
  }

  const joinLabels = t.trainer.joinTypes
  const localizedContent = getExerciseContent(currentExercise, locale)
  const isCompleted = completedIds.includes(currentExercise.id)
  const categoryLabel = currentExercise.joinType
    ? joinLabels[currentExercise.joinType] ?? currentExercise.category.toUpperCase()
    : currentExercise.category.toUpperCase()

  const showNav = currentCategory === 'joins' && currentJoinType

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.meta}>
          <span className={styles.categoryBadge}>{categoryLabel}</span>
          <DifficultyStars
            level={currentExercise.difficulty}
            ariaLabel={t.trainer.difficultyAria.replace('{level}', String(currentExercise.difficulty))}
          />
          {isCompleted && (
            <span className={styles.solvedBadge}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t.trainer.solved}
            </span>
          )}
        </div>

        {showNav && filteredExercises.length > 1 && (
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={trainer.previousExercise} aria-label={t.trainer.previousExerciseAria}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <span className={styles.navText}>
              {currentIndex + 1} / {filteredExercises.length}
            </span>
            <button className={styles.navBtn} onClick={trainer.nextExercise} aria-label={t.trainer.nextExerciseAria}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <h2 className={styles.title}>{localizedContent.title}</h2>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: localizedContent.description }}
      />

      {currentExercise.schema && (
        <SchemaViewer schema={currentExercise.schema} />
      )}

      <SqlEditor
        value={trainer.userSQL}
        onChange={trainer.setUserSQL}
        onSubmit={trainer.submit}
        onClear={trainer.clear}
      />

      {trainer.feedback && (
        <FeedbackPanel
          feedback={trainer.feedback}
          currentHints={trainer.currentHints}
          hintLevel={trainer.hintLevel}
          onShowNextHint={trainer.showNextHint}
        />
      )}

      <button
        className={styles.resetLink}
        onClick={() => {
          if (confirm(t.trainer.resetConfirm)) {
            trainer.progress.resetProgress()
          }
        }}
      >
        {t.trainer.resetProgress}
      </button>
    </div>
  )
}

function DifficultyStars({ level, ariaLabel }: { level: number; ariaLabel: string }) {
  return (
    <span className={styles.stars} aria-label={ariaLabel}>
      {[1, 2, 3].map(i => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= level ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={i <= level ? styles.starFilled : styles.starEmpty}
          aria-hidden
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  )
}
