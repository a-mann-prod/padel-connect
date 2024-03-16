import { KeyboardAvoidingView, ScrollView, VStack } from '@gluestack-ui/themed'

import { AvatarForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack space="md" m="$5">
        <AvatarForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
