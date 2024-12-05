import { router, useLocalSearchParams } from 'expo-router'

import { InvitationList, WithAuth, WithMatch } from '@/components'
import { Button, Container, Loader } from '@/designSystem'
import { useDeleteMatchTeam, useMatchTeamRequest } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithAuth(
  WithMatch(() => {
    const local = useLocalSearchParams()
    const matchId = Number(local?.match)

    const t = useTranslate('match')

    const {
      data: matchTeamRequest,
      isLoading,
      refetch,
      isRefetching,
    } = useMatchTeamRequest({
      params: { id: matchId },
    })

    const { mutate: deleteMatchTeam, isPending: isPendingDeleteMatchTeam } =
      useDeleteMatchTeam({
        options: { onSuccess: () => router.canGoBack() && router.back() },
      })

    if (isLoading) return <Loader />

    if (!matchTeamRequest) return

    return (
      <Container>
        <InvitationList
          matchId={matchId}
          teamId={matchTeamRequest.id}
          data={matchTeamRequest.invitations}
          onRefresh={refetch}
          onPress={(id) => router.navigate(routing.matchUser.path(matchId, id))}
          refreshing={isRefetching}
        />
        <Button
          title={t('addPlayer')}
          // isDisabled={(matchTeamRequest?.participants.length || 0) > 3}
          // onPress={() => router.navigate(routing.match)}
        />
        <Button
          title={t('cancelRequest')}
          icon="FAS-xmark"
          action="negative"
          isLoading={isPendingDeleteMatchTeam}
          onPress={() => deleteMatchTeam({ id: matchTeamRequest?.id, matchId })}
        />
      </Container>
    )
  })
)
