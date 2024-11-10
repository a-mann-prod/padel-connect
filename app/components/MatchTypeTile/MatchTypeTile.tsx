import { Tile, TileProps } from '@/designSystem'
import { MatchType } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { mapTypeToIcon } from '@/utils/matchType'

type MatchTypeTileProps = {
  type: MatchType
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
