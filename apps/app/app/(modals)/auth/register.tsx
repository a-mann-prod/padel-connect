import { KeyboardAvoidingView } from '@/components'
import { RegisterForm } from '@/nodes'
import { ScrollView, VStack } from '@gluestack-ui/themed'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack space="lg" m="$5">
        <RegisterForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
