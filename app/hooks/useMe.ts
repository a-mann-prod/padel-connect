import { useMemo } from 'react'

import { useAuthContext } from '@/contexts'
import { MeProfileResponse, MeResponse, useMeProfile } from '@/services/api'

export type UseMeProps = {
  data?: MeResponse & MeProfileResponse
  isLoading: boolean
}

// TODO A MIGRER DANS LE AUTHCONTEXT EN MEME TEMPS QUE ME
export const useMe = (): UseMeProps => {
  const { me, isLoadingSignIn } = useAuthContext()

  const { data: profile, isPending: isPendingProfile } = useMeProfile({
    options: { enabled: !!me },
  })

  const data = useMemo(() => {
    if (!profile || !me) return

    return {
      ...me,
      ...profile,
    }
  }, [profile, me])

  return {
    data,
    isLoading: isPendingProfile || isLoadingSignIn,
  }
}
