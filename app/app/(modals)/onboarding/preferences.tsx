import { ScrollView, VStack } from '@gluestack-ui/themed'

import { KeyboardAvoidingView } from '@/components'
import { PreferencesForm } from '@/nodes'

export default () => (
  <KeyboardAvoidingView>
    <ScrollView>
      <VStack gap="$5" m="$5">
        <PreferencesForm />
      </VStack>
    </ScrollView>
  </KeyboardAvoidingView>
)
