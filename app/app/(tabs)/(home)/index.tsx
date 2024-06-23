import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { TileButton } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useMe } from '@/hooks/useMe'
import { useNavigationBadgeCount } from '@/hooks/useNavigationBadgeCount'
import { useUnreadNotifications } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const { data: me } = useMe()
  const t = useTranslate()

  const { count: badgeCount } = useUnreadNotifications({
    params: { user_id: me?.id as string },
  })

  useHeaderButton({
    icon: 'FAS-lightbulb',
    onPress: () => router.navigate(routing.homeNotifications.path()),
    side: 'headerRight',
    badgeCount,
    condition: !!me,
  })

  useNavigationBadgeCount(badgeCount)

  return (
    <VStack gap="$5" m="$5">
      <TileButton
        color="$white"
        bgColor="$primary500"
        title={t('navigation.myMatches')}
        icon="FAS-baseball"
        onPress={() => router.navigate(routing.homeMyMatches.path())}
        disabled={!me}
      />
    </VStack>
  )
}
