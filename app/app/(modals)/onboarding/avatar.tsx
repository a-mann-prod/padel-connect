import { VStack } from '@gluestack-ui/themed'

import { AvatarForm, KeyboardAvoidingView } from '@/components'
import { ScrollView } from '@/designSystem'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$3" m="$5">
        <AvatarForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
