import { ScrollView, VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView } from '@/components'
import { RegisterForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack space="lg" m="$5">
        <RegisterForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
