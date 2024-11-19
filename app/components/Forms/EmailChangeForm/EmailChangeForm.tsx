import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  EmailChangeFormValues,
  emailChangeFormServices,
} from './EmailChangeForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormInputControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem/'
import { useUpdateMeEmail } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = emailChangeFormServices

export const EmailChangeForm = () => {
  const tGlobal = useTranslate()

  const methods = useForm<EmailChangeFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit, reset } = methods

  const { mutate: updateEmail, isPending } = useUpdateMeEmail({
    options: {
      onSuccess: () => {
        reset()
      },
    },
  })

  const onSubmit = (data: EmailChangeFormValues) => updateEmail(data)

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="new_email"
            formControlProps={{
              title: tGlobal('newEmail'),
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            displayPlaceHolder
          />
          <FormInputControlled
            name="re_new_email"
            formControlProps={{
              title: tGlobal('confirmNewEmail'),
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            displayPlaceHolder
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
