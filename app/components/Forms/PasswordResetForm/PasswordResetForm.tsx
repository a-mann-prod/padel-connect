import { Text, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  PasswordResetFormValues,
  passwordResetFormServices,
} from './PasswordResetForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormInputControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = passwordResetFormServices

export const PasswordResetForm = () => {
  const t = useTranslate('auth', { keyPrefix: 'passwordResetForm' })
  const tGlobal = useTranslate()
  const toast = useToast()

  const onError = useHandleError()

  // TODO A REVOIR
  // const { mutate: updateUser, isPending } = useUpdateUser({
  //   onSuccess: () => {
  //     toast.show({ title: t('success') })
  //     router.navigate('/')
  //   },
  //   onError,
  // })

  const methods = useForm<PasswordResetFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = ({ password }: PasswordResetFormValues) => {
    // TODO A REVOIR
    // updateUser({ password })
    return
  }

  return (
    <VStack gap="$2">
      <Text>{t('subtitle')}</Text>
      <FormProvider {...methods}>
        <FormInputControlled
          name="password"
          formControlProps={{
            title: tGlobal('password'),
          }}
          displayPlaceHolder
          type="password"
        />
        <FormInputControlled
          name="confirmPassword"
          formControlProps={{
            title: tGlobal('confirmPassword'),
          }}
          displayPlaceHolder
          type="password"
        />
      </FormProvider>
      <Button
        title={tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        // TODO A REVOIR
        isLoading={false}
      />
    </VStack>
  )
}
