'use client'

import { useState, useEffect, useCallback } from 'react'
import { exercises } from '@/data/exercises'

const STORAGE_KEY = 'sqlTrainerProgress'

export function useProgress() {
  const [completedIds, setCompletedIds] = useState<number[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCompletedIds(JSON.parse(raw) as number[])
    } catch {
      // ignore corrupt data
    }
    setHydrated(true)
  }, [])

  const persist = (ids: number[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore storage errors
    }
  }

  const markCompleted = useCallback((id: number) => {
    setCompletedIds(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      persist(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    setCompletedIds([])
    persist([])
  }, [])

  const totalCount = exercises.length
  const completedCount = completedIds.length
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return { completedIds, completedCount, totalCount, percentage, markCompleted, resetProgress, hydrated }
}
