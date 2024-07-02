import { Stack } from 'expo-router'

import { OnboardingProvider } from '@/contexts'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <OnboardingProvider>
      <Stack initialRouteName={routing.onboardingPersonalInformation.name}>
        <Stack.Screen
          name={routing.onboardingPersonalInformation.name}
          options={{
            title: t('personalInformation'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingAvatar.name}
          options={{
            title: t('avatar'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingPreferences.name}
          options={{
            title: t('preferences'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingLevelEstimation.name}
          options={{
            title: t('levelEstimation'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingNotificationAlerts.name}
          options={{
            title: t('notificationAlerts'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingFilters.name}
          options={{
            title: t('filters'),
          }}
        />
        <Stack.Screen
          name={routing.onboardingGetStarted.name}
          options={{
            title: t('getStarted'),
          }}
        />
      </Stack>
    </OnboardingProvider>
  )
}
