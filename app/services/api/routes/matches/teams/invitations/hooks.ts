import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { MatchTeamRequestResponse } from '../detail'
import {
  createMatchTeamInvitationFn,
  deleteMatchTeamInvitationFn,
} from './functions'
import {
  CreateMatchTeamInvitationParams,
  DeleteMatchTeamInvitationParams,
} from './params'

import { useHandleError } from '@/hooks/useHandleError'
import { UseMutationProps } from '@/services/api/queryHooks'
import { MatchInvitationsResponse } from '../../..'

export const useDeleteMatchTeamInvitation = (
  { options }: UseMutationProps<void, DeleteMatchTeamInvitationParams> = {
    options: {},
  }
) => {
  const onError = useHandleError()
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      queryClient.setQueryData(
        ['matches', variables.matchId, 'teams', 'request'],
        (oldData: MatchTeamRequestResponse) => {
          const updatedInvitations = oldData.invitations.filter(
            (invitation) => invitation.id !== variables.id
          )

          return { ...oldData, invitations: updatedInvitations }
        }
      )
      queryClient.setQueryData(
        ['matches', variables.matchId, 'invitations', 'infinite'],
        (
          oldData: InfiniteData<MatchInvitationsResponse>
        ): InfiniteData<MatchInvitationsResponse> => {
          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.map((data) => {
              const filteredInvitations = data.team.invitations.filter(
                ({ id }) => id !== variables.id
              )
              return {
                ...data,
                team: {
                  ...data.team,
                  invitations: filteredInvitations,
                },
              }
            })
            return {
              ...page,
              results: updatedResults,
            }
          })

          return {
            ...oldData,
            pages: updatedPages,
          }
        }
      )
    },
    onError,
    mutationFn: deleteMatchTeamInvitationFn,
  })
}

export const useCreateMatchTeamInvitation = (
  {
    options,
  }: UseMutationProps<
    MatchTeamRequestResponse,
    CreateMatchTeamInvitationParams
  > = {
    options: {},
  }
) => {
  const onError = useHandleError()

  return useMutation({
    ...options,
    onError,
    mutationFn: createMatchTeamInvitationFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      // mettre à jour le match detail lié
    },
  })
}
