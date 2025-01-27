import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import {
  RegisterFormValues,
  registerFormServices,
} from './registerForm.services'

import { FormProvider } from '@/components/FormProvider/FormProvider'
import { FormInputControlled } from '@/components/FormsControlled'
import { Button } from '@/designSystem/'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { useRegister } from '@/services/api'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = registerFormServices

export const RegisterForm = () => {
  const t = useTranslate('auth')
  const tGlobal = useTranslate()
  const toast = useToast()
  // const { redirectTo } = useLocalSearchParams()
  const onError = useHandleError()

  const { mutate: register, isPending } = useRegister({
    options: {
      onSuccess: ({ email }) => {
        if (email) {
          toast.show({ title: t('emailSent'), action: 'info' })
          router.back()
        }
      },
      onError,
    },
  })

  const methods = useForm<RegisterFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (d: RegisterFormValues) => register(d)

  return (
    <>
      <VStack gap="$2">
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
      </VStack>
      <Button
        title={t('register')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  )
}
