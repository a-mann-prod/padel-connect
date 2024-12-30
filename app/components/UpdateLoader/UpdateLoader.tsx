import { SafeAreaView } from '@gluestack-ui/themed'
import * as Updates from 'expo-updates'
import { PropsWithChildren, useEffect } from 'react'

import { Loader } from '@/designSystem'
import { useAppState } from '@/hooks/useAppstate'
import { useTranslate } from '@/services/i18n'

export const UpdateLoader = ({ children }: PropsWithChildren) => {
  const t = useTranslate()
  const { isUpdateAvailable, isUpdatePending, checkError } =
    Updates.useUpdates()
  const appState = useAppState()

  useEffect(() => {
    const checkForUpdates = async () => {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }

    appState === 'active' && checkForUpdates()
  }, [appState])

  const getTitle = () => {
    if (checkError) return t('updateError')
    if (isUpdatePending || isUpdateAvailable) return t('updateDownloading')
  }

  if (isUpdateAvailable) {
    return (
      <SafeAreaView flex={1} variant="colored">
        <Loader title={getTitle()} />
      </SafeAreaView>
    )
  }

  return children
}
