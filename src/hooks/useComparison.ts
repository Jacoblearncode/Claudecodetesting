'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'apex-compare'
const MAX_COMPARE = 3

export function useComparison() {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setIds(JSON.parse(stored))
    } catch {}
  }, [])

  const save = useCallback((next: string[]) => {
    setIds(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const toggle = useCallback((id: string) => {
    setIds(prev => {
      if (prev.includes(id)) {
        const next = prev.filter(x => x !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      }
      if (prev.length >= MAX_COMPARE) return prev
      const next = [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setIds(prev => {
      const next = prev.filter(x => x !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clear = useCallback(() => save([]), [save])

  return { ids, toggle, remove, clear, maxReached: ids.length >= MAX_COMPARE }
}
