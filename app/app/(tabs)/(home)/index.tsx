import {
  Box,
  HStack,
  Image,
  SafeAreaView,
  StatusBar,
  useColorMode,
  useToken,
  VStack,
} from '@gluestack-ui/themed'
import { useIsFocused } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'
import { useEffect } from 'react'

import { HeaderButton, TileButton } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useNavigationBadgeCount } from '@/hooks/useNavigationBadgeCount'
import { useUnreadNotifications } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const { data: me } = useMe()
  const t = useTranslate()

  const colorMode = useColorMode()

  const isFocused = useIsFocused()

  const backgroundColor = useToken(
    'colors',
    colorMode === 'light' ? 'backgroundLight50' : 'black'
  )

  const { count: badgeCount } = useUnreadNotifications({
    params: { user_id: me?.id as string },
  })

  useEffect(() => {
    if (badgeCount !== null) Notifications.setBadgeCountAsync(badgeCount)
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
      <Box flex={1} variant="colored">
        <Image
          h="40%"
          w="$full"
          alt="home-header-background"
          source={require('../../../assets/images/home-header-background.jpg')}
          resizeMode="cover"
        />
        <Box
          flex={1}
          mt={-30}
          bgColor={backgroundColor}
          borderTopLeftRadius="$3xl"
          borderTopRightRadius="$3xl"
        >
          <VStack gap="$5" m="$3" mt="$3">
            <TileButton
              color="$white"
              bgColor="$yellow500"
              title={t('navigation.tournaments')}
              icon="FAS-trophy"
              onPress={() => router.navigate(routing.homeTournaments.path())}
            />
            <TileButton
              color="$white"
              bgColor="$primary500"
              title={t('navigation.myMatches')}
              icon="FAS-baseball"
              onPress={() => router.navigate(routing.homeMyMatches.path())}
              disabled={!me}
            />
          </VStack>
        </Box>
      </Box>
    </>
  )
}
