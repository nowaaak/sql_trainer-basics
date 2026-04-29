'use client'

import type { Schema } from '@/data/types'
import { useLocale } from '@/hooks/useLocale'
import styles from './SchemaViewer.module.css'

interface Props {
  schema: Schema
}

export function SchemaViewer({ schema }: Props) {
  const { t } = useLocale()

  return (
    <div className={styles.section}>
      <div className={styles.sectionLabel}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2" y="3" width="8" height="5" rx="1" />
          <rect x="14" y="3" width="8" height="5" rx="1" />
          <rect x="2" y="16" width="8" height="5" rx="1" />
          <path d="M6 8v3M18 8v5M6 11h12M6 13v3" />
        </svg>
        {t.trainer.schema.label}
      </div>
      <div className={styles.tables}>
        {schema.tables.map(table => (
          <div key={table.name} className={styles.table}>
            <div className={styles.tableName}>{table.name}</div>
            <div className={styles.columns}>
              {table.columns.map(col => (
                <div
                  key={col.name}
                  className={`${styles.column} ${col.pk ? styles.pk : ''} ${col.fk ? styles.fk : ''}`}
                >
                  <span className={styles.colName}>
                    {col.pk && <span className={styles.keyIcon} aria-label={t.trainer.schema.pkAria}>🔑</span>}
                    {col.fk && !col.pk && <span className={styles.keyIcon} aria-label={t.trainer.schema.fkAria}>🔗</span>}
                    {col.name}
                  </span>
                  <span className={styles.colType}>{col.type}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
