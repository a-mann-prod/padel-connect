import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams } from 'expo-router'

import { PlayerListItem, SearchUser, WithAuth, WithMatch } from '@/components'
import { Button, Loader, VirtualizedList } from '@/designSystem'
import {
  MatchInvitationsResponse,
  MatchTeamInvitationResponse,
  useCreateMatchTeamInvitation,
  useDeleteMatchTeamInvitation,
  useInfiniteMatchInvitations,
} from '@/services/api'
import { RequestStatus } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { useState } from 'react'
import { ListRenderItemInfo } from 'react-native'

export default WithAuth(
  WithMatch(() => {
    const local = useLocalSearchParams()
    const matchId = Number(local?.match)
    const t = useTranslate('match')

    const [userId, setUserId] = useState<number | null>(null)

    const {
      data: matchInvitationsPages,
      isLoading,
      refetch,
      isRefetching,
    } = useInfiniteMatchInvitations({
      params: { matchId },
    })

    const { mutate: deleteTeamInvitation, isPending: isPendingDeletion } =
      useDeleteMatchTeamInvitation()

    const { mutate: createTeamInvitation, isPending: isPendingCreation } =
      useCreateMatchTeamInvitation({
        options: {
          onSuccess: () => {
            refetch()
          },
        },
      })

    if (isLoading) return <Loader />

    const matchInvitations = matchInvitationsPages?.pages.reduce<
      MatchInvitationsResponse['results']
    >((prev, acc) => [...prev, ...acc.results], [])

    const team = matchInvitations?.[0].team
    const item = team?.invitations?.[0]

    if (item) {
      const renderItem = ({
        item,
      }: ListRenderItemInfo<MatchTeamInvitationResponse>) => (
        <PlayerListItem
          {...item.user}
          requestStatus={item.status}
          onPress={() =>
            item.id && router.navigate(routing.matchUser.path(matchId, item.id))
          }
          request={
            item.status === RequestStatus.PENDING
              ? {
                  isLoading: isPendingDeletion,
                  onRefusePress: () => {
                    item.id &&
                      team?.id &&
                      deleteTeamInvitation({
                        matchId,
                        id: item.id,
                        teamId: team.id,
                      })
                    setUserId(null)
                  },
                }
              : undefined
          }
        />
      )

      return (
        <VStack h="100%" gap="$3" m="$3">
          <VirtualizedList<MatchTeamInvitationResponse>
            data={[item]}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            isLoading={isLoading}
            onRefresh={refetch}
            refreshing={isRefetching}
          />
        </VStack>
      )
    }

    return (
      <SafeAreaView flex={1}>
        <VStack flex={1} gap="$3" m="$3">
          <SearchUser
            selectedUserIds={userId ? [userId] : []}
            maxSelectedUserIds={1}
            onSelectButtonPress={(id) =>
              setUserId((prev) => (prev ? null : id))
            }
          />
          <Button
            title={t('sendInvitation')}
            isDisabled={!userId}
            onPress={() => {
              team &&
                userId &&
                createTeamInvitation({ matchId, teamId: team.id, user: userId })
            }}
            isLoading={isPendingCreation}
          />
        </VStack>
      </SafeAreaView>
    )
  })
)
