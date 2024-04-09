import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { UseMutationProps, UseQueryProps } from '../types'
import {
  ProfileResponse,
  ProfilesResponse,
  profilesQueryCols,
} from './entities'
import { getProfileFn, getProfilesFn, setProfileFn } from './functions'
import {
  GetProfileParams,
  GetProfilesParams,
  UpdateProfileParams,
} from './params'

export const useProfile = ({
  params,
  options,
}: UseQueryProps<ProfileResponse, GetProfileParams>) =>
  useQuery<ProfileResponse>(getProfileFn(params), options)

export const useProfiles = ({
  params,
  options,
}: UseQueryProps<ProfilesResponse, GetProfilesParams>) =>
  useQuery<ProfileResponse>(getProfilesFn(params), options)

export const useUpdateProfile = (
  options?: UseMutationProps<any, UpdateProfileParams, any>
) => useUpdateMutation(setProfileFn(), ['id'], profilesQueryCols, options)
