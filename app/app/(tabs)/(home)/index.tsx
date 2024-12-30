import { Box, HStack, SafeAreaView, StatusBar } from '@gluestack-ui/themed'
import { useIsFocused } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'

import { MenuImage } from '@/components'
import { Button, HeaderButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useNavigationBadgeCount } from '@/hooks/useNavigationBadgeCount'
import { useUnreadNotificationsCount } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const { data: me } = useMe()
  const t = useTranslate()

  const isFocused = useIsFocused()

  const { data: badgeCount } = useUnreadNotificationsCount({
    options: { enabled: !!me?.id },
  })

  useEffect(() => {
    if (badgeCount !== null && badgeCount !== undefined)
      Notifications.setBadgeCountAsync(badgeCount)
  }, [badgeCount])

  useNavigationBadgeCount(badgeCount)

  return (
    <>
      {isFocused && <StatusBar barStyle="dark-content" />}
      <SafeAreaView flex={1} position="absolute" zIndex={1} w="$full">
        <HStack mx="$3" justifyContent="flex-end">
          {me && (
            <Box variant="colored" rounded="$full">
              <HeaderButton
                icon="FAS-bell"
                onPress={() =>
                  router.navigate(routing.homeNotifications.path())
                }
                badgeCount={badgeCount || null}
              />
            </Box>
          )}
        </HStack>
      </SafeAreaView>
      <Box flex={1}>
        <MenuImage
          image={require('../../../assets/images/home_header_background.jpg')}
        >
          <Button
            justifyContent="space-between"
            title={t('navigation.tournaments')}
            icon="FAS-trophy"
            iconRight
            size="2xl"
            rounded="$lg"
            action="warning"
            onPress={() => router.navigate(routing.homeTournaments.path())}
          />
          <Button
            justifyContent="space-between"
            title={t('navigation.myMatches')}
            icon="FAS-baseball"
            iconRight
            size="2xl"
            rounded="$lg"
            onPress={() => router.navigate(routing.homeMyMatches.path())}
          />
          <Button
            justifyContent="space-between"
            title={t('navigation.myProgress')}
            icon="FAS-chart-simple"
            iconRight
            size="2xl"
            action="positive"
            rounded="$lg"
          />
        </MenuImage>
      </Box>
    </>
  )
}
