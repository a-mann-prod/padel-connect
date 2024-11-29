import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'

import { SearchUser, WithAuth, WithMatch } from '@/components'
import { Button, Container } from '@/designSystem'
import { useMatch } from '@/services/api'
import { useTranslate } from '@/services/i18n'

export default WithAuth(
  WithMatch(() => {
    const t = useTranslate('match')

    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

    const { data: match } = useMatch({
      params: { id: matchId },
      options: { enabled: !!matchId },
    })

    const [userIds, setUserIds] = useState<number[]>([])

    const players = match?.teams.reduce<number[]>(
      (acc, curr) => [...acc, ...curr.participants],
      []
    )

    console.log(players)

    const maxSelectedUserIds = match?.is_competitive
      ? 1
      : 3 - (players?.length || 0)

    return (
      <Container>
        <SearchUser
          disabledUserIds={players}
          selectedUserIds={userIds}
          maxSelectedUserIds={maxSelectedUserIds}
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
            // TODO: ADD INVITATION with userId
            // createMatch()
          }}
          // isLoading={isPendingCreateMatch}
        />
        <Button
          title={t('sendGroupRequest')}
          isDisabled={userIds.length === 0}
          onPress={() => {
            // TODO: ADD INVITATION with userId
            // createMatch()
          }}
          // isLoading={isPendingCreateMatch}
        />
      </Container>
    )
  })
)
