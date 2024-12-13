import { NotificationsResponse } from './entities'
import { AnwserInvitationParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/invitations'

export const getInfiniteInvitationsFn = async (pageParam: number) => {
  const { data } = await api.get<NotificationsResponse>(`${ENDPOINT}/`, {
    params: { page: pageParam },
  })

  return data
}

export const answerInvitationFn = async (params: AnwserInvitationParams) => {
  const { data } = await api.post<void>(
    `${ENDPOINT}/${params.id}/mark_as_read/${params.action}/`
  )
  return data
}
