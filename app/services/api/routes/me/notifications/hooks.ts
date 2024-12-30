import { useQueryCache } from '@/services/api/queryCacheHooks'
import {
  UseInfiniteQueryProps,
  UseMutationProps,
  UseQueryProps,
} from '@/services/api/queryHooks'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  NotificationsResponse,
  UnreadNotificationsCountResponse,
} from './entities'
import {
  getInfiniteNotificationsFn,
  getUnreadNotificationsCount,
  readAllNotificationsFn,
  readNotificationsFn,
} from './functions'
import { ReadNotificationsParams } from './params'

export const useInfiniteNotifications = ({
  options,
}: UseInfiniteQueryProps<NotificationsResponse> = {}) =>
  useInfiniteQuery({
    ...options,
    queryKey: ['notifications', 'infinite'],
    queryFn: ({ pageParam }) => getInfiniteNotificationsFn(pageParam),
    getNextPageParam: (lastPage) => lastPage.next_page,
    initialPageParam: 1,
  })

export const useReadNotifications = ({
  options,
}: UseMutationProps<number, ReadNotificationsParams> = {}) => {
  const querycache = useQueryCache()
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: readNotificationsFn,
    onSuccess: (data, variables, context) => {
      variables.ids.forEach((id) =>
        // voir pour opti
        querycache.updateItem(['notifications', 'infinite'], {
          id,
          is_read: true,
        })
      )
      queryClient.setQueryData(['notifications', 'count'], (oldData: number) =>
        oldData ? oldData - data : oldData
      )
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useReadAllNotifications = ({
  options,
}: UseMutationProps<void> = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: readAllNotificationsFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        ['notifications', 'infinite'],
        (oldData: InfiniteData<NotificationsResponse, number>) => {
          if (!oldData) return

          const updatedPages = oldData.pages.map((page) => {
            const updatedResults = page.results.map((notification) => ({
              ...notification,
              is_read: true,
            }))

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
      queryClient.setQueryData(
        ['notifications', 'count'],
        (oldData: number) => 0
      )
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useUnreadNotificationsCount = ({
  options,
}: UseQueryProps<UnreadNotificationsCountResponse> = {}) =>
  useQuery<UnreadNotificationsCountResponse>({
    queryKey: ['notifications', 'count'],
    queryFn: getUnreadNotificationsCount,
    ...options,
  })
