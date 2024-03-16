import { HeaderBackButtonProps } from '@react-navigation/elements'
import { Stack, router } from 'expo-router'
import { Platform } from 'react-native'

import { OnboardingProvider } from '@/contexts'
import { IconButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

const displayCloseButton = ({
  tintColor,
  canGoBack,
}: HeaderBackButtonProps) => {
  if (!canGoBack) return

  return (
    <IconButton
      variant="headerIcon"
      name="times-circle"
      iconProps={{ color: tintColor, size: 'lg' }}
      onPress={() => router.navigate('/')}
    />
  )
}

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })
  return (
    <OnboardingProvider>
      <Stack>
        <Stack.Screen
          name="personal-information"
          options={{
            title: t('personalInformation'),
            headerLeft: when(Platform.OS === 'ios', displayCloseButton),
          }}
        />
        <Stack.Screen
          name="avatar"
          options={{
            title: t('avatar'),
          }}
        />
      </Stack>
    </OnboardingProvider>
  )
}
