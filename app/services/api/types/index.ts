import { AxiosError } from 'axios'

export type Entity<T> = T & {
  id: number
  created_at: string
  updated_at: string
}

export enum MatchType {
  LEISURE = 'LEISURE',
  COMPETITION = 'COMPETITION',
}

export enum ManualPreference {
  LEFT_HANDED = 'LEFT_HANDED',
  RIGHT_HANDED = 'RIGHT_HANDED',
}

export enum RequestStatus {
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  PENDING = 'PENDING',
  CREATING = 'CREATING',
}

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_MATCH = 'NEW_MATCH',
  NEW_MATCH_INVITATION = 'NEW_MATCH_INVITATION',
  MATCH_REQUEST_RESPONSE_ACCEPTED = 'MATCH_REQUEST_RESPONSE_ACCEPTED',
  MATCH_REQUEST_RESPONSE_REFUSED = 'MATCH_REQUEST_RESPONSE_REFUSED',
  NEW_PLAYERS = 'NEW_PLAYERS',
  INVITATION_RESPONSE = 'INVITATION_RESPONSE',
  MATCH_SHARE = 'MATCH_SHARE',
}

export enum SidePreference {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH',
}

export enum Language {
  EN = 'EN',
  FR = 'FR',
}

export enum BookingStatus {
  COMPLETE = 'COMPLETE',
  CANCELLED = 'CANCELLED',
  PAYABLE = 'PAYABLE',
  PRE_BOOKED = 'PRE_BOOKED',
}

export enum Sex {
  ALL = 'ALL',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  MIXED = 'MIXED',
}

export type Params<T> = T &
  Partial<{
    orderBy: Partial<Record<keyof T, 'ASC' | 'DESC'>>
  }>

export type DefaultProfileResponse = Entity<{
  last_name: string
  first_name: string
  full_name: string
  avatar_url?: string
  manual_preference: ManualPreference
  side_preference: SidePreference
  offense_level?: number
  defense_level?: number
  service_level?: number
  calculated_level?: number
  is_favorite: boolean
}>

export type DefaultMinimalProfileResponse = Entity<{
  last_name: string
  first_name: string
  full_name: string
  avatar_url?: string
}>

export type PaginatedResponse<T> = {
  count: number
  next_page: number
  previous_page: number
  results: T[]
}

export type BackendError = AxiosError<{
  error: { code: [string]; detail: [string] }
}>
