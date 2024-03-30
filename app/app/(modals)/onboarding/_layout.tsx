import { Stack } from 'expo-router'
import { Platform } from 'react-native'

import { OnboardingProvider } from '@/contexts'
import { HeaderCloseButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <OnboardingProvider>
      <Stack>
        <Stack.Screen
          name="personal-information"
          options={{
            title: t('personalInformation'),
            headerLeft: (props) =>
              Platform.OS === 'ios' && (
                <HeaderCloseButton {...props} isInModal />
              ),
          }}
        />
        <Stack.Screen
          name="avatar"
          options={{
            title: t('avatar'),
          }}
        />
        <Stack.Screen
          name="get-started"
          options={{
            title: t('getStarted'),
          }}
        />
      </Stack>
    </OnboardingProvider>
  )
}
