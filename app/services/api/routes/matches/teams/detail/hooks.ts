import { useMutation, useQuery } from '@tanstack/react-query'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { useTranslate } from '@/services/i18n'

import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
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
  const t = useTranslate('match')
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      // auto add team to match
      // if (!data.invitations.length) {
      //   const cachedMatch = qc.getQueryData<MatchResponse>(['matches', variables.matchId])
      //   queryCache.updateItem(['matches', variables.matchId], {...cachedMatch, teams: [...cachedMatch?.teams, data]})

      //   //update match
      //   //update matches
      // }

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

      queryCache.removeItem(['matches', variables.matchId, 'teams', 'request'])

      onSuccess({ title: t('requestCanceled') })
    },
    onError,
    mutationFn: deleteMatchTeamFn,
  })
}
