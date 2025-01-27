import { Text, VStack } from '@gluestack-ui/themed'
import { Link, Stack } from 'expo-router'

export default () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <VStack gap="$3" m="$5">
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </VStack>
    </>
  )
}
