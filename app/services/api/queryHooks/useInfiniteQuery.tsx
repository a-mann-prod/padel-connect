import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { PostgrestResponse } from '@supabase/supabase-js'
import { UseQueryOptions } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { prop, uniqBy } from 'remeda'

export type InfiniteQueryOptions<TResponse, TError> = Omit<
  UseQueryOptions<PostgrestResponse<TResponse>, TError>,
  'queryKey' | 'queryFn'
> & { limit?: number }

export const useInfiniteQuery = <T extends { id: number | string }>(
  query: PromiseLike<PostgrestResponse<T>>,
  config?: Omit<
    UseQueryOptions<PostgrestResponse<T>, any>,
    'queryKey' | 'queryFn'
  > & { limit?: number }
) => {
  const isCacheUpdating = useRef(true)
  const [data, setData] = useState<T[]>()

  const limit = useMemo(() => config?.limit || 20, [config?.limit])
  const [page, setPage] = useState(0)

  const {
    data: nextData,
    isLoading,
    status,
  } = useQuery<T>(
    (query as any).range(page * limit, page * limit + limit - 1),
    config
  )

  useEffect(() => {
    if (status === 'pending') isCacheUpdating.current = false
  }, [status])

  useEffect(() => {
    // pas opti, car est appelé quand un message est rajouté.
    // Si la liste de message est longue, c'est long avant d'insérer le message
    if (!isLoading && nextData) {
      if (isCacheUpdating.current) {
        setData((data) => uniqBy([...nextData, ...(data || [])], prop('id')))
      } else {
        setData((data) => uniqBy([...(data || []), ...nextData], prop('id')))
        isCacheUpdating.current = true
      }
    }
  }, [isLoading, nextData, isCacheUpdating])

  const fetchNext = () => {
    if (!nextData?.length) return
    setPage((p) => p + 1)
  }

  return {
    data,
    isLoading: !data?.length && isLoading,
    fetchNext,
    isLoadingNext: !!data?.length && isLoading,
    nextData,
  }
}
