import { MatchResponse } from '@/services/api'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { useFindMatchQueryKey } from '@/services/api/utills'

export const useUpdateMatchCache = () => {
  const queryCache = useQueryCache()
  const findMatchQK = useFindMatchQueryKey()

  return (matchId: number) => {
    queryCache.updateItem(['matches', matchId], {
      id: matchId,
      is_booked: true,
    })

    const match = queryCache.getItem<MatchResponse>(['matches', matchId])
    const querykey = match ? findMatchQK(match.datetime) : undefined

    if (querykey) {
      queryCache.updateItem(querykey, {
        id: matchId,
        is_booked: true,
      })
    }
  }
}
