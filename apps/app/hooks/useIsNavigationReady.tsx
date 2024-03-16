import { useRootNavigationState } from 'expo-router'

export const useIsNavigationReady = () => {
  const rootNavigationState = useRootNavigationState()
  return rootNavigationState?.key != null
}
