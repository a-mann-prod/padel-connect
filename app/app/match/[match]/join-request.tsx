import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { SearchUser, WithAuth, WithMatch } from '@/components'
import { Button, Container } from '@/designSystem'
import { useCreateMatchTeam, useMatch } from '@/services/api'
import { DefaultProfileResponse } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

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

    const players = match?.teams.reduce<
      Pick<
        DefaultProfileResponse,
        'id' | 'avatar_url' | 'first_name' | 'last_name'
      >[]
    >((acc, curr) => [...acc, ...curr.participants], [])

    const maxSelectedUserIds = match?.is_competitive
      ? 1
      : 3 - (players?.length || 0)

    return (
      <Container>
        <SearchUser
          disabledUserIds={players?.map((p) => p.id)}
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
