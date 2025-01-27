import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { ActivityIndicator } from 'react-native'

import { SubItem } from '../SubItem/SubItem'

import {
  Avatar,
  BadgeType,
  IconButton,
  IconButtonProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { RequestStatus } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'

export type PlayerListItemProps = ProfileResponse & {
  onPress?: PressableProps['onPress']
  onSelectButtonPress?: IconButtonProps['onPress']
  displayStar?: boolean
  request?: {
    isLoading: boolean
    onAcceptPress?: () => void
    onRefusePress?: () => void
  }
  isSelected?: boolean
  isDisabled?: boolean
  requestStatus?: RequestStatus
}

export const PlayerListItem = ({
  full_name,
  first_name,
  last_name,
  manual_preference,
  side_preference,
  calculated_level,
  avatar_url,

  is_favorite = false,
  displayStar = true,

  request,

  onPress,
  onSelectButtonPress,
  isSelected,
  isDisabled,
  requestStatus,
}: PlayerListItemProps) => {
  const t = useTranslate()

  const mapRequestToBadge: Partial<Record<RequestStatus, BadgeType>> = {
    ACCEPTED: 'accepted',
    PENDING: 'pending',
    REFUSED: 'refused',
  }

  return (
    <HStack flex={1}>
      <Pressable flex={1} isDisabled={isDisabled} onPress={onPress}>
        <HStack
          flex={1}
          gap="$3"
          variant="colored"
          p="$3"
          rounded="$lg"
          alignItems="center"
        >
          {onSelectButtonPress && (
            <IconButton
              icon={isSelected ? 'FAR-circle-dot' : 'FAR-circle'}
              size="lg"
              onPress={onSelectButtonPress}
              //@ts-ignore:next-line
              height="$full"
              variant="header"
              isDisabled={isDisabled}
            />
          )}
          <Avatar
            size="md"
            imageUrl={avatar_url}
            badgeType={
              requestStatus ? mapRequestToBadge[requestStatus] : undefined
            }
            firstname={first_name}
            lastname={last_name}
          />
          <VStack flex={1} gap="$2">
            <HStack flex={1} alignItems="center" gap="$2">
              <Text>{full_name}</Text>
              {displayStar && is_favorite && <SubItem icon="FAS-star" />}
            </HStack>
            <HStack gap="$3">
              <SubItem
                text={calculated_level?.toString()}
                icon="FAS-dumbbell"
              />
              {manual_preference && (
                <SubItem
                  text={t(
                    `manualPreference.${manual_preference.toLowerCase()}`
                  )}
                  icon="FAR-hand"
                />
              )}
              {side_preference && (
                <SubItem
                  text={t(`sidePreference.${side_preference.toLowerCase()}`)}
                  icon="FAS-arrows-left-right"
                />
              )}
            </HStack>
          </VStack>

          {request && (
            <HStack gap="$4" justifyContent="center" alignItems="center">
              {request.isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  {request.onAcceptPress && (
                    <IconButton
                      icon="FAR-circle-check"
                      action="positive"
                      onPress={() => request.onAcceptPress?.()}
                      iconProps={{ size: '2xl' }}
                      variant="link"
                      //@ts-ignore:next-line
                      h="none"
                    />
                  )}
                  {request.onRefusePress && (
                    <IconButton
                      icon="FAR-circle-xmark"
                      action="negative"
                      onPress={() => request.onRefusePress?.()}
                      iconProps={{ size: '2xl' }}
                      variant="link"
                      //@ts-ignore:next-line
                      h="none"
                    />
                  )}
                </>
              )}
            </HStack>
          )}
        </HStack>
      </Pressable>
    </HStack>
  )
}
