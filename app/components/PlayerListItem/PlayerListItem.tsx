import { HStack, Text, VStack } from '@gluestack-ui/themed'

import {
  Avatar,
  Icon,
  IconButton,
  IconProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { useTranslate } from '@/services/i18n'
import { getUsername } from '@/utils/user'

export type PlayerListItemProps = ProfileWithAvatar & {
  onPress: PressableProps['onPress']
  isFavorite?: boolean
  matchRequest?: {
    isLoading: boolean
    onAcceptPress: (id: string | undefined) => void
    onRefusePress: (id: string | undefined) => void
  }
}

export const PlayerListItem = ({
  id,
  first_name,
  last_name,
  manual_preference,
  side_preference,
  avatar,
  onPress,
  isFavorite = false,
  matchRequest,
}: PlayerListItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <HStack gap="$5" variant="colored" rounded="$lg" p="$3">
        <Avatar size="md" imageUrl={avatar} />
        <VStack flex={1} gap="$2">
          <HStack alignItems="center">
            <Text flex={1}>{getUsername(first_name, last_name)}</Text>
            {isFavorite && <Icon name="FAS-star" size="xs" />}
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
  )
}

type SubItemProps = {
  i18nParentKey: string
  i18nKey?: string | null
  icon: IconProps['name']
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
