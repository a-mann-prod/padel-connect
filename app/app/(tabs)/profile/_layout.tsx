import { Stack, router } from 'expo-router'

import { WithAuth } from '@/components'
import { HeaderBackButtonProps, IconButton } from '@/designSystem'
import { HeaderButtonContainer } from '@/designSystem/HeaderButtonContainer/HeaderButtonContainer'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

const HeaderEditButton = ({ tintColor }: HeaderBackButtonProps) => {
  const { data: me } = useMe()

  if (!me) return

  return (
    <HeaderButtonContainer>
      <IconButton
        variant="headerIcon"
        icon="FAS-gear"
        iconProps={{ size: 16 }}
        onPress={() => router.navigate('/(tabs)/profile/settings')}
      />
    </HeaderButtonContainer>
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
