import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  PreferencesForm,
  PreferencesFormValues,
} from '@/components'
import { useOnboardingContext } from '@/contexts'
import { ScrollView } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const tGlobal = useTranslate()
  const { preferences, setPreferences } = useOnboardingContext()

  const handleOnSubmit = (preferences: PreferencesFormValues) => {
    setPreferences(preferences)
    router.navigate(routing.onboardingGetStarted.path())
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <PreferencesForm
            defaultValues={preferences}
            onSubmit={handleOnSubmit}
            buttonTitle={tGlobal('next')}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
