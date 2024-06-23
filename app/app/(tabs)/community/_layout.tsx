import { Stack, router } from 'expo-router'

import { HeaderBackButtonProps, HeaderButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  const HeaderFavoriteUsers = ({ tintColor }: HeaderBackButtonProps) => {
    const { data: me } = useMe()

    if (!me) return

    return (
      <HeaderButton
        icon="FAS-star"
        onPress={() => router.navigate(routing.communityFavoriteUsers.path())}
      />
    )
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ title: t('community'), headerRight: HeaderFavoriteUsers }}
      />
      <Stack.Screen name={routing.communityUser.name} options={{ title: '' }} />
      <Stack.Screen
        name={routing.communityFavoriteUsers.name}
        options={{ title: t('favorites') }}
      />
    </Stack>
  )
}
