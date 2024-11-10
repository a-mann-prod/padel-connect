import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { LoginFormValues, loginFormServices } from './LoginForm.services'

import { FormInputControlled, FormProvider } from '@/components'
import { Button } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useLogin } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

const { getDefaultValues, schema } = loginFormServices

export const LoginForm = () => {
  const t = useTranslate('auth')
  const tGlobal = useTranslate()
  // const { redirectTo } = useLocalSearchParams()

  const onError = useHandleError()

  const { mutate: login, isPending } = useLogin({
    options: {
      onSuccess: () => {
        router.canGoBack() && router.back() // need to go back one time because of navigation to login
        // router.dismissAll()
        // router.replace((redirectTo ? `/${redirectTo}` : '/') as any)
      },
      onError,
    },
  })

  const methods = useForm<LoginFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (d: LoginFormValues) => login(d)

  return (
    <>
      <VStack gap="$2">
        <FormProvider {...methods}>
          <FormInputControlled
            name="email"
            formControlProps={{ title: tGlobal('email') }}
            displayPlaceHolder
            autoCapitalize="none"
            autoCorrect={false}
            inputMode="email"
          />
          <FormInputControlled
            name="password"
            formControlProps={{ title: tGlobal('password') }}
            displayPlaceHolder
            secureTextEntry
          />
        </FormProvider>
        <Link href={routing.authPasswordResetRequest.path()} asChild>
          <Button
            alignSelf="flex-end"
            title={t('forgotPassword')}
            variant="link"
          />
        </Link>
      </VStack>
      <Button
        title={t('login')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </>
  )
}
