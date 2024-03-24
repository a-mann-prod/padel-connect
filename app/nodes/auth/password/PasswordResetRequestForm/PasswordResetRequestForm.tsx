import { Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  PasswordResetRequestFormValues,
  passwordResetRequestFormServices,
} from './passwordResetRequestForm.services'

import { FormInputControlled } from '@/components'
import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { useResetPassword } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = passwordResetRequestFormServices

export const PasswordResetRequestForm = () => {
  const t = useTranslate('auth')
  const tGlobal = useTranslate()
  const toast = useToast()

  const onError = useHandleError()
  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
  } = useResetPassword({
    onError,
  })

  const methods = useForm<PasswordResetRequestFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (d: PasswordResetRequestFormValues) => resetPassword(d)

  useEffect(() => {
    if (isSuccess) {
      toast.show({ title: t('emailSent'), action: 'info' })
      router.back()
    }
  }, [isSuccess])

  return (
    <>
      <VStack gap="$2">
        <Text>{t('passwordResetRequest.subtitle')}</Text>
        <FormProvider {...methods}>
          <FormInputControlled
            name="email"
            formControlProps={{
              title: tGlobal('email'),
            }}
            displayPlaceHolder
            autoCapitalize="none"
            autoCorrect={false}
            inputMode="email"
          />
        </FormProvider>
      </VStack>
      <Button
        title={tGlobal('send')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  )
}
