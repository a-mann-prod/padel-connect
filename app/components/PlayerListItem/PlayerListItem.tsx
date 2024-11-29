import { HStack, Text, VStack } from '@gluestack-ui/themed'

import {
  Avatar,
  IconButton,
  IconButtonProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { getUsername } from '@/utils/user'
import { SubItem } from '../SubItem/SubItem'

export type PlayerListItemProps = ProfileResponse & {
  onPress?: PressableProps['onPress']
  onSelectButtonPress?: IconButtonProps['onPress']
  displayStar?: boolean
  is_request?: boolean
  matchRequest?: {
    isLoading: boolean
    onAcceptPress: (id: number | undefined) => void
    onRefusePress: (id: number | undefined) => void
  }
  isSelected?: boolean
  isDisabled?: boolean
  isSelectDisabled?: boolean
}

export const PlayerListItem = ({
  id,
  first_name,
  last_name,
  manual_preference,
  side_preference,
  calculated_level,
  avatar_url,

  is_favorite = false,
  displayStar = true,

  is_request = false,

  matchRequest,

  onPress,
  onSelectButtonPress,
  isSelected,
  isDisabled,
  isSelectDisabled,
}: PlayerListItemProps) => {
  const t = useTranslate()
  return (
    <HStack flex={1}>
      <Pressable
        flex={1}
        onPress={isDisabled ? undefined : onPress}
        displayDisabledOpacity
      >
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
              variant="headerIcon"
              isDisabled={isSelectDisabled}
            />
          )}
          <Avatar size="md" imageUrl={avatar_url} />
          <VStack flex={1} gap="$2">
            <HStack flex={1} alignItems="center" gap="$2">
              <Text>{getUsername(first_name, last_name)}</Text>
              {displayStar && is_favorite && <SubItem icon="FAS-star" />}
            </HStack>
            <HStack gap="$3">
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

              <SubItem
                text={calculated_level?.toString()}
                icon="FAS-dumbbell"
              />
            </HStack>
          </VStack>

          {matchRequest && (
            <HStack gap="$4" alignItems="center">
              <IconButton
                icon="FAR-circle-check"
                action="positive"
                onPress={() => matchRequest.onAcceptPress(id)}
                iconProps={{ size: '2xl' }}
                variant="link"
                isLoading={matchRequest.isLoading}
              />
              <IconButton
                icon="FAR-circle-xmark"
                action="negative"
                onPress={() => matchRequest.onRefusePress(id)}
                iconProps={{ size: '2xl' }}
                variant="link"
                isLoading={matchRequest.isLoading}
              />
            </HStack>
          )}
        </HStack>
      </Pressable>
    </HStack>
  )
}
