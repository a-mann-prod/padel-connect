import { ProfileWithAvatar } from './useProfileWithAvatar'

import {
  GetProfilesParams,
  ProfilesResponse,
  useProfiles,
} from '@/services/api'
import { UseQueryProps } from '@/services/api/types'
import { getPublicAvatarUrl } from '@/utils/avatar'

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

      return { ...d, avatar: getPublicAvatarUrl(d.avatar_url) }
    }),
    isLoading: isLoadingProfile,
  }
}
