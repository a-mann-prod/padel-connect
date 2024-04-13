import { VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView } from '@/components'
import { ScrollView } from '@/designSystem'
import { AvatarForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$3" m="$5">
        <AvatarForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
