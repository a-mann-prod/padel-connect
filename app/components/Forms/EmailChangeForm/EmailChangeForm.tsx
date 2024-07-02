import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  EmailChangeFormValues,
  emailChangeFormServices,
} from './EmailChangeForm.services'

import { FormInputControlled, FormProvider } from '@/components'
import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useUpdateEmail } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = emailChangeFormServices

export const EmailChangeForm = () => {
  const t = useTranslate('settings')
  const tGlobal = useTranslate()

  const methods = useForm<EmailChangeFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { mutate: updateEmail, isPending } = useUpdateEmail({
    onSuccess: () => {
      onSuccess({ title: t('emailSent') })
      reset()
    },
    onError,
  })

  const onSubmit = ({ email }: EmailChangeFormValues) => updateEmail({ email })

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="email"
            formControlProps={{
              title: tGlobal('newEmail'),
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            displayPlaceHolder
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
