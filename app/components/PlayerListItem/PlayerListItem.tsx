import { HStack, Text, VStack } from '@gluestack-ui/themed'

import {
  Avatar,
  Icon,
  IconProps,
  Pressable,
  PressableProps,
} from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { useTranslate } from '@/services/i18n'
import { getUserName } from '@/utils/user'

export type PlayerlistItemProps = ProfileWithAvatar & {
  onPress: PressableProps['onPress']
  isFavorite: boolean
}

export const PlayerListItem = ({
  first_name,
  last_name,
  manual_preference,
  side_preference,
  avatar,
  onPress,
  isFavorite,
}: PlayerlistItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <HStack gap="$5" variant="colored" rounded="$lg" p="$3">
        <Avatar size="md" imageUrl={avatar} />
        <VStack gap="$2" flex={1}>
          <HStack alignItems="center">
            <Text flex={1}>{getUserName(first_name, last_name)}</Text>
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
