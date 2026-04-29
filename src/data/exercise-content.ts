import type { Locale } from '@/lib/i18n'
import type { Exercise } from './types'
import { exerciseTranslationsEn } from './exercise-translations-en'

export interface ResolvedExerciseContent {
  title: string
  description: string
  hints: string[]
  explanation?: string
}

export function getExerciseContent(exercise: Exercise, locale: Locale): ResolvedExerciseContent {
  if (locale === 'en') {
    const translation = exerciseTranslationsEn[exercise.id]
    if (translation) {
      return {
        title: translation.title,
        description: translation.description,
        hints: translation.hints ?? exercise.validation.hints ?? [],
        explanation: translation.explanation ?? exercise.explanation,
      }
    }
  }

  return {
    title: exercise.title,
    description: exercise.description,
    hints: exercise.validation.hints ?? [],
    explanation: exercise.explanation,
  }
}
