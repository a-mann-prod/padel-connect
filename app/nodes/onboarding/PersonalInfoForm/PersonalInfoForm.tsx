import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import {
  PersonalInfoFormValues,
  personalInfoFormServices,
} from './PersonalInfoForm.services'

import { FormInputControlled, FormProvider } from '@/components'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = personalInfoFormServices

export const PersonalInfoForm = () => {
  const tGlobal = useTranslate()
  const { setPersonalInfo } = useOnboardingContext()

  const methods = useForm<PersonalInfoFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (d: PersonalInfoFormValues) => {
    setPersonalInfo(d)
    router.navigate('/(modals)/onboarding/avatar')
  }

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="first_name"
            formControlProps={{
              title: tGlobal('firstname'),
            }}
            displayPlaceHolder
            autoCapitalize="words"
            autoCorrect={false}
            inputMode="text"
          />
          <FormInputControlled
            name="last_name"
            formControlProps={{
              title: tGlobal('lastname'),
              helpMessage: tGlobal('lastnameHelpMessage'),
            }}
            displayPlaceHolder
            autoCapitalize="words"
            autoCorrect={false}
            inputMode="text"
          />
        </FormProvider>
      </VStack>
      <Button title={tGlobal('next')} onPress={handleSubmit(onSubmit)} />
    </>
  )
}
