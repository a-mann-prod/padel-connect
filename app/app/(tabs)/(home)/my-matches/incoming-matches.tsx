import { Box, Heading, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { MatchListItem, WithAuth } from '@/components'
import { VirtualizedList } from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { MatchesResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(() => {
  const t = useTranslate()
  const { data: me } = useMe()

  const dates = useMemo(
    () => ({
      start: date.now().toISOString(),
    }),
    []
  )

  // const { data: userMatches, isLoading: isLoadingMatchIds } = useUserMatches({
  //   params: { user_id: me?.id as string, dates },
  //   options: { enabled: !isNilOrEmpty(me?.id) },
  // })

  // const matchIds = userMatches?.map(({ id }) => id) || []

  // const {
  //   data: matches,
  //   isLoading,
  //   refetch,
  //   isRefetching,
  // } = useMatches({
  //   params: {
  //     match_ids: matchIds,
  //   },
  //   options: {
  //     enabled: !isNilOrEmpty(matchIds),
  //   },
  // })

  const matches = [] as any[]
  const isLoading = false
  const isRefetching = false
  const isLoadingMatchIds = false
  const refetch = () => console.log('refetch')

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchesResponse['results'][number]>) => (
    <MatchListItem
      {...item}
      onPress={() => router.push(routing.match.path(item.id))}
    />
  )

  return (
    <VStack flex={1} gap="$3" m="$3">
      <Heading size="sm">{t('incomingMatches')}</Heading>
      <Box flex={1}>
        <VirtualizedList<MatchesResponse['results'][number]>
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
    </VStack>
  )
})
