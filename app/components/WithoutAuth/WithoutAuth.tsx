import { Redirect } from 'expo-router'
import { FC } from 'react'

import { useAuthContext } from '@/contexts'

const WithoutAuthWrapper: FC<{ Component: FC }> = ({ Component }) => {
  const { session, user } = useAuthContext()

  if (session || user) return <Redirect href="/" />

  return <Component />
}

// Use the new wrapper component instead of the original function
export const WithoutAuth = (Component: FC) => () => (
  <WithoutAuthWrapper Component={Component} />
)
