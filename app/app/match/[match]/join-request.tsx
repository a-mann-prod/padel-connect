import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { SearchUser, WithAuth, WithMatch } from '@/components'
import { Button, Container } from '@/designSystem'
import { useCreateMatchTeam, useMatch } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { hasAdaptedLevel } from '@/utils/user'

export default WithAuth(
  WithMatch(() => {
    const t = useTranslate('match')

    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

    const { data: match } = useMatch({
      params: { id: matchId },
      options: { enabled: !!matchId },
    })

    const { mutate: createMatchTeam, isPending } = useCreateMatchTeam({
      options: {
        onSuccess: () => router.canGoBack() && router.back(),
      },
    })

    const [userIds, setUserIds] = useState<number[]>([])

    if (!match) return

    const players = [...match.team_1_users, ...match.team_2_users]

    const maxSelectedUserIds = match.is_competitive
      ? 1
      : 3 - (players?.length || 0)

    return (
      <Container>
        <SearchUser
          disableUser={(user) =>
            !!players?.some(({ id }) => id === user.id) ||
            (!match.is_open_to_all_level &&
              !hasAdaptedLevel(
                user.calculated_level,
                match.calculated_level_range
              ))
          }
          selectedUserIds={userIds}
          maxSelectedUserIds={maxSelectedUserIds}
          onPress={(id) => router.navigate(routing.matchUser.path(matchId, id))}
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
          title={t('sendAloneRequest')}
          isDisabled={userIds.length !== 0}
          onPress={() => {
            createMatchTeam({ matchId })
          }}
          isLoading={isPending}
        />
        <Button
          title={t('sendGroupRequest')}
          isDisabled={userIds.length === 0}
          onPress={() => {
            createMatchTeam({ matchId, send_invitations: userIds })
          }}
          isLoading={isPending}
        />
      </Container>
    )
  })
)
