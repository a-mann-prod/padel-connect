import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'

import { useInfiniteQuery } from '../queryHooks/useInfiniteQuery'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '../types'
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

// export const useInsertMatchRequests = (
//   options?: UseMutationProps<
//     any,
//     InsertMatchRequestParams | InsertMatchRequestParams[],
//     any
//   >
// ) =>
//   useInsertMutation(
//     setMatchRequestFn(),
//     ['match_id', 'user_id'],
//     undefined,
//     options
//   )

// export const useUpdateMatchRequest = (
//   options?: UseMutationProps<any, UpdateMatchRequestParams, any>
// ) =>
//   useUpdateMutation(setMatchRequestFn(), ['match_id', 'user_id'], undefined, {
//     ...options,
//     // TODO : better to upsert in /matches (listing)
//     revalidateRelations: [
//       {
//         fKeyColumn: 'match_id',
//         relation: 'matches',
//         relationIdColumn: 'id',
//         schema: 'public',
//       },
//     ],
//   })

// export const useDeleteMatchRequest = (
//   options?: UseMutationProps<any, DeleteMatchRequestParams, any>
// ) =>
//   useDeleteMutation(setMatchRequestFn(), ['match_id', 'user_id'], undefined, {
//     ...options,
//     // TODO : better to upsert in /matches (listing)
//     revalidateRelations: [
//       {
//         fKeyColumn: 'match_id',
//         relation: 'matches',
//         relationIdColumn: 'id',
//         schema: 'public',
//       },
//     ],
//   })
