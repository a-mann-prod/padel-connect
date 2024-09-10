import { Stack } from 'expo-router'

import { HeaderBackButton } from '@/designSystem'
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
