import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { UseMutationProps, UseQueryProps } from '../types'
import { ProfileResponse, queryCols } from './entities'
import { getProfileFn, setProfileFn } from './functions'
import { GetProfileParams, SetProfileParams } from './params'

export const useProfile = ({
  params,
  options,
}: UseQueryProps<ProfileResponse, GetProfileParams> = {}) =>
  useQuery<ProfileResponse>(getProfileFn(params), options)

export const useUpdateProfile = (
  options?: UseMutationProps<any, SetProfileParams, any>
) => useUpdateMutation(setProfileFn(), ['id'], queryCols, options)
