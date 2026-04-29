import { de } from './de'
import { en } from './en'

export type Locale = 'de' | 'en'

export interface Dict {
  meta: {
    title: string
    description: string
    trainerTitle: string
  }
  controls: {
    theme: string
    language: string
  }
  landing: {
    badge: string
    headline: string
    headlineAccent: string
    subtitle: string
    cta: string
    stats: {
      ddlDesc: string
      dmlDesc: string
      dqlDesc: string
      joinsDesc: string
    }
    features: {
      schema: { title: string; desc: string }
      hints:  { title: string; desc: string }
      progress: { title: string; desc: string }
    }
    footerCta: string
  }
  trainer: {
    categoriesAria: string
    previousExerciseAria: string
    nextExerciseAria: string
    exerciseListTitle: string
    exerciseListOpen: string
    exerciseListClose: string
    categories: {
      all: string
      ddl: string
      dml: string
      dql: string
      joins: string
    }
    joinTypes: {
      inner: string
      left: string
      right: string
      advanced: string
    }
    emptyTitle: string
    emptyHint: string
    solved: string
    resetProgress: string
    resetConfirm: string
    backToJoins: string
    difficultyAria: string
    editor: {
      label: string
      placeholder: string
      submit: string
      clear: string
      aria: string
    }
    schema: {
      label: string
      pkAria: string
      fkAria: string
    }
    feedback: {
      noExerciseTitle: string
      noExerciseMsg: string
      emptyTitle: string
      emptyMsg: string
      wrongTitle: string
      hintShow: string
      hintNext: string
    }
    success: {
      aria: string
      title: string
      subtitle: string
      close: string
      next: string
    }
    validation: {
      emptyQuery: string
      forbiddenKeyword: string
      multipleJoins: string
      selectNeedsFrom: string
      updateNeedsSet: string
      insertNeedsValuesOrSelect: string
      unbalancedParens: string
      unclosedQuotes: string
      missingCommand: string
      missingJoin: string
      missingWhere: string
      missingOn: string
      missingClause: string
      missingAggregate: string
      missingNumbers: string
      incomplete: string
    }
    backHomeAria: string
  }
  footer: {
    builtBy: string
    domain: string
  }
}

export const LOCALES: Locale[] = ['de', 'en']
export const DEFAULT_LOCALE: Locale = 'de'
export const LOCALE_STORAGE_KEY = 'sqlTrainerLocale'

const dictionaries: Record<Locale, Dict> = {
  de,
  en,
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'de' || value === 'en'
}

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]
}
