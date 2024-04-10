import { User } from '@supabase/supabase-js'
import { useMemo } from 'react'

import { ProfileWithAvatar, useProfileWithAvatar } from './useProfileWithAvatar'

import { useAuthContext } from '@/contexts'

export type UseMe = {
  data?: ProfileWithAvatar & Partial<Pick<User, 'id' | 'created_at'>>
  isLoading: boolean
}

export const useMe = (): UseMe => {
  const { user, isLoadingSignIn } = useAuthContext()

  const { data: profile, isLoading: isLoadingProfile } = useProfileWithAvatar({
    params: { id: user?.id as string },
    options: { enabled: !!user?.id },
  })

  const data = useMemo(() => {
    if (!user) return

    return { id: user.id, created_at: user.created_at, ...profile }
  }, [profile, user])

  return {
    data,
    isLoading: isLoadingProfile || isLoadingSignIn,
  }
}
