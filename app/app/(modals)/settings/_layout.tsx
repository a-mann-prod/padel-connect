import { Stack } from 'expo-router'

import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  )
}
