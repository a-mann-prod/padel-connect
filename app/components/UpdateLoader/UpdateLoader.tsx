import { SafeAreaView } from '@gluestack-ui/themed'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'

import { Loader } from '@/designSystem'

export const UpdateLoader = () => {
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
    if (checkError) return `Error checking for updates: ${checkError.message}`
    if (isUpdatePending) return 'Downloading update...'
    if (isUpdateAvailable) return 'Update downloaded. Restarting app...'
  }

  return (
    <SafeAreaView flex={1}>
      <Loader title={getTitle()} />
    </SafeAreaView>
  )
}
