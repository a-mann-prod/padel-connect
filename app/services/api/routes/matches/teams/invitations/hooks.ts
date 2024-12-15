import { useMutation, useQueryClient } from '@tanstack/react-query'

import { MatchTeamRequestResponse } from '../detail'
import { deleteMatchTeamInvitationFn } from './functions'
import { DeleteMatchTeamInvitationParams } from './params'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { UseMutationProps } from '@/services/api/queryHooks'
import { useTranslate } from '@/services/i18n'

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
