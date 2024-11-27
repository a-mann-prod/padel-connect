import { HStack, Text, VStack } from '@gluestack-ui/themed'

import {
  Avatar,
  Icon,
  IconButton,
  IconButtonProps,
  IconNameProp,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfileResponse } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { getUsername } from '@/utils/user'

export type PlayerListItemProps = ProfileResponse & {
  onPress?: PressableProps['onPress']
  onSelectButtonPress?: IconButtonProps['onPress']
  displayStar?: boolean
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
  avatar_url,

  is_favorite = false,
  displayStar = true,

  matchRequest,
  onPress,
  onSelectButtonPress,
  isSelected,
  isDisabled,
  isSelectDisabled,
}: PlayerListItemProps) => {
  console.log(isSelectDisabled)
  return (
    <HStack flex={1}>
      <Pressable flex={1} onPress={isDisabled ? undefined : onPress}>
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
            <HStack alignItems="center">
              <Text flex={1}>{getUsername(first_name, last_name)}</Text>
              {displayStar && (
                <Icon
                  name={is_favorite ? 'FAS-star' : 'FAR-star'}
                  size="xs"
                  color="$primary500"
                />
              )}
            </HStack>
            <HStack gap="$3">
              <SubItem
                i18nParentKey="manualPreference"
                i18nKey={manual_preference}
                icon="FAR-hand"
              />
              <SubItem
                i18nParentKey="sidePreference"
                i18nKey={side_preference}
                icon="FAS-arrows-left-right"
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
      {/* {onUserViewPress && (
        <IconButton
          icon="FAS-user"
          borderRadius="$lg"
          borderTopLeftRadius="$none"
          borderBottomLeftRadius="$none"
          //@ts-ignore:next-line
          height="$none"
          onPress={onUserViewPress}
        />
      )} */}
    </HStack>
  )
}

type SubItemProps = {
  i18nParentKey: string
  i18nKey?: string | null
  icon: IconNameProp
}

const SubItem = ({ i18nParentKey, i18nKey, icon }: SubItemProps) => {
  const t = useTranslate()

  if (!i18nKey) return

  return (
    <HStack gap="$1" alignItems="center">
      <Icon name={icon} size="xs" />
      <Text variant="subtitle">
        {t(`${i18nParentKey}.${i18nKey?.toLowerCase()}`)}
      </Text>
    </HStack>
  )
}
