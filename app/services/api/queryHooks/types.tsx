import {
  DefaultError,
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'

export type UseQueryProps<TData, TParams = undefined> = {
  options?: Omit<UseQueryOptions<TData>, 'queryKey'>
} & (TParams extends undefined ? object : { params: TParams })

export type UseInfiniteQueryProps<TData, TParams = undefined> = {
  options?: Omit<
    UseInfiniteQueryOptions<
      TData,
      Error,
      InfiniteData<TData, number>,
      TData,
      QueryKey,
      number
    >,
    'queryKey' | 'getNextPageParam' | 'initialPageParam'
  >
} & (TParams extends undefined ? object : { params: TParams })

export type UseMutationProps<TData, TVariables = void> = {
  options?: UseMutationOptions<TData, DefaultError, TVariables>
}
