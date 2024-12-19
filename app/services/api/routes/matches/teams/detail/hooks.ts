import { useMutation, useQuery } from '@tanstack/react-query'

import { useHandleError } from '@/hooks/useHandleError'
import { useQueryCache } from '@/services/api/queryCacheHooks'

import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useFindMatchQueryKey } from '@/services/api/utills'
import { MatchResponse } from '../../detail'
import { MatchTeamRequestResponse } from './entities'
import {
  createMatchTeamFn,
  deleteMatchTeamFn,
  getMatchTeamRequestFn,
} from './functions'
import {
  CreateMatchTeamParams,
  DeleteMatchTeamParams,
  GetMatchTeamRequestParams,
} from './params'

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
  const onError = useHandleError()
  const queryCache = useQueryCache()
  const invalidateQuery = useInvalidateQuery()
  const findMatchQK = useFindMatchQueryKey()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      queryCache.updateItem(
        ['matches', variables.matchId, 'teams', 'request'],
        data
      )

      // update current match
      invalidateQuery(['matches', variables.matchId])

      // update match listing
      const match = queryCache.getItem<MatchResponse>([
        'matches',
        variables.matchId,
      ])

      if (match) {
        const matchQueryKey = findMatchQK(match.datetime)
        matchQueryKey && invalidateQuery(matchQueryKey)
      }
    },
    onError,
    mutationFn: createMatchTeamFn,
  })
}

export const useDeleteMatchTeam = ({
  options,
}: UseMutationProps<void, DeleteMatchTeamParams> = {}) => {
  const onError = useHandleError()
  const queryCache = useQueryCache()
  const invalidateQuery = useInvalidateQuery()
  const findMatchQK = useFindMatchQueryKey()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      // update matchRequest
      invalidateQuery(['matches', variables.matchId, 'teams', 'request'])

      // update current match
      invalidateQuery(['matches', variables.matchId])

      // update match listing
      const match = queryCache.getItem<MatchResponse>([
        'matches',
        variables.matchId,
      ])

      if (match) {
        const matchQueryKey = findMatchQK(match.datetime)
        matchQueryKey && invalidateQuery(matchQueryKey)
      }
    },
    onError,
    mutationFn: deleteMatchTeamFn,
  })
}
