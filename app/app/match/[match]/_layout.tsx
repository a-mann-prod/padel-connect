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
          title: t('bookingDetails'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.matchPlayersManage.name}
        options={{
          title: t('playersManage'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.matchUpdate.name}
        options={{
          title: '',
          presentation: 'containedModal',
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.matchUser.name}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={routing.matchChat.name}
        options={{
          title: '',
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name={routing.matchJoinRequest.name}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={routing.matchShareMatch.name}
        options={{
          title: '',
        }}
      />
    </Stack>
  )
}
