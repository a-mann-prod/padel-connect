import { User } from '@supabase/supabase-js'
import { useMemo } from 'react'
import { pick } from 'remeda'

import { ProfileWithAvatar, useProfileWithAvatar } from './useProfileWithAvatar'

import { useAuthContext } from '@/contexts'
import { getLevel } from '@/utils/level'

export type UseMeProps = {
  data?: ProfileWithAvatar &
    Partial<Pick<User, 'id' | 'created_at'>> & { level?: number }
  isLoading: boolean
}

export const useMe = (): UseMeProps => {
  const { user, isLoadingSignIn } = useAuthContext()

  const { data: profile, isLoading: isLoadingProfile } = useProfileWithAvatar({
    params: { id: user?.id as string },
    options: { enabled: !!user?.id },
  })

  const data = useMemo(() => {
    if (!user || !profile) return

    const level = getLevel(
      pick(profile, ['offense_level', 'defense_level', 'service_level'])
    )

    return {
      id: user.id,
      created_at: user.created_at,
      level,
      ...profile,
    }
  }, [profile, user])

  return {
    data,
    isLoading: isLoadingProfile || isLoadingSignIn,
  }
}
