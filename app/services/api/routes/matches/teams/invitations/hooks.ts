import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  deleteMatchTeamInvitationFn,
  manageMatchTeamInvitationFn,
} from './functions'
import {
  DeleteMatchTeamInvitationParams,
  ManageMatchTeamInvitationParams,
} from './params'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { UseMutationProps } from '@/services/api/queryHooks'
import { useTranslate } from '@/services/i18n'
import { MatchTeamRequestResponse } from '../detail'

export const useManageMatchTeamInvitation = (
  { options }: UseMutationProps<void, ManageMatchTeamInvitationParams> = {
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
    mutationFn: manageMatchTeamInvitationFn,
  })
}

export const useDeleteMatchTeamInvitation = (
  { options }: UseMutationProps<void, DeleteMatchTeamInvitationParams> = {
    options: {},
  }
) => {
  const t = useTranslate('match')
  const onSuccess = useHandleSuccess()
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
      onSuccess({
        title: t('requestDeleted'),
      })
    },
    onError,
    mutationFn: deleteMatchTeamInvitationFn,
  })
}
