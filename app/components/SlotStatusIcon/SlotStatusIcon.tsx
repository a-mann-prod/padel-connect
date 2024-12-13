import { HStack } from '@gluestack-ui/themed'

import { Icon, IconNameProp, IconProps } from '@/designSystem'

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'UNAVAILABLE'

export type SlotStatusIconProps = {
  status: SlotStatus | null
}

export const SlotStatusIcon = ({ status }: SlotStatusIconProps) => {
  const mapStatusToIcon: Record<SlotStatus, IconNameProp> = {
    AVAILABLE: 'FAR-circle',
    BOOKED: 'FAR-circle-check',
    UNAVAILABLE: 'FAR-circle-xmark',
  }

  const mapStatusToColor: Record<SlotStatus, IconProps['color']> = {
    AVAILABLE: '',
    BOOKED: '$green500',
    UNAVAILABLE: '$red500',
  }

  if (!status) return

  return (
    <HStack gap="$2" alignItems="center">
      <Icon name={mapStatusToIcon[status]} color={mapStatusToColor[status]} />
    </HStack>
  )
}
