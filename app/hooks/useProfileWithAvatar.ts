import { GetProfileParams, ProfileResponse, useProfile } from '@/services/api'
import { useImage } from '@/services/api/image'
import { UseQueryProps } from '@/services/api/types'

export type ProfileWithAvatar = Partial<ProfileResponse> & {
  avatar?: string
}

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

  return {
    data: { ...data, avatar },
    isLoading: isLoadingProfile || isLoadingAvatar,
  }
}
