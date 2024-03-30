import { Stack } from 'expo-router'

import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: t('login'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: t('register'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen name="password-reset-request" options={{ title: '' }} />
    </Stack>
  )
}
