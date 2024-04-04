import { User } from '@supabase/supabase-js'
import { useMemo } from 'react'

import { useAuthContext } from '@/contexts'
import { ProfileResponse, useProfile } from '@/services/api'
import { useImage } from '@/services/api/image'

export type UseMe = {
  data?: Partial<ProfileResponse & Pick<User, 'id' | 'created_at'>> & {
    avatar?: string
  }
  isLoading: boolean
}

export const useMe = (): UseMe => {
  const { user, isLoadingSignIn } = useAuthContext()

  const { data: profile, isLoading: isLoadingProfile } = useProfile({
    params: { id: user?.id as string },
    options: { enabled: !!user?.id },
  })

  const { data: avatar, isLoading: isLoadingAvatar } = useImage({
    params: { path: profile?.avatar_url || '-1', storageType: 'avatars' },
    options: { enabled: !!profile?.avatar_url },
  })

  const data = useMemo(() => {
    if (!user) return

    return { id: user.id, created_at: user.created_at, ...profile, avatar }
  }, [profile, user, avatar])

  return {
    data,
    isLoading: isLoadingProfile || isLoadingSignIn || isLoadingAvatar,
  }
}
