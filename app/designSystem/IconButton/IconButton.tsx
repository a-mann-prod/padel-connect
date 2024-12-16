import {
  Center,
  Button as GButton,
  ButtonIcon as GButtonIcon,
  Text,
} from '@gluestack-ui/themed'
import { Platform } from 'react-native'

import { FontAwesome, FontAwesomeProps } from '../Icon/FontAwesome/FontAwesome'

import { isNilOrEmpty } from '@/utils/global'
import { when } from '@/utils/when'
import { Badge } from '../Badge/Badge'

export type IconButtonProps = {
  icon: FontAwesomeProps['name']
  iconProps?: typeof GButtonIcon.defaultProps
  isLoading?: boolean
  badgeCount?: number | null
  hasEmptyBadge?: boolean
} & typeof GButton.defaultProps

export const IconButton = ({
  icon,
  isLoading,
  iconProps,
  badgeCount,
  hasEmptyBadge = false,
  ...props
}: IconButtonProps) => {
  const tooManyNotifications = (badgeCount || 0) > 9

  return (
    <GButton {...props} opacity={when(!!props.isDisabled, 0.5)}>
      <GButtonIcon
        w={null}
        h={null}
        {...iconProps}
        as={(innerProps: any) => <FontAwesome name={icon} {...innerProps} />}
      />
      {!isNilOrEmpty(badgeCount) && (
        <Center
          top={0}
          right={Platform.OS === 'ios' ? -15 : 15}
          position="absolute"
          rounded="$full"
          w={when(!tooManyNotifications, '$5')}
          h="$5"
          bgColor="$red500"
        >
          <Text size="sm" color="$white" px={when(tooManyNotifications, '$1')}>
            {badgeCount}
          </Text>
        </Center>
      )}
      {hasEmptyBadge && <Badge />}
    </GButton>
  )
}
