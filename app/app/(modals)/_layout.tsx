import { HeaderBackButton } from '@/designSystem'
import { Stack } from 'expo-router'

export default () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="browser"
      options={{
        headerShown: true,
        headerLeft: (props) => <HeaderBackButton {...props} isInModal />,
      }}
    />
  </Stack>
)
