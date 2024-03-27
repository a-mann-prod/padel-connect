import { ScrollView, VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView } from '@/components'
import { LoginForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$3" m="$5">
        <LoginForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
