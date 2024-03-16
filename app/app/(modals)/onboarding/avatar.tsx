import { AvatarForm } from '@/nodes'
import { KeyboardAvoidingView, ScrollView, VStack } from '@gluestack-ui/themed'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack space="md" m="$5">
        <AvatarForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
