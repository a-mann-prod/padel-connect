import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

import { UseQueryProps } from '../types'
import { ComplexResponse, ComplexesResponse } from './entities'
import { getComplexFn, getComplexesFn } from './functions'
import { GetComplexParams, GetComplexesParams } from './params'

export const useComplex = ({
  params,
  options,
}: UseQueryProps<ComplexResponse, GetComplexParams>) =>
  useQuery<ComplexResponse>(getComplexFn(params), options)

export const useComplexes = ({
  params,
  options,
}: UseQueryProps<ComplexesResponse, GetComplexesParams>) =>
  useQuery<ComplexesResponse>(getComplexesFn(params), options)
