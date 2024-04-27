import { Stack, router } from 'expo-router'

import { WithAuth } from '@/components'
import { HeaderBackButtonProps, HeaderButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

const HeaderEditButton = ({ tintColor }: HeaderBackButtonProps) => {
  const { data: me } = useMe()

  if (!me) return

  return (
    <HeaderButton
      icon="FAS-gear"
      onPress={() => router.navigate('/(tabs)/profile/settings')}
    />
  )
}

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: t('profile'), headerRight: HeaderEditButton }}
      />
      <Stack.Screen
        name="settings"
        options={{
          presentation: 'containedModal',
          headerShown: false,
        }}
      />
    </Stack>
  )
})
