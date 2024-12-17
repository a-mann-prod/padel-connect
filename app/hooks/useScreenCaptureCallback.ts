import * as ScreenCapture from 'expo-screen-capture'
import { useEffect } from 'react'

export default function useScreenCaptureCallback(callback?: () => void) {
  // Only use this if you add the READ_MEDIA_IMAGES permission to your AndroidManifest.xml
  const hasPermissions = async () => {
    const { status } = await ScreenCapture.requestPermissionsAsync()
    return status === 'granted'
  }

  useEffect(() => {
    let subscription: any

    const addListenerAsync = async () => {
      if (await hasPermissions()) {
        subscription = ScreenCapture.addScreenshotListener(() => {
          callback?.()
        })
      } else {
        console.error(
          'Permissions needed to subscribe to screenshot events are missing!'
        )
      }
    }
    addListenerAsync()

    return () => {
      subscription?.remove()
    }
  }, [callback])
}
