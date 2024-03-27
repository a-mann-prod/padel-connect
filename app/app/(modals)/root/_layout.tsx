import { HeaderBackButtonProps } from '@react-navigation/elements'
import { Stack, router } from 'expo-router'
import { Platform } from 'react-native'

import { IconButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

const displayCloseButton = ({ tintColor }: HeaderBackButtonProps) => (
  <IconButton
    variant="headerIcon"
    icon="circle-xmark"
    iconProps={{ color: tintColor, size: 'lg' }}
    onPress={() => router.navigate('/')}
  />
)

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <Stack>
      <Stack.Screen name="email-verified" options={{ headerShown: false }} />
      <Stack.Screen
        name="password-reset"
        options={{
          title: t('passwordReset'),
          headerLeft: when(Platform.OS === 'ios', displayCloseButton),
        }}
      />
    </Stack>
  )
}
