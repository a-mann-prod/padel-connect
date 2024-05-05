import { AuthSession, AuthUser } from '@supabase/supabase-js'
import { router } from 'expo-router'
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { buildContext } from '@/services/buildContext'
import { supabase } from '@/services/supabase'

type AuthContextProps = {
  session: AuthSession | null
  user: AuthUser | null
  signIn: ({
    session,
    user,
  }: {
    session: AuthSession | null
    user: AuthUser | null
  }) => void
  signOut: (isDeleted?: boolean) => void
  isLoadingSignOut: boolean
  isLoadingSignIn: boolean
}

const [_, Provider, useAuthContext] =
  buildContext<AuthContextProps>('AuthContext')

export { useAuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [signedOut, setSignedOut] = useState(false)

  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)

  const signIn = async ({
    session,
    user,
  }: {
    session: AuthSession | null
    user: AuthUser | null
  }) => {
    setSession(session)
    setUser(user)
    setSignedOut(false)
  }

  const signOut = async (isDeleted = false) => {
    setIsLoadingSignOut(true)
    let error
    if (!isDeleted) {
      error = (await supabase.auth.signOut()).error
    }
    setSession(null)
    setUser(null)
    setSignedOut(true)

    if (error) {
      console.error(error)
    }
    setIsLoadingSignOut(false)
    router.replace('/')
  }

  const getSession = useCallback(async () => {
    setIsLoadingSignIn(true)
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error(error)
      signOut()
    } else {
      setSession(data.session)
    }
    setIsLoadingSignIn(false)
  }, [])

  const getUser = useCallback(async () => {
    setIsLoadingSignIn(true)

    if (session) {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error(error)
        signOut()
      } else {
        setUser(data.user)
      }
    }
    setIsLoadingSignIn(false)
  }, [session])

  useEffect(() => {
    // wait for sign out
    if (isLoadingSignOut || signedOut) return

    if (!session) getSession()
    if (session && !user) getUser()
  }, [getSession, getUser, session, user, signedOut, isLoadingSignOut])

  return (
    <Provider
      value={{
        session,
        user,
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
