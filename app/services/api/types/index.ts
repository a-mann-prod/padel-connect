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

export enum MatchRequestStatus {
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  PENDING = 'PENDING',
}

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_MATCH = 'NEW_MATCH',
  NEW_MATCH_REQUEST = 'NEW_MATCH_REQUEST',
  MATCH_REQUEST_RESPONSE_ACCEPTED = 'MATCH_REQUEST_RESPONSE_ACCEPTED',
  MATCH_REQUEST_RESPONSE_REFUSED = 'MATCH_REQUEST_RESPONSE_REFUSED',
}

export enum SidePreference {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH',
}

export type Params<T> = T &
  Partial<{
    orderBy: Partial<Record<keyof T, 'ASC' | 'DESC'>>
  }>

export type DefaultProfileResponse = Entity<{
  last_name: string
  first_name: string
  avatar_url: string
  manual_preference: ManualPreference
  side_preference: SidePreference
  offense_level?: number
  defense_level?: number
  service_level?: number
  calculated_level?: number
  is_favorite: boolean
}>

export type PaginatedResponse<T> = {
  count: number
  next_page: number
  previous_page: number
  results: T[]
}
