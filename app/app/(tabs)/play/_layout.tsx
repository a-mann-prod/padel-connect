import { Stack } from 'expo-router'

import { WithAuth } from '@/components'
import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: t('play') }} />
      <Stack.Screen name="match/[match]" options={{ headerShown: false }} />
      <Stack.Screen
        name="match/create"
        options={{
          title: t('matchCreate'),
          headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
          presentation: 'containedModal',
        }}
      />
    </Stack>
  )
})
