import { AuthSession, AuthUser } from '@supabase/supabase-js'
import { ReactNode, useEffect, useState } from 'react'

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
  signOut: () => void
  isLoadingSignOut: boolean
}

const [_, Provider, useAuthContext] =
  buildContext<AuthContextProps>('AuthContext')

export { useAuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)

  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)

  const signIn = async ({
    session,
    user,
  }: {
    session: AuthSession | null
    user: AuthUser | null
  }) => {
    setSession(session)
    setUser(user)
  }

  const signOut = async () => {
    setIsLoadingSignOut(true)
    const { error } = await supabase.auth.signOut()
    setSession(null)
    setUser(null)

    if (error) {
      console.error(error)
    }
    setIsLoadingSignOut(false)
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error(error)
      signOut()
    } else {
      setSession(data.session)
    }
  }

  const getUser = async () => {
    if (session) {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error(error)
        signOut()
      } else {
        setUser(data.user)
      }
    }
  }

  useEffect(() => {
    if (!session) getSession()
    if (session && !user) getUser()
  }, [session, user])

  return (
    <Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        isLoadingSignOut,
      }}
    >
      {children}
    </Provider>
  )
}
