import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  PasswordChangeFormValues,
  passwordChangeFormServices,
} from './PasswordChangeForm.services'

import { FormInputControlled, FormProvider } from '@/components'
import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useUpdatePassword } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = passwordChangeFormServices

export const PasswordChangeForm = () => {
  const tGlobal = useTranslate()

  const methods = useForm<PasswordChangeFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { mutate: updateUser, isPending } = useUpdatePassword({
    onSuccess: () => {
      onSuccess()
      reset()
    },
    onError,
  })

  const onSubmit = ({ password }: PasswordChangeFormValues) =>
    updateUser({ password })

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="password"
            formControlProps={{
              title: tGlobal('newPassword'),
            }}
            displayPlaceHolder
            type="password"
          />
          <FormInputControlled
            name="confirmPassword"
            formControlProps={{
              title: tGlobal('confirmNewPassword'),
            }}
            displayPlaceHolder
            type="password"
          />
        </FormProvider>
      </VStack>
      <Button
        title={tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  )
}
