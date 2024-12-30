import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'

import { SearchUser } from '@/components'
import { Button } from '@/designSystem'
import { useMatch, useShareMatch } from '@/services/api'
import { DefaultMinimalProfileResponse } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { hasAdaptedLevel } from '@/utils/user'
import { router, useLocalSearchParams } from 'expo-router'

export default () => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { data: match } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const players = match?.teams.reduce<DefaultMinimalProfileResponse[]>(
    (acc, curr) => [...acc, ...curr.participants],
    []
  )

  const t = useTranslate('match')
  const [userIds, setUserIds] = useState<number[]>([])

  const { mutate: share, isPending } = useShareMatch({
    options: {
      onSuccess: () => {
        router.canGoBack() && router.back()
      },
    },
  })

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} m="$3">
        <SearchUser
          disableUser={(user) =>
            !!players?.some(({ id }) => id === user.id) ||
            (!!match &&
              !match.is_open_to_all_level &&
              !hasAdaptedLevel(
                user.calculated_level,
                match.calculated_level_range
              ))
          }
          onPress={(id) => router.navigate(routing.matchUser.path(matchId, id))}
          selectedUserIds={userIds}
          onSelectButtonPress={(id) =>
            setUserIds((prev) => {
              const index = prev.indexOf(id)
              if (index !== -1) {
                return [...prev.slice(0, index), ...prev.slice(index + 1)]
              }

              return [...prev, id]
            })
          }
        />

        <Button
          title={t('shareMatch')}
          isDisabled={!userIds.length}
          onPress={() => share({ id: matchId, user_ids: userIds })}
          isLoading={isPending}
        />
      </VStack>
    </SafeAreaView>
  )
}
