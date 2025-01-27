import { ReactNode, useEffect, useState } from 'react'

import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { LoginResponse, MeResponse, useMe } from '@/services/api'
import { useIsTokenExpired } from '@/services/api/axiosConfig'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { buildContext } from '@/services/buildContext'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  storage,
} from '@/services/storage'

type AuthContextProps = {
  me: MeResponse | undefined
  signIn: (data: LoginResponse) => Promise<void>
  signOut: () => Promise<void>
  isLoadingSignOut: boolean
  isLoadingSignIn: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, Provider, useAuthContext] =
  buildContext<AuthContextProps>('AuthContext')

export { useAuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const queryCache = useQueryCache()
  const invalidateQuery = useInvalidateQuery()
  const isTokenExpired = useIsTokenExpired()

  const [me, setMe] = useState<MeResponse>()

  const { data, isFetching, isRefetching, refetch } = useMe({
    options: { enabled: signedIn },
  })

  const keepSigned = async () => {
    const accessToken = await storage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = await storage.getItem(REFRESH_TOKEN_KEY)
    setSignedIn(!!accessToken && !!refreshToken)
  }
  keepSigned()

  const signIn = async ({ access, refresh }: LoginResponse) => {
    setIsLoadingSignIn(true)
    try {
      // set tokens
      await storage.setItem(ACCESS_TOKEN_KEY, access)
      await storage.setItem(REFRESH_TOKEN_KEY, refresh)
      setSignedIn(true)
      refetch()
      invalidateQuery(['me-profile'])
    } catch (error) {
      console.error('Error signing in:', error)
      setIsLoadingSignIn(false)
    }
  }

  const signOut = async () => {
    setIsLoadingSignOut(true)
    try {
      storage.removeItem(ACCESS_TOKEN_KEY)
      storage.removeItem(REFRESH_TOKEN_KEY)
      setMe(undefined)
      setSignedIn(false)
      queryCache.removeItem(['me'])
      queryCache.removeItem(['me-profile'])
      queryCache.removeItem(['match-filter'])
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoadingSignOut(false)
    }
  }

  useEffect(() => {
    if (!isFetching && !isRefetching && data) {
      setMe(data)
      setIsLoadingSignIn(false)
    }
  }, [data, isFetching, isRefetching])

  useEffect(() => {
    if (isTokenExpired) {
      console.log('laaa', isTokenExpired)
      signOut()
    }
  }, [isTokenExpired])

  return (
    <Provider
      value={{
        me,
        signIn,
        signOut,
        isLoadingSignOut,
        isLoadingSignIn,
      }}
    >
      {children}
    </Provider>
  )
}
