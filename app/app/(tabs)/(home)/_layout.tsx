import { router, Stack } from 'expo-router'

import { HeaderButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: t('home'),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routing.homeMyMatches.name}
        options={{ title: t('myMatches') }}
      />
      <Stack.Screen
        name={routing.homeMyOldMatches.name}
        options={{ title: t('myOldMatches') }}
      />
      <Stack.Screen
        name={routing.homeNotifications.name}
        options={{
          title: t('notifications'),
        }}
      />
      <Stack.Screen
        name={routing.homeTournaments.name}
        options={{
          title: t('tournaments'),
          headerRight: (props) => (
            <HeaderButton
              icon="FAS-sliders"
              onPress={() =>
                router.navigate(routing.homeTournamentsFilters.path())
              }
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name={routing.homeTournamentsFilters.name}
        options={{
          title: t('filters'),
        }}
      />
      <Stack.Screen
        name={routing.homeTournamentDetail.name}
        options={{ title: '' }}
      />
    </Stack>
  )
}
