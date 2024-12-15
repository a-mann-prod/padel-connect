import { DeleteMatchTeamInvitationParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/matches'

export const deleteMatchTeamInvitationFn = async ({
  matchId,
  teamId,
  id,
  ...params
}: DeleteMatchTeamInvitationParams) => {
  const { data } = await api.delete<void>(
    `${ENDPOINT}/${matchId}/teams/${teamId}/invitations/${id}/`,
    {
      params: { ...params },
    }
  )

  return data
}
