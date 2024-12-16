import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { CreateMatchProvider } from '@/contexts/CreateMatchContext'
import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <CreateMatchProvider>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            title: t('matchCreate'),
            headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
          }}
        />
        <Stack.Screen
          name={routing.matchCreateAddPartner.name}
          options={{ title: t('addPartner') }}
        />
        <Stack.Screen
          name={routing.matchCreateShareMatch.name}
          options={{ title: t('shareMatch') }}
        />
        <Stack.Screen
          name={routing.matchCreateBookField.name}
          // options={{ title: t('shareMatch') }}
        />
      </Stack>
    </CreateMatchProvider>
  )
})
