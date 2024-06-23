import { Stack } from 'expo-router'

import { OnboardingProvider } from '@/contexts'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <OnboardingProvider>
      <Stack initialRouteName="personal-information">
        <Stack.Screen
          name="personal-information"
          options={{
            title: t('personalInformation'),
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
        <Stack.Screen
          name="preferences"
          options={{
            title: t('preferences'),
          }}
        />
      </Stack>
    </OnboardingProvider>
  )
}
