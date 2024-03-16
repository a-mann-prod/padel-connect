import { HeaderBackButtonProps } from '@react-navigation/elements'
import { Stack, router } from 'expo-router'
import { Platform } from 'react-native'

import { IconButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

const displayCloseButton = ({
  canGoBack,
  tintColor,
}: HeaderBackButtonProps) => {
  if (!canGoBack) return undefined

  return (
    <IconButton
      variant="headerIcon"
      name="times-circle"
      iconProps={{ color: tintColor, size: 'lg' }}
      onPress={router.back}
    />
  )
}

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: t('login'),
          headerLeft: when(Platform.OS === 'ios', displayCloseButton),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: t('register'),
          headerLeft: when(Platform.OS === 'ios', displayCloseButton),
        }}
      />
      <Stack.Screen name="password-reset-request" options={{ title: '' }} />
    </Stack>
  )
}
