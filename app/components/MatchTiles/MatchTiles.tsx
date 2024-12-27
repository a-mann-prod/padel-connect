import { Tile } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { getMatchTypeIcon, getMatchTypeKey } from '@/utils/matchType'
import { VStack } from '@gluestack-ui/themed'

type MatchTilesProps = {
  isCompetitive: boolean
  isPast?: boolean
  isPrivate?: boolean
}

export const MatchTiles = ({
  isCompetitive,
  isPast,
  isPrivate,
}: MatchTilesProps) => {
  const t = useTranslate('match')
  const tGlobal = useTranslate()

  return (
    <VStack gap="$3">
      {isPast && (
        <Tile
          title={t('matchFinished')}
          bgColor="$secondary500"
          icon="FAS-calendar-check"
        />
      )}
      {isPrivate && (
        <Tile
          title={t('privateMatch')}
          bgColor="$secondary500"
          icon="FAS-lock"
        />
      )}
      <Tile
        title={tGlobal(getMatchTypeKey(isCompetitive))}
        bgColor="$primary500"
        icon={getMatchTypeIcon(isCompetitive)}
      />
    </VStack>
  )
}
