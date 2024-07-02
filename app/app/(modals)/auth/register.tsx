import { VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView, RegisterForm } from '@/components'
import { ScrollView } from '@/designSystem'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$5" m="$5">
        <RegisterForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
