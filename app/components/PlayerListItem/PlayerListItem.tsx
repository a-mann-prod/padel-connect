import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { Avatar, Icon, IconProps, Pressable } from '@/designSystem'
import { ProfileWithAvatar } from '@/hooks/useProfileWithAvatar'
import { useTranslate } from '@/services/i18n'
import { getUserName } from '@/utils/user'

export type PlayerlistItemProps = ProfileWithAvatar

export const PlayerListItem = ({
  id,
  first_name,
  last_name,
  manual_preference,
  side_preference,
  avatar,
}: PlayerlistItemProps) => {
  return (
    <Pressable onPress={() => router.navigate(`/(home)/${id}`)}>
      <HStack key={id} gap="$5" variant="colored" rounded="$lg" p="$3">
        <Avatar size="md" imageUrl={avatar} />
        <VStack gap="$2">
          <Text>{getUserName(first_name, last_name)}</Text>
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
