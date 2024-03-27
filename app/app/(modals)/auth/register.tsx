import { ScrollView, VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView } from '@/components'
import { RegisterForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$5" m="$5">
        <RegisterForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
