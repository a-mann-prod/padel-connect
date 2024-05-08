import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { PostgrestResponse } from '@supabase/supabase-js'
import { UseQueryOptions } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
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
  const [data, setData] = useState<T[]>()

  const limit = useMemo(() => config?.limit || 20, [config?.limit])
  const [page, setPage] = useState(0)

  const { data: nextData, isLoading } = useQuery<T>(
    (query as any).range(page * limit, page * limit + limit - 1),
    config
  )

  useEffect(() => {
    if (!isLoading && nextData) {
      setData((data) => uniqBy([...nextData, ...(data || [])], prop('id')))
    }
  }, [isLoading, nextData])

  const fetchNext = () => {
    if (!nextData?.length) return
    setPage((p) => p + 1)
  }

  return {
    data,
    isLoading,
    fetchNext,
    isLoadingNext: !!data?.length && isLoading,
    nextData,
  }
}
