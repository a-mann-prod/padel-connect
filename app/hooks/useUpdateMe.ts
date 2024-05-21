import { User } from '@supabase/supabase-js'

import { useAuthContext } from '@/contexts'
import {
  ProfileResponse,
  UpdateProfileParams,
  useUpdateProfile,
} from '@/services/api'
import { UseMutationProps } from '@/services/api/types'
import { useCallback } from 'react'

export type UseUpdateMe = {
  data: Partial<ProfileResponse & Pick<User, 'id' | 'created_at'>>
  isLoading: boolean
}

export const useUpdateMe = (
  options?: UseMutationProps<any, UpdateProfileParams, any>
) => {
  const { user } = useAuthContext()

  const { mutate: updateProfile, ...rest } = useUpdateProfile(options)

  const mutate = useCallback(
    (params: Omit<UpdateProfileParams, 'id'>) =>
      updateProfile({ id: user?.id, ...params }),
    [updateProfile, user?.id]
  )

  return {
    mutate,
    ...rest,
  }
}
