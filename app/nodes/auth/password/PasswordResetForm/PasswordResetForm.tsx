import { FormInputControlled } from '@/components'

import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { useUpdateUser } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import {
  PasswordResetFormValues,
  passwordResetFormServices,
} from './passwordResetForm.services'

const { getDefaultValues, schema } = passwordResetFormServices

export const PasswordResetForm = () => {
  const t = useTranslate('auth', { keyPrefix: 'passwordResetForm' })
  const tGlobal = useTranslate()
  const toast = useToast()

  const onError = useHandleError()

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => {
      toast.show({ title: t('success') })
      router.navigate('/')
    },
    onError,
  })

  const methods = useForm<PasswordResetFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = ({ password }: PasswordResetFormValues) =>
    updateUser({ password })

  return (
    <VStack space="md">
      <Text>{t('subtitle')}</Text>
      <FormProvider {...methods}>
        <FormInputControlled
          name="password"
          formControlProps={{
            title: tGlobal('password'),
            isRequired: true,
          }}
          displayPlaceHolder
          type="password"
        />
        <FormInputControlled
          name="confirmPassword"
          formControlProps={{
            title: tGlobal('confirmPassword'),
            isRequired: true,
          }}
          displayPlaceHolder
          type="password"
        />
      </FormProvider>
      <Button
        title={tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </VStack>
  )
}