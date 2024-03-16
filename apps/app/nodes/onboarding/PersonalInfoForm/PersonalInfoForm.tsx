import { FormInputControlled } from '@/components'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Fragment } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  PersonalInfoFormValues,
  personalInfoFormServices,
} from './PersonalInfoForm.services'

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
    <Fragment>
      <VStack space="md">
        <FormProvider {...methods}>
          <FormInputControlled
            name="first_name"
            formControlProps={{
              title: tGlobal('firstname'),
              isRequired: true,
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
              isRequired: true,
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
    </Fragment>
  )
}
