import { VStack } from '@gluestack-ui/themed'

import { PasswordChangeForm } from '@/nodes/settings/PasswordChangeForm/PasswordChangeForm'

export default () => {
  return (
    <VStack gap="$3" m="$5">
      <PasswordChangeForm />
    </VStack>
  )
}
