import { Redirect } from 'expo-router'
import { FC } from 'react'

import { useAuthContext } from '@/contexts'

const WithoutAuthWrapper: FC<{ Component: FC }> = ({ Component }) => {
  const { me } = useAuthContext()

  if (me) return <Redirect href="/" />

  return <Component />
}

export const WithoutAuth = (Component: FC) => () => (
  <WithoutAuthWrapper Component={Component} />
)
