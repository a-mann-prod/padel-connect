import { VStack } from '@gluestack-ui/themed'

import { EmailChangeForm } from '@/nodes/settings/EmailChangeForm/EmailChangeForm'

export default () => {
  return (
    <VStack gap="$3" m="$5">
      <EmailChangeForm />
    </VStack>
  )
}
