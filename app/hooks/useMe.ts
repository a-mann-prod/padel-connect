import { User } from '@supabase/supabase-js'
import { useMemo } from 'react'

import { useAuthContext } from '@/contexts'
import { ProfileResponse, useProfile } from '@/services/api'

export type UseMe = {
  data: Partial<ProfileResponse & Pick<User, 'id' | 'created_at'>>
  isLoading: boolean
}

export const useMe = (): UseMe => {
  const { user, isLoadingSignIn } = useAuthContext()

  const { data: profile, isLoading: isLoadingProfile } = useProfile({
    params: { id: user?.id as string },
    options: { enabled: !!user?.id },
  })

  const data = useMemo(
    () => ({ id: user?.id, created_at: user?.created_at, ...profile }),
    [profile, user]
  )

  return {
    data,
    isLoading: isLoadingProfile || isLoadingSignIn,
  }
}
