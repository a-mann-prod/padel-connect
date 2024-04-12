import { useCallback, useEffect, useRef } from 'react'

export const useDebounce = <T>(callback: (value: T) => void, delay = 800) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const debouncedCallback = useCallback(
    (value: T) => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(value)
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

  return debouncedCallback
}
