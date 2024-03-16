import { KeyboardAvoidingView, ScrollView, VStack } from '@gluestack-ui/themed'

import { PersonalInfoForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack space="md" m="$5">
        <PersonalInfoForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
