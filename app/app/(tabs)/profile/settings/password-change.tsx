import { VStack } from '@gluestack-ui/themed'

import { PasswordChangeForm } from '@/components'

export default () => {
  return (
    <VStack flex={1} gap="$3" m="$5">
      <PasswordChangeForm />
    </VStack>
  )
}
