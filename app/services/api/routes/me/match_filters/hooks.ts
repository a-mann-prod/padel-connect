import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MatchFiltersResponse } from './entities'
import { getMatchFiltersFn, updateMatchFilters } from './functions'
import { UpdateMatchFiltersParams } from './params'

export const useMatchFilters = ({
  options,
}: UseQueryProps<MatchFiltersResponse> = {}) =>
  useQuery<MatchFiltersResponse>({
    queryKey: ['match_filters'],
    queryFn: getMatchFiltersFn,
    ...options,
  })

export const useUpdateMatchFilters = ({
  options,
}: UseMutationProps<MatchFiltersResponse, UpdateMatchFiltersParams> = {}) =>
  useMutation({
    mutationFn: updateMatchFilters,
    ...options,
  })
