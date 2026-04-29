'use client'

import type { Category } from '@/data/types'
import { useLocale } from '@/hooks/useLocale'
import styles from './CategoryTabs.module.css'

interface Props {
  currentCategory: Category | 'all'
  onSelect: (category: Category | 'all') => void
}

export function CategoryTabs({ currentCategory, onSelect }: Props) {
  const { t } = useLocale()
  const tabs: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: t.trainer.categories.all },
    { id: 'ddl', label: t.trainer.categories.ddl },
    { id: 'dml', label: t.trainer.categories.dml },
    { id: 'dql', label: t.trainer.categories.dql },
    { id: 'joins', label: t.trainer.categories.joins },
  ]

  return (
    <nav className={styles.tabs} aria-label={t.trainer.categoriesAria}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${currentCategory === tab.id ? styles.active : ''}`}
          onClick={() => onSelect(tab.id as Category | 'all')}
          aria-current={currentCategory === tab.id ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
