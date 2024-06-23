import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { MatchFiltersProvider } from '@/contexts'
import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <MatchFiltersProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ title: t('play') }} />
        <Stack.Screen
          name={routing.playFilters.name}
          options={{
            title: t('filters'),
            headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
            presentation: 'containedModal',
          }}
        />
      </Stack>
    </MatchFiltersProvider>
  )
})
