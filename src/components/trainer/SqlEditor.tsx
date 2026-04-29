'use client'

import { useRef, useEffect } from 'react'
import { useLocale } from '@/hooks/useLocale'
import styles from './SqlEditor.module.css'

interface Props {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
}

export function SqlEditor({ value, onChange, onSubmit, onClear }: Props) {
  const { t } = useLocale()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart, selectionEnd } = e.currentTarget
      const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`
      onChange(next)
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 2
          textareaRef.current.selectionEnd = selectionStart + 2
        }
      })
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionLabel}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        {t.trainer.editor.label}
        <span className={styles.shortcut}>Ctrl+Enter</span>
      </div>

      <div className={styles.editorWrap}>
        <textarea
          ref={textareaRef}
          className={styles.editor}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.trainer.editor.placeholder}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          rows={5}
          aria-label={t.trainer.editor.aria}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.btnSecondary} onClick={onClear} type="button">
          {t.trainer.editor.clear}
        </button>
        <button className={styles.btnPrimary} onClick={onSubmit} type="button">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {t.trainer.editor.submit}
        </button>
      </div>
    </div>
  )
}
