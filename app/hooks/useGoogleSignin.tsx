import Constants, { ExecutionEnvironment } from 'expo-constants'

import { useGoogleLogin } from '@/services/api'

export const useGoogleSignin = () => {
  const { mutate: googleLogin } = useGoogleLogin()

  if (Constants.executionEnvironment !== ExecutionEnvironment.StoreClient) {
    const googleSigninModule = require('@react-native-google-signin/google-signin')

    return async () => {
      try {
        await googleSigninModule.GoogleSignin.hasPlayServices()
        const response = await googleSigninModule.GoogleSignin.signIn()

        if (response.type === 'success' && response.data.idToken) {
          googleLogin({ google_token: response.data.idToken })
        } else {
          // sign in was cancelled by user
        }
      } catch (error: any) {
        console.error(error)
        switch (error.code) {
          case googleSigninModule.statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break
          case googleSigninModule.statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break
          default:
          // some other error happened
        }
      }
    }
  }

  return () => console.log('Not available with expo-go')
}
