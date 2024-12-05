import { VStack } from '@gluestack-ui/themed'

import { EmailChangeForm } from '@/components'

export default () => {
  return (
    <VStack flex={1} gap="$3" m="$5">
      <EmailChangeForm />
    </VStack>
  )
}
