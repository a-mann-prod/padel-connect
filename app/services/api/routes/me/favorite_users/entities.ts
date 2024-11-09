import { DefaultProfileResponse, PaginatedResponse } from '@/services/api/types'

export type FavoriteUserResponse = DefaultProfileResponse

export type FavoriteUsersResponse = PaginatedResponse<FavoriteUserResponse>
