import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  SettingsPersonalInfoFormValues,
  settingsPersonalInfoFormServices,
} from './SettingsPersonalInfoForm.services'

import { FormInputControlled, FormProvider } from '@/components'
import { Button } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import { useUpdateMe } from '@/hooks/useUpdateMe'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = settingsPersonalInfoFormServices

export const SettingsPersonalInfoForm = () => {
  const tGlobal = useTranslate()

  const { data } = useMe()

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const defaultValues = useMemo(() => getDefaultValues(data), [data])

  const methods = useForm<SettingsPersonalInfoFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { mutate: updateMe, isPending } = useUpdateMe({
    onSuccess,
    onError,
  })

  const onSubmit = (d: SettingsPersonalInfoFormValues) => {
    updateMe(d)
  }

  return (
    <>
      <FormProvider {...methods}>
        <VStack gap="$2">
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
        </VStack>
      </FormProvider>
      <Button
        title={tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  )
}
