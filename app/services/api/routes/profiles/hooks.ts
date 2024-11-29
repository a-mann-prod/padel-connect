import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { UseInfiniteQueryProps, UseQueryProps } from '../../queryHooks'
import { ProfileResponse, ProfilesResponse } from './entities'
import { getInfiniteProfilesFn, getProfileFn, getProfilesFn } from './functions'
import {
  GetInfiniteProfilesParams,
  GetProfileParams,
  GetProfilesParams,
} from './params'

export const useProfile = ({
  params,
  options,
}: UseQueryProps<ProfileResponse, GetProfileParams>) =>
  useQuery<ProfileResponse>({
    queryKey: ['profiles', params.id],
    queryFn: () => getProfileFn(params),
    ...options,
  })

export const useProfiles = ({
  params,
  options,
}: UseQueryProps<ProfilesResponse, GetProfilesParams>) =>
  useQuery<ProfilesResponse>({
    queryKey: ['profiles', params],
    queryFn: () => getProfilesFn(params),
    ...options,
  })

export const useInfiniteProfiles = (
  {
    params,
    options,
  }: UseInfiniteQueryProps<ProfilesResponse, GetInfiniteProfilesParams> = {
    params: {},
    options: {},
  }
) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['profiles', 'infinite', params],
    queryFn: ({ pageParam }) => getInfiniteProfilesFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
