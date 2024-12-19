import { Stack } from 'expo-router'

import { WithMatch } from '@/components'
import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithMatch(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: t('updateMatch'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.matchUpdateParam.name}
        options={{
          title: t('updateMatch'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
    </Stack>
  )
})
