import { Center, Text, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { FC } from 'react'

import { useAuthContext } from '@/contexts'
import { Button, Divider } from '@/designSystem'
import { useLoginWithOAuth } from '@/services/api'
import { useTranslate } from '@/services/i18n'

// TODO: find props type name
const WithAuthWrapper: FC<{ Component: FC; segment: any }> = ({
  Component,
  segment,
}) => {
  const { session, user } = useAuthContext()

  if (session && user) return <Component />

  return <LoginMenu redirectTo={segment} />
}

export const WithAuth =
  (Component: FC) =>
  ({ segment }: any) => (
    <WithAuthWrapper Component={Component} segment={segment} />
  )

type LoginMenuProps = {
  redirectTo?: string
}

const LoginMenu = ({ redirectTo }: LoginMenuProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('auth')

  const { mutate: loginWithOAuth, isPending: isPendingOAuth } =
    useLoginWithOAuth()

  const params = redirectTo ? { redirectTo } : undefined

  return (
    <Center alignItems="stretch" flex={1}>
      <VStack gap="$3" m="$5">
        <Text>{t('loginNeeded')}</Text>
        <Link href={{ pathname: '/(modals)/auth/login', params }} asChild>
          <Button title={t('login')} />
        </Link>
        <Button
          title={t('appleLogin')}
          icon="apple"
          variant="outline"
          onPress={() => loginWithOAuth('apple')}
          isLoading={isPendingOAuth}
          isDisabled
        />
        <Button
          title={t('googleLogin')}
          icon="google"
          variant="outline"
          onPress={() => loginWithOAuth('google')}
          isLoading={isPendingOAuth}
          isDisabled
        />
        <Divider title={tGlobal('or')} />
        <Link href={{ pathname: '/(modals)/auth/register', params }} asChild>
          <Button title={t('register')} variant="outline" />
        </Link>
      </VStack>
    </Center>
  )
}
