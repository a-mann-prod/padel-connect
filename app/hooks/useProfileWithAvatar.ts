import { pick } from 'remeda'

import { GetProfileParams, ProfileResponse, useProfile } from '@/services/api'
import { UseQueryProps } from '@/services/api/queryHooks/types'
import { useImage } from '@/services/api/routes/image'
import { getLevel } from '@/utils/level'

export type ProfileWithAvatar = Partial<
  ProfileResponse & {
    avatar: string
    level: number
  }
>

export type UseProfileWithAvatar = {
  data?: ProfileWithAvatar
  isLoading: boolean
}

export const useProfileWithAvatar = (
  props: UseQueryProps<ProfileResponse, GetProfileParams>
): UseProfileWithAvatar => {
  const { data, isLoading: isLoadingProfile } = useProfile(props)

  const { data: avatar, isLoading: isLoadingAvatar } = useImage({
    params: { path: data?.avatar_url || '-1', storageType: 'avatars' },
    options: { enabled: !!data?.avatar_url },
  })

  const level = data
    ? getLevel(pick(data, ['defense_level', 'offense_level', 'service_level']))
    : undefined

  return {
    data: { ...data, avatar, level },
    isLoading: isLoadingProfile || isLoadingAvatar,
  }
}
