import { Box, Heading, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem } from '@/components'
import { Button, VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { MatchesResponse, useMatches, useUserMatches } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { isNilOrEmpty } from '@/utils/global'

export default () => {
  const t = useTranslate()
  const { data: me } = useMe()

  const dates = useMemo(
    () => ({
      start: date.now().toISOString(),
    }),
    []
  )

  const { data: userMatches, isLoading: isLoadingMatchIds } = useUserMatches({
    params: { user_id: me?.id as string },
    options: { enabled: !isNilOrEmpty(me?.id) },
  })

  const matchIds = userMatches?.map(({ id }) => id) || []

  const {
    data: matches,
    isLoading,
    refetch,
    isRefetching,
  } = useMatches({
    params: {
      dates,
      match_ids: matchIds,
    },
    options: {
      enabled: !isNilOrEmpty(matchIds),
    },
  })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse[number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <Heading size="sm">{t('incomingMatches')}</Heading>
      <Box flex={1}>
        <VirtualizedList<MatchesResponse[number]>
          data={matches}
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data.length}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          isLoading={isLoading || isLoadingMatchIds}
          onRefresh={refetch}
          refreshing={isRefetching}
        />
      </Box>
      <Button
        title={t('showPastMatches')}
        onPress={() => router.push(routing.homeMyOldMatches.path())}
      />
    </VStack>
  )
}
