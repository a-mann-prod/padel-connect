import { Stack } from 'expo-router'
import { Platform } from 'react-native'

import { HeaderCloseButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen name="email-verified" options={{ headerShown: false }} />
      <Stack.Screen
        name="password-reset"
        options={{
          title: t('passwordReset'),
          headerLeft: (props) =>
            Platform.OS === 'ios' && <HeaderCloseButton {...props} isInModal />,
        }}
      />
    </Stack>
  )
}
