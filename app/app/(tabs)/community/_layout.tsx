import { Stack } from 'expo-router'

import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: t('community') }} />
      <Stack.Screen name={routing.communityUser.name} options={{ title: '' }} />
    </Stack>
  )
}
