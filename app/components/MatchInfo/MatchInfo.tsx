import { Text, VStack } from '@gluestack-ui/themed'

import { Section, SectionRow } from '@/designSystem'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { MatchRecap, MatchRecapProps } from '../MatchRecap/MatchRecap'

type MatchInfoProps = MatchRecapProps & {
  levelRange: [number, number]
  isOpenToAll: boolean
  owner?: DefaultMinimalProfileResponse
}
export const MatchInfo = ({
  owner,
  isOpenToAll,
  levelRange,
  ...match
}: MatchInfoProps) => {
  const tGlobal = useTranslate()
  const [level_min, level_max] = levelRange

  return (
    <VStack gap="$3">
      <MatchRecap {...match} />
      <Section>
        <SectionRow
          title={tGlobal('captain')}
          icon="FAS-crown"
          rightComponent={() => <Text>{owner?.full_name}</Text>}
        />
        <SectionRow
          title={tGlobal('level')}
          icon="FAS-dumbbell"
          rightComponent={() => (
            <Text>
              {isOpenToAll
                ? tGlobal('allLevel')
                : `${level_min} - ${level_max}`}
            </Text>
          )}
        />
      </Section>
    </VStack>
  )
}
