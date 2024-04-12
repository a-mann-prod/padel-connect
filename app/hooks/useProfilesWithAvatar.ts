import { ProfileWithAvatar } from './useProfileWithAvatar'

import {
  GetProfilesParams,
  ProfilesResponse,
  useProfiles,
} from '@/services/api'
import { getStorageFn } from '@/services/api/image'
import { UseQueryProps } from '@/services/api/types'

export type ProfilesWithAvatar = ProfileWithAvatar[]

export type UseProfilesWithAvatar = {
  data?: ProfilesWithAvatar
  isLoading: boolean
}

export const useProfilesWithAvatar = (
  props: UseQueryProps<ProfilesResponse, GetProfilesParams>
): UseProfilesWithAvatar => {
  const { data, isLoading: isLoadingProfile } = useProfiles(props)

  return {
    data: data?.map((d) => {
      if (!d.avatar_url) return d

      const { data: avatar } = getStorageFn('avatars').getPublicUrl(
        d.avatar_url
      )

      return { ...d, avatar: avatar.publicUrl }
    }),
    isLoading: isLoadingProfile,
  }
}
