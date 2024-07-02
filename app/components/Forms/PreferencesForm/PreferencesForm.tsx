import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  PreferencesFormValues,
  preferencesFormServices,
  useManualPreferenceOptions,
  useSidePreferenceOptions,
} from './PreferencesForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormChoiceButtonControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types'

const { getDefaultValues, schema } = preferencesFormServices

export type PreferencesFormProps = {
  defaultValues?: Nillable<PreferencesFormValues>
  onSubmit: (values: PreferencesFormValues) => void
  isLoading?: boolean
  buttonTitle?: string
}

export const PreferencesForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: PreferencesFormProps) => {
  const tGlobal = useTranslate()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<PreferencesFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

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
            formControlProps={{ title: tGlobal('sidePreference.title') }}
            options={useSidePreferenceOptions()}
          />
        </VStack>
      </FormProvider>
      <Button
        title={buttonTitle || tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </>
  )
}
