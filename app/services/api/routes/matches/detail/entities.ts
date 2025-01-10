import {
  DefaultMinimalProfileResponse,
  Entity,
  PaginatedResponse,
} from '../../../types'
import { ComplexResponse } from '../../complexes'

export type MatchResponse = Entity<{
  four_padel_field_id: number
  four_padel_field_name: string
  four_padel_booking_id?: number
  four_padel_field_price: number
  complex: ComplexResponse
  datetime: string
  duration: number
  is_private: boolean
  level: number
  calculated_level_range: [number, number]
  is_competitive: boolean
  is_booked: boolean
  is_open_to_all_level: boolean
  user: number
  teams: Entity<{
    participants: DefaultMinimalProfileResponse[]
    user: number
  }>[]
}>

export type MatchesResponse = PaginatedResponse<
  Omit<MatchResponse, 'complex'> & {
    is_request: boolean
    complex: number
  }
>
