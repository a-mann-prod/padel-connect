import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { useTranslate } from '@/services/i18n'

import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '@/services/api/queryHooks'
import { MatchTeamRequestResponse, MatchTeamsResponse } from './entities'
import {
  createMatchTeamFn,
  deleteMatchTeamFn,
  getInfiniteMatchTeamsFn,
  getMatchTeamRequestFn,
  manageMatchTeamFn,
} from './functions'
import {
  CreateMatchTeamParams,
  DeleteMatchTeamParams,
  GetInfiniteMatchTeamsParams,
  GetMatchTeamRequestParams,
  ManageMatchTeamParams,
} from './params'

export const useInfiniteMatchTeams = ({
  params,
  options,
}: UseInfiniteQueryProps<MatchTeamsResponse, GetInfiniteMatchTeamsParams>) => {
  const { id } = params

  return useInfiniteQuery({
    ...options,
    queryKey: ['matches', id, 'teams'],
    queryFn: ({ pageParam }) => getInfiniteMatchTeamsFn(params, pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })
}

export const useMatchTeamRequest = ({
  params,
  options,
}: UseQueryProps<MatchTeamRequestResponse, GetMatchTeamRequestParams>) => {
  const { id } = params

  return useQuery({
    ...options,
    queryKey: ['matches', id, 'teams', 'request'],
    queryFn: () => getMatchTeamRequestFn(params),
  })
}

export const useCreateMatchTeam = ({
  options,
}: UseMutationProps<MatchTeamRequestResponse, CreateMatchTeamParams> = {}) => {
  const t = useTranslate('match')
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.updateItem(
        ['matches', variables.matchId, 'teams', 'request'],
        data
      )
      onSuccess({ title: t('requestCreated') })
    },
    onError,
    mutationFn: createMatchTeamFn,
  })
}

export const useDeleteMatchTeam = ({
  options,
}: UseMutationProps<void, DeleteMatchTeamParams> = {}) => {
  const t = useTranslate('match')
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.removeItem(['matches', variables.matchId, 'teams'])
      onSuccess({ title: t('requestCanceled') })
    },
    onError,
    mutationFn: deleteMatchTeamFn,
  })
}

export const useManageMatchTeam = (
  { options }: UseMutationProps<void, ManageMatchTeamParams> = {
    options: {},
  }
) => {
  const t = useTranslate()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryCache.removeItem(
        ['matches', variables.matchId, 'teams'],
        variables.id
      )
      onSuccess({
        title: t(
          variables.action === 'accept' ? 'requestAccepted' : 'requestRefused'
        ),
      })
    },
    onError,
    mutationFn: manageMatchTeamFn,
  })
}
