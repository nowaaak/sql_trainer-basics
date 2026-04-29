'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { getExerciseContent } from '@/data/exercise-content'
import { exercises } from '@/data/exercises'
import { validateSQL } from '@/lib/sql-validator'
import { useLocale } from './useLocale'
import { useProgress } from './useProgress'
import type { Exercise, Category, JoinType, FeedbackState } from '@/data/types'

export function useTrainer() {
  const { locale, t } = useLocale()
  const progress = useProgress()

  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [currentCategory, setCurrentCategoryState] = useState<Category | 'all'>('all')
  const [currentJoinType, setCurrentJoinTypeState] = useState<JoinType | null>(null)
  const [userSQL, setUserSQL] = useState('')
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [currentHints, setCurrentHints] = useState<string[]>([])
  const [hintLevel, setHintLevel] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const getFilteredExercises = useCallback(
    (category: Category | 'all', joinType: JoinType | null): Exercise[] => {
      if (category === 'all') return exercises
      if (category === 'joins') {
        if (!joinType) return []
        return exercises.filter(ex => ex.category === 'joins' && ex.joinType === joinType)
      }
      return exercises.filter(ex => ex.category === category)
    },
    [],
  )

  const selectExercise = useCallback((id: number) => {
    const exercise = exercises.find(ex => ex.id === id)
    if (!exercise) return
    setCurrentExercise(exercise)
    setUserSQL('')
    setFeedback(null)
    setCurrentHints([])
    setHintLevel(0)
  }, [])

  const selectCategory = useCallback(
    (category: Category | 'all') => {
      setCurrentCategoryState(category)
      if (category !== 'joins') {
        setCurrentJoinTypeState(null)
      }
      setCurrentExercise(null)
      setUserSQL('')
      setFeedback(null)
    },
    [],
  )

  const selectJoinType = useCallback(
    (joinType: JoinType) => {
      setCurrentJoinTypeState(joinType)
      const filtered = getFilteredExercises('joins', joinType)
      if (filtered.length > 0) {
        selectExercise(filtered[0].id)
      }
    },
    [getFilteredExercises, selectExercise],
  )

  const submit = useCallback(() => {
    if (!currentExercise) {
      setFeedback({
        type: 'warning',
        title: t.trainer.feedback.noExerciseTitle,
        message: t.trainer.feedback.noExerciseMsg,
      })
      return
    }
    if (!userSQL.trim()) {
      setFeedback({
        type: 'warning',
        title: t.trainer.feedback.emptyTitle,
        message: t.trainer.feedback.emptyMsg,
      })
      return
    }

    const result = validateSQL(userSQL, currentExercise.validation, t.trainer.validation)

    if (result.isCorrect) {
      progress.markCompleted(currentExercise.id)
      setFeedback(null)
      setShowSuccessModal(true)
    } else {
      const hints = getExerciseContent(currentExercise, locale).hints
      setCurrentHints(hints)
      setHintLevel(0)
      setFeedback({
        type: 'error',
        title: t.trainer.feedback.wrongTitle,
        message: result.message,
        hints,
      })
    }
  }, [currentExercise, locale, progress, t, userSQL])

  const syncRef = useRef({ currentExercise, userSQL, feedback, currentHints, locale, t })
  syncRef.current = { currentExercise, userSQL, feedback, currentHints, locale, t }

  useEffect(() => {
    const s = syncRef.current

    if (s.currentExercise && s.currentHints.length > 0) {
      setCurrentHints(getExerciseContent(s.currentExercise, s.locale).hints)
    }

    if (!s.feedback) return

    if (!s.currentExercise) {
      setFeedback({
        type: 'warning',
        title: s.t.trainer.feedback.noExerciseTitle,
        message: s.t.trainer.feedback.noExerciseMsg,
      })
      return
    }

    if (!s.userSQL.trim()) {
      setFeedback({
        type: 'warning',
        title: s.t.trainer.feedback.emptyTitle,
        message: s.t.trainer.feedback.emptyMsg,
      })
      return
    }

    if (s.feedback.type === 'error') {
      const result = validateSQL(s.userSQL, s.currentExercise.validation, s.t.trainer.validation)
      if (!result.isCorrect) {
        setFeedback({
          type: 'error',
          title: s.t.trainer.feedback.wrongTitle,
          message: result.message,
          hints: getExerciseContent(s.currentExercise, s.locale).hints,
        })
      }
    }
  }, [locale])

  const clear = useCallback(() => {
    setUserSQL('')
    setFeedback(null)
  }, [])

  const showNextHint = useCallback(() => {
    setHintLevel(prev => Math.min(prev + 1, currentHints.length))
  }, [currentHints.length])

  const closeModal = useCallback(() => {
    setShowSuccessModal(false)
  }, [])

  const navigateExercise = useCallback(
    (direction: 'next' | 'prev') => {
      const filtered = getFilteredExercises(currentCategory, currentJoinType)
      if (filtered.length === 0) return

      const currentIndex = filtered.findIndex(ex => ex.id === currentExercise?.id)
      let nextIndex: number

      if (direction === 'next') {
        nextIndex = currentIndex + 1
        if (nextIndex >= filtered.length) nextIndex = 0

        let attempts = 0
        while (progress.completedIds.includes(filtered[nextIndex].id) && attempts < filtered.length) {
          nextIndex = (nextIndex + 1) % filtered.length
          attempts++
        }
      } else {
        nextIndex = currentIndex - 1
        if (nextIndex < 0) nextIndex = filtered.length - 1
      }

      selectExercise(filtered[nextIndex].id)
    },
    [currentCategory, currentJoinType, currentExercise, getFilteredExercises, progress.completedIds, selectExercise],
  )

  const nextExercise = useCallback(() => navigateExercise('next'), [navigateExercise])
  const previousExercise = useCallback(() => navigateExercise('prev'), [navigateExercise])

  const filteredExercises = getFilteredExercises(currentCategory, currentJoinType)
  const currentIndex = filteredExercises.findIndex(ex => ex.id === currentExercise?.id)

  return {
    currentExercise,
    currentCategory,
    currentJoinType,
    userSQL,
    setUserSQL,
    feedback,
    currentHints,
    hintLevel,
    showSuccessModal,
    filteredExercises,
    currentIndex,
    selectExercise,
    selectCategory,
    selectJoinType,
    submit,
    clear,
    showNextHint,
    closeModal,
    nextExercise,
    previousExercise,
    progress,
  }
}
