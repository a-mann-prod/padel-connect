import { Center, AvatarBadge as GAvatarBadge } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { Icon, IconNameProp, IconProps } from '../Icon/Icon'

export type BadgeType = 'edit' | 'pending' | 'accepted' | 'refused'
export type AvatarBadgeProps = ComponentProps<typeof GAvatarBadge> & {
  type: BadgeType
}

const badgeTypeToProps: Record<BadgeType, Partial<AvatarBadgeProps>> = {
  accepted: {
    h: '$4.5',
    w: '$4.5',
    bgColor: '$green500',
  },
  edit: {
    bgColor: '$blueGray500',
  },
  pending: {
    h: '$4.5',
    w: '$4.5',
    bgColor: '$orange500',
  },
  refused: {
    h: '$4.5',
    w: '$4.5',
    bgColor: '$red500',
  },
}

const badgeTypeToIconProps: Record<
  BadgeType,
  Partial<IconProps & { name: IconNameProp }>
> = {
  accepted: {
    name: 'FAS-check',
    color: '$white',
    size: '3xs',
  },
  edit: {
    name: 'FAS-pencil',
    color: '$white',
    size: 'xs',
  },
  pending: {
    name: 'FAS-question',
    color: '$white',
    size: '3xs',
  },
  refused: {
    name: 'FAS-question',
    color: '$white',
    size: '3xs',
  },
}

const badgeTypeToIconName: Record<BadgeType, IconNameProp> = {
  accepted: 'FAS-check',
  edit: 'FAS-pencil',
  pending: 'FAS-question',
  refused: 'FAS-xmark',
}

export const AvatarBadge = ({ type, ...props }: AvatarBadgeProps) => {
  return (
    <GAvatarBadge {...props} {...badgeTypeToProps[type]}>
      <Center flex={1}>
        <Icon
          {...badgeTypeToIconProps[type]}
          name={badgeTypeToIconName[type]}
        />
      </Center>
    </GAvatarBadge>
  )
}
