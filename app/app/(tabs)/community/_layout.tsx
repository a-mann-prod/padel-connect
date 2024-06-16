import { Stack, router } from 'expo-router'

import { HeaderBackButtonProps, HeaderButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  const HeaderFavoriteUsers = ({ tintColor }: HeaderBackButtonProps) => {
    const { data: me } = useMe()

    if (!me) return

    return (
      <HeaderButton
        icon="FAS-star"
        onPress={() => router.navigate('/(tabs)/community/favorite-users')}
      />
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: t('community'), headerRight: HeaderFavoriteUsers }}
      />
      <Stack.Screen name="[user]" options={{ title: '' }} />
      <Stack.Screen name="favorite-users" options={{ title: t('favorites') }} />
    </Stack>
  )
}
