import { Stack } from 'expo-router'

import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack initialRouteName="[match]">
      <Stack.Screen
        name="[match]"
        options={{
          title: '',
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
        }}
      />
    </Stack>
  )
}
