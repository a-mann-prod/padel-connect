import { Tile, TileProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { getMatchTypeIcon, getMatchTypeKey } from '@/utils/matchType'

type MatchTypeTileProps = {
  isCompetitive: boolean
} & Omit<TileProps, 'title'>

export const MatchTypeTile = ({ isCompetitive }: MatchTypeTileProps) => {
  const t = useTranslate()

  return (
    <Tile
      title={t(getMatchTypeKey(isCompetitive))}
      bgColor="$primary500"
      icon={getMatchTypeIcon(isCompetitive)}
    />
  )
}
