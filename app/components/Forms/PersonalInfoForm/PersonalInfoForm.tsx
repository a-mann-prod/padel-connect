import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  PersonalInfoFormValues,
  personalInfoFormServices,
  useManualPreferenceOptions,
  useSidePreferenceOptions,
} from './PersonalInfoForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import {
  FormChoiceButtonControlled,
  FormInputControlled,
} from '@/components/FormsControlled'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Nillable } from '@/types/nillable'

const { getDefaultValues, schema } = personalInfoFormServices

export type PersonalInfoFormProps = {
  onSubmit: (values: PersonalInfoFormValues) => void
  defaultValues?: Nillable<PersonalInfoFormValues>
  isLoading?: boolean
  buttonTitle?: string
}

export const PersonalInfoForm = ({
  onSubmit,
  defaultValues,
  isLoading,
  buttonTitle,
}: PersonalInfoFormProps) => {
  const tGlobal = useTranslate()

  const defaultValuesMemo = useMemo(
    () => getDefaultValues(defaultValues),
    [defaultValues]
  )

  const methods = useForm<PersonalInfoFormValues>({
    defaultValues: defaultValuesMemo,
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

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
        </FormProvider>
      </VStack>
      <Button
        title={buttonTitle || tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </>
  )
}
