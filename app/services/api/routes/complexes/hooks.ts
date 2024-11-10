import { useQuery } from '@tanstack/react-query'

import { UseQueryProps } from '../../queryHooks'

import { ComplexResponse, ComplexesResponse } from './entities'
import { getComplexFn, getComplexesFn } from './functions'
import { GetComplexParams } from './params'

export const useComplex = ({
  params,
  options,
}: UseQueryProps<ComplexResponse, GetComplexParams>) =>
  useQuery<ComplexResponse>({
    queryKey: ['complexes', params.id],
    queryFn: () => getComplexFn(params),
    ...options,
  })

export const useComplexes = ({
  options,
}: UseQueryProps<ComplexesResponse> = {}) =>
  useQuery<ComplexesResponse>({
    queryKey: ['complexes'],
    queryFn: getComplexesFn,
    ...options,
  })
