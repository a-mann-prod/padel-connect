import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { useInfiniteQuery } from '../../queryHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '../../queryHooks/types'
import { NotificationResponse, NotificationsResponse } from './entities'
import {
  getAllNotificationsFn,
  getUnreadNotifications,
  setNotificationFn,
} from './functions'
import { GetNotificationsParams, UpdateNotificationsParams } from './params'

export const useNotifications = ({
  params,
  options,
}: UseQueryProps<NotificationsResponse, GetNotificationsParams>) =>
  useQuery<NotificationsResponse>(getAllNotificationsFn(params), options)

export const useInfiniteAllNotifications = ({
  params,
  options,
}: UseInfiniteQueryProps<NotificationResponse, GetNotificationsParams>) =>
  useInfiniteQuery<NotificationResponse>(getAllNotificationsFn(params), options)

export const useUpdateNotification = (
  options?: UseMutationProps<any, UpdateNotificationsParams, any>
) => useUpdateMutation(setNotificationFn(), ['id'], undefined, options)

export const useUnreadNotifications = ({
  params,
  options,
}: UseQueryProps<NotificationsResponse, GetNotificationsParams>) =>
  useQuery<NotificationsResponse>(getUnreadNotifications(params), options)
