import { Tile, TileProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { Database } from '@/services/supabase/database.types'
import { mapTypeToIcon } from '@/utils/matchType'

type MatchTypeTileProps = {
  type: Database['public']['Enums']['match_type']
} & Omit<TileProps, 'title'>

export const MatchTypeTile = ({ type }: MatchTypeTileProps) => {
  const t = useTranslate()

  return (
    <Tile
      title={t(`matchType.${type.toLowerCase()}`)}
      bgColor="$primary500"
      icon={mapTypeToIcon[type]}
    />
  )
}
