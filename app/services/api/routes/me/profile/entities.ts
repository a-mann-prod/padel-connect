import { DefaultProfileResponse } from '@/services/api/types'

export type MeProfileResponse = Omit<DefaultProfileResponse, 'is_favorite'> & {
  first_name: string
  last_name: string
}
