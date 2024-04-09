import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import {
  PreferencesFormValues,
  preferencesFormServices,
  useManualPreferenceOptions,
  useSidePreferenceOptions,
} from './PreferencesForm.services'

import { FormChoiceButtonControlled, FormProvider } from '@/components'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = preferencesFormServices

export const PreferencesForm = () => {
  const tGlobal = useTranslate()
  const { preferences, setPreferences } = useOnboardingContext()

  const methods = useForm<PreferencesFormValues>({
    defaultValues: getDefaultValues(preferences),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (preferences: PreferencesFormValues) => {
    setPreferences(preferences)
    router.navigate('/(modals)/onboarding/get-started')
  }

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$5">
          <FormChoiceButtonControlled
            name="manual_preference"
            single
            formControlProps={{ title: tGlobal('manualPreference.title') }}
            options={useManualPreferenceOptions()}
          />

          <FormChoiceButtonControlled
            name="side_preference"
            single
            formControlProps={{ title: tGlobal('preferredSide.title') }}
            options={useSidePreferenceOptions()}
          />
        </VStack>
      </FormProvider>
      <Button title={tGlobal('next')} onPress={handleSubmit(onSubmit)} />
    </>
  )
}
