import { useAuthContext } from '@/contexts'
import { Redirect } from 'expo-router'
import { FC } from 'react'

export const WithoutAuth = (Component: FC) => () => {
  const { session, user } = useAuthContext()

  if (session || user) return <Redirect href="/" />

  return <Component />
}
