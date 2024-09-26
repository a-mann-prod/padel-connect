import { router, Stack } from 'expo-router'

import { HeaderBackButton, HeaderButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: t('play'),
          headerRight: (props) => (
            <HeaderButton
              icon="FAS-sliders"
              onPress={() => router.navigate(routing.playFilters.path())}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name={routing.playFilters.name}
        options={{
          title: t('filters'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
          presentation: 'containedModal',
        }}
      />
    </Stack>
  )
}
