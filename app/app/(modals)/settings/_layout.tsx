import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: t('settings') }} />
      <Stack.Screen
        name="update-personal-information"
        options={{ title: t('updatePersonalInformation') }}
      />
      <Stack.Screen name="email-change" options={{ title: t('emailChange') }} />
      <Stack.Screen
        name="password-change"
        options={{ title: t('passwordChange') }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ title: t('privacyPolicy') }}
      />
      <Stack.Screen name="terms-of-use" options={{ title: t('termsOfUse') }} />
    </Stack>
  )
})
