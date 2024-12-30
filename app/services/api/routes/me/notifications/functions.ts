import {
  NotificationsResponse,
  UnreadNotificationsCountResponse,
} from './entities'
import { ReadNotificationsParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/notifications'

export const getInfiniteNotificationsFn = async (pageParam: number) => {
  const { data } = await api.get<NotificationsResponse>(`${ENDPOINT}/`, {
    params: { page: pageParam },
  })

  return data
}

export const readNotificationsFn = async (params: ReadNotificationsParams) => {
  const { data } = await api.post<number>(`${ENDPOINT}/mark_as_read/`, {
    ...params,
  })
  return data
}

export const readAllNotificationsFn = async () => {
  const { data } = await api.post<void>(`${ENDPOINT}/read_all/`)
  return data
}

export const getUnreadNotificationsCount = async () => {
  const { data } = await api.get<UnreadNotificationsCountResponse>(
    `${ENDPOINT}/unread_count/`
  )
  return data
}
