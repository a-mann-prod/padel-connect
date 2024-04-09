import { ScrollView, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  PersonalInfoForm,
  PersonalInfoFormValues,
} from '@/components'
import { useOnboardingContext } from '@/contexts'
import { useTranslate } from '@/services/i18n'

export default () => {
  const tGlobal = useTranslate()

  const { setPersonalInfo } = useOnboardingContext()

  const handleOnSubmit = (values: PersonalInfoFormValues) => {
    setPersonalInfo(values)
    router.navigate('/(modals)/onboarding/avatar')
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <PersonalInfoForm
            onSubmit={handleOnSubmit}
            buttonTitle={tGlobal('next')}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
