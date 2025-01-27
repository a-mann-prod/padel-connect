import { VStack } from '@gluestack-ui/themed'
import { ListRenderItemInfo } from 'react-native'

import { PlayerListItem } from '../PlayerListItem/PlayerListItem'

import { VirtualizedList, VirtualizedListProps } from '@/designSystem'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import {
  MatchTeamInvitationResponse,
  useDeleteMatchTeamInvitation,
} from '@/services/api'
import { RequestStatus } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'

export type PlayerListProps = {
  onPress?: (id: number) => void
  data: MatchTeamInvitationResponse[]
  teamId: number
  matchId: number
} & Omit<
  VirtualizedListProps<MatchTeamInvitationResponse>,
  'renderItem' | 'getItem' | 'keyExtractor' | 'getItemCount'
>

export const InvitationList = ({
  onPress,
  data,
  teamId,
  matchId,
  ...props
}: PlayerListProps) => {
  const { data: me } = useMe()
  const onSuccess = useHandleSuccess()
  const t = useTranslate('match')

  const { mutate: deleteTeamInvitation, isPending } =
    useDeleteMatchTeamInvitation({
      options: {
        onSuccess: () =>
          onSuccess({
            title: t('requestDeleted'),
          }),
      },
    })

  const renderItem = ({
    item,
  }: ListRenderItemInfo<MatchTeamInvitationResponse>) => (
    <PlayerListItem
      {...item.user}
      onPress={onPress ? () => onPress(item.user.id) : undefined}
      requestStatus={item.status}
      request={
        me?.id !== item.user.id && item.status !== RequestStatus.REFUSED
          ? {
              onRefusePress: () =>
                deleteTeamInvitation({ id: item.id, teamId, matchId }),
              isLoading: isPending,
            }
          : undefined
      }
    />
  )

  return (
    <VStack gap="$3" flex={1}>
      <VirtualizedList<MatchTeamInvitationResponse>
        {...props}
        data={data}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </VStack>
  )
}
