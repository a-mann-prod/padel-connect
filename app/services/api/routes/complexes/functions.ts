import api from '../../axiosConfig'
import { ComplexesResponse, ComplexResponse } from './entities'
import { GetComplexParams } from './params'

export const getComplexFn = async (params: GetComplexParams) => {
  const { data } = await api.get<ComplexResponse>(`/complexes/${params.id}`)

  return data
}

export const getComplexesFn = async () => {
  const { data } = await api.get<ComplexesResponse>('/complexes/')

  return data
}
