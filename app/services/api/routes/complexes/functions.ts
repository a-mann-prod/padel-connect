import api from '../../axiosConfig'
import { ComplexesResponse, ComplexResponse } from './entities'
import { GetComplexParams } from './params'

export const getComplexFn = async (
  params: GetComplexParams
): Promise<ComplexResponse> => {
  const { data } = await api.get(`/complexes/${params.id}`)

  return data
}

export const getComplexesFn = async (): Promise<ComplexesResponse> => {
  const { data } = await api.get('/complexes/')

  return data
}
