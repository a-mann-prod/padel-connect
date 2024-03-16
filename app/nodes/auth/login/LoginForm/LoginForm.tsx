import { FormInputControlled } from '@/components'
import { Button } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useLogin } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { LinkText, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { Fragment } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginFormValues, loginFormServices } from './LoginForm.services'

const { getDefaultValues, schema } = loginFormServices

export const LoginForm = () => {
  const t = useTranslate('auth')
  const tGlobal = useTranslate()
  const { redirectTo } = useLocalSearchParams()

  const onError = useHandleError()

  const { mutate: login, isPending } = useLogin({
    onSuccess: () =>
      router.replace((redirectTo ? `/${redirectTo}` : '/') as any),
    onError,
  })

  const methods = useForm<LoginFormValues>({
    defaultValues: getDefaultValues(),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (d: LoginFormValues) => login(d)

  return (
    <Fragment>
      <VStack space="md">
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
            type="password"
          />
        </FormProvider>
        <Link href="/(modals)/auth/password-reset-request" asChild>
          <LinkText alignSelf="flex-end">{t('forgotPassword')}</LinkText>
        </Link>
      </VStack>
      <Button
        title={t('login')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </Fragment>
  )
}