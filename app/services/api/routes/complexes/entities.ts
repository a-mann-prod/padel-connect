import { Entity, PaginatedResponse } from '../../types'

export type ComplexResponse = Entity<{
  name: string
  phone_number: string
}>

export type ComplexesResponse = PaginatedResponse<ComplexResponse>
