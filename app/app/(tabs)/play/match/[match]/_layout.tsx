import { Stack } from 'expo-router'

import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t('bookingDetails'),
          // TODO: why nested navigators needs back button
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name="players-manage"
        options={{ title: t('playersManage') }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: '',
          presentation: 'containedModal',
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
      <Stack.Screen
        name="user/[user]"
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: '',
        }}
      />
    </Stack>
  )
}
