import { VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import {
  KeyboardAvoidingView,
  PersonalInfoForm,
  PersonalInfoFormValues,
} from '@/components'
import { useOnboardingContext } from '@/contexts'
import { ScrollView } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default () => {
  const tGlobal = useTranslate()

  const { personalInfo, setPersonalInfo } = useOnboardingContext()

  const handleOnSubmit = (values: PersonalInfoFormValues) => {
    setPersonalInfo(values)
    router.navigate(routing.onboardingAvatar.path())
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <VStack gap="$5" m="$5">
          <PersonalInfoForm
            defaultValues={personalInfo}
            onSubmit={handleOnSubmit}
            buttonTitle={tGlobal('next')}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
