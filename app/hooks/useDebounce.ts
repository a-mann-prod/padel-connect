import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounce = <T>(callback: (value: T) => void, delay = 800) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [isDebouncing, setIsDebouncing] = useState(false)

  const debouncedCallback = useCallback(
    (value: T) => {
      setIsDebouncing(true)
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(value)
        setIsDebouncing(false)
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { isDebouncing, debouncedCallback }
}
