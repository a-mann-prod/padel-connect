import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  PasswordChangeFormValues,
  passwordChangeFormServices,
} from './PasswordChangeForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormInputControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem/'
import { useUpdateMePassword } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = passwordChangeFormServices

export const PasswordChangeForm = () => {
  const tGlobal = useTranslate()

  const methods = useForm<PasswordChangeFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  const { mutate: updateUser, isPending } = useUpdateMePassword({
    options: {
      onSuccess: () => {
        reset()
      },
    },
  })

  const onSubmit = (variables: PasswordChangeFormValues) =>
    updateUser(variables)

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="new_password"
            formControlProps={{
              title: tGlobal('newPassword'),
            }}
            displayPlaceHolder
            type="password"
          />
          <FormInputControlled
            name="re_new_password"
            formControlProps={{
              title: tGlobal('confirmNewPassword'),
            }}
            displayPlaceHolder
            type="password"
          />
          <FormInputControlled
            name="current_password"
            formControlProps={{
              title: tGlobal('currentPassword'),
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
