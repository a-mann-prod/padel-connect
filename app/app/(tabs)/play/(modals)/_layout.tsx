import { Stack } from 'expo-router'

import { HeaderBackButton } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate(undefined, { keyPrefix: 'navigation' })

  return (
    <Stack
      screenOptions={{
        headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
      }}
    >
      <Stack.Screen
        name="match-creation"
        options={{ title: t('matchCreation') }}
      />
    </Stack>
  )
}
