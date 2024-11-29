import { HStack, Text } from '@gluestack-ui/themed'

import { Icon, IconNameProp } from '@/designSystem'

type SubItemProps = {
  text?: string | null
  icon: IconNameProp
}

export const SubItem = ({ text, icon }: SubItemProps) => {
  return (
    <HStack gap="$1" alignItems="center">
      <Icon name={icon} size="xs" />
      {text && <Text variant="subtitle">{text}</Text>}
    </HStack>
  )
}
