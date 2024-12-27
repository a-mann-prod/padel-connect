import { Center, Text, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'
import { FC } from 'react'

import { useAuthContext } from '@/contexts'
import { Button, Divider } from '@/designSystem'
import { useGoogleSignin } from '@/hooks/useGoogleSignin'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

// TODO: find props type name
const WithAuthWrapper: FC<{ Component: FC; segment: any }> = ({
  Component,
  segment,
}) => {
  const { me } = useAuthContext()

  if (me) return <Component />

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
  const googleSignin = useGoogleSignin()

  const params = redirectTo ? { redirectTo } : undefined

  return (
    <Center alignItems="stretch" flex={1}>
      <VStack gap="$3" m="$5">
        <Text>{t('loginNeeded')}</Text>
        <Link
          href={{ pathname: routing.authLogin.path() as any, params }}
          asChild
        >
          <Button title={t('login')} />
        </Link>
        {/* <Button
          title={t('appleLogin')}
          icon="FAS-apple"
          variant="outline"
          onPress={() => console.log('apple')}
          isLoading={false}
          isDisabled
        /> */}
        <Button
          title={t('googleLogin')}
          icon="FAS-google"
          variant="outline"
          onPress={() => googleSignin()}
          isDisabled
        />
        <Divider title={tGlobal('or')} />
        <Link
          href={{ pathname: routing.authRegister.path() as any, params }}
          asChild
        >
          <Button title={t('register')} variant="outline" isDisabled />
        </Link>
      </VStack>
    </Center>
  )
}
