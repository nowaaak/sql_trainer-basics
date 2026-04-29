'use client'

import { getExerciseContent } from '@/data/exercise-content'
import type { JoinType } from '@/data/types'
import type { useTrainer } from '@/hooks/useTrainer'
import { useLocale } from '@/hooks/useLocale'
import { exercises } from '@/data/exercises'
import styles from './ExerciseList.module.css'

type TrainerRef = ReturnType<typeof useTrainer>

const JOIN_ORDER: JoinType[] = ['inner', 'left', 'right', 'advanced']

function getJoinGroups(): Record<JoinType, number> {
  const counts: Record<JoinType, number> = { inner: 0, left: 0, right: 0, advanced: 0 }
  exercises.filter(e => e.category === 'joins').forEach(e => {
    const t = (e.joinType ?? 'advanced') as JoinType
    counts[t]++
  })
  return counts
}

interface Props {
  trainer: TrainerRef
  completedIds: number[]
  onSelectComplete?: () => void
}

export function ExerciseList({ trainer, completedIds, onSelectComplete }: Props) {
  const { locale, t } = useLocale()
  const { currentCategory, currentJoinType, currentExercise, filteredExercises, selectExercise, selectJoinType } = trainer
  const joinCounts = getJoinGroups()
  const joinLabels = t.trainer.joinTypes

  if (currentCategory === 'joins' && !currentJoinType) {
    return (
      <ul className={styles.list} role="list">
        {JOIN_ORDER.filter(t => joinCounts[t] > 0).map(type => (
          <li key={type}>
            <button
              className={styles.joinGroupBtn}
              onClick={() => {
                selectJoinType(type)
                onSelectComplete?.()
              }}
            >
              <span className={styles.itemText}>{joinLabels[type]}</span>
              <span className={styles.badge}>{joinCounts[type]}</span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (currentCategory === 'joins' && currentJoinType) {
    return (
      <div className={styles.wrapper}>
        <button
          className={styles.backToJoins}
          onClick={() => trainer.selectCategory('joins')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {t.trainer.backToJoins} · {joinLabels[currentJoinType]}
        </button>
        <ul className={styles.list} role="list">
          {filteredExercises.map(ex => {
            const isActive = currentExercise?.id === ex.id
            const isCompleted = completedIds.includes(ex.id)
            const localizedTitle = getExerciseContent(ex, locale).title
            return (
              <li key={ex.id}>
                <button
                  className={`${styles.item} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                  onClick={() => {
                    selectExercise(ex.id)
                    onSelectComplete?.()
                  }}
                >
                  {isCompleted && (
                    <svg className={styles.checkIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  <span className={styles.itemText}>{localizedTitle}</span>
                  <DifficultyDots
                    level={ex.difficulty}
                    ariaLabel={t.trainer.difficultyAria.replace('{level}', String(ex.difficulty))}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const nonJoins = currentCategory === 'all'
    ? exercises.filter(e => e.category !== 'joins')
    : filteredExercises

  return (
    <ul className={styles.list} role="list">
      {currentCategory === 'all' && (
        JOIN_ORDER.filter(t => joinCounts[t] > 0).map(type => (
          <li key={type}>
            <button
              className={styles.joinGroupBtn}
              onClick={() => {
                trainer.selectCategory('joins')
                selectJoinType(type)
                onSelectComplete?.()
              }}
            >
              <span className={styles.itemText}>{joinLabels[type]}</span>
              <span className={styles.badge}>{joinCounts[type]}</span>
            </button>
          </li>
        ))
      )}
      {nonJoins.map(ex => {
        const isActive = currentExercise?.id === ex.id
        const isCompleted = completedIds.includes(ex.id)
        const localizedTitle = getExerciseContent(ex, locale).title
        return (
          <li key={ex.id}>
            <button
              className={`${styles.item} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={() => {
                selectExercise(ex.id)
                onSelectComplete?.()
              }}
            >
              {isCompleted && (
                <svg className={styles.checkIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span className={styles.itemText}>{localizedTitle}</span>
              <span className={styles.catBadge}>{ex.category.toUpperCase()}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function DifficultyDots({ level, ariaLabel }: { level: number; ariaLabel: string }) {
  return (
    <span className={styles.dots} aria-label={ariaLabel}>
      {[1, 2, 3].map(i => (
        <span key={i} className={`${styles.dot} ${i <= level ? styles.dotFilled : ''}`} />
      ))}
    </span>
  )
}
