import { IconNameProp } from '@/designSystem'
import { Database } from '@/services/supabase/database.types'

export type TournamentType = Database['public']['Enums']['tournament_type']

const mapTypeToIcon: Record<TournamentType, IconNameProp> = {
  COMPETITION: 'FAS-trophy',
  LEISURE: 'FAR-hand-peace',
}

export const tournamentListItemServices = {
  mapTypeToIcon,
}
