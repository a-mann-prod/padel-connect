import { VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView, LoginForm } from '@/components'
import { ScrollView } from '@/designSystem'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$3" m="$5">
        <LoginForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
