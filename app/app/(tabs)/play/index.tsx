import { Box, HStack, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

import { DateCarouselFilter, MatchListItem } from '@/components'
import { Button, IconButton, VirtualizedList } from '@/designSystem'
import { MatchResponse, useMatches } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate('play')
  const [dateFilter, setDateFilter] = useState<Dayjs>(date.now())

  const { data: matches, isLoading } = useMatches({
    params: {
      dates: {
        start: dateFilter.startOf('day').toISOString(),
        end: dateFilter.endOf('day').toISOString(),
      },
    },
  })

  console.log(matches)

  const renderItem = ({ item }: ListRenderItemInfo<MatchResponse>) => (
    <MatchListItem
      {...item}
      onPress={() => router.navigate(`/play/${item.id}`)}
    />
  )

  return (
    <VStack gap="$3" mx="$3" mb="$3" h="$full" flex={1}>
      {/* Filters */}
      <HStack gap="$3" pt="$3">
        <IconButton icon="FAS-street-view" h="$full" />
        <DateCarouselFilter onChange={setDateFilter} value={dateFilter} />
      </HStack>

      <VirtualizedList<MatchResponse>
        data={matches || []}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        isLoading={isLoading}
      />
      <Box w="100%" position="absolute" bottom={0} alignItems="center" mb="$6">
        <Link asChild href="/(tabs)/play/(modals)/match-creation">
          <Button title={t('createNewMatch')} rounded="$full" icon="FAS-plus" />
        </Link>
      </Box>
    </VStack>
  )
}
