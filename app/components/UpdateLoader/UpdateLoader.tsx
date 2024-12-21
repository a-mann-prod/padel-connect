import { SafeAreaView } from '@gluestack-ui/themed'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'

import { Loader } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export const UpdateLoader = () => {
  const t = useTranslate()
  const { isUpdateAvailable, isUpdatePending, checkError } =
    Updates.useUpdates()

  useEffect(() => {
    const checkForUpdates = async () => {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    }

    checkForUpdates()
  }, [])

  const getTitle = () => {
    if (checkError) return t('updateError')
    if (isUpdatePending) return t('updateDownloading')
    if (isUpdateAvailable) return t('updateRestarting')
  }

  return (
    <SafeAreaView flex={1} variant="colored">
      <Loader title={getTitle()} />
    </SafeAreaView>
  )
}
