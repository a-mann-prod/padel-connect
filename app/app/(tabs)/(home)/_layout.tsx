import { Stack } from 'expo-router'

import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: t('home') }} />
      <Stack.Screen
        name={routing.homeMyMatches.name}
        options={{ title: t('myMatches') }}
      />
      <Stack.Screen
        name={routing.homeNotifications.name}
        options={{
          title: t('notifications'),
        }}
      />
    </Stack>
  )
}
