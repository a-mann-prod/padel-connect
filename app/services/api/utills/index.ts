import { InfiniteData, useQueryClient } from '@tanstack/react-query'

import { GetInfiniteMatchesParams, MatchesResponse } from '../routes'

import { date } from '@/services/date'

export const useFindMatchQueryKey = () => {
  const queryClient = useQueryClient()

  return (datetime: string) => {
    const matchDatetime = date.dayjs(datetime)

    const cache = queryClient
      .getQueriesData<
        InfiniteData<MatchesResponse, number>
      >({ queryKey: ['matches', 'infinite'] })
      .find(([queryKey]) => {
        const params = queryKey[2] as GetInfiniteMatchesParams

        return (
          date.dayjs(params.start_datetime).isBefore(matchDatetime) &&
          date.dayjs(params.end_datetime).isAfter(matchDatetime)
        )
      })

    return cache?.[0]
  }
}
