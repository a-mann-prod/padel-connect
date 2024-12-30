import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

type AppStateCallback = (nextAppState: AppStateStatus) => void

export const useAppState = (onChange?: AppStateCallback) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  )

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState)
      if (onChange) {
        onChange(nextAppState)
      }
    }

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      subscription.remove()
    }
  }, [onChange])

  return appState
}
