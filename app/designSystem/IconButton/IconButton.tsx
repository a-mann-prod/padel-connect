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
    <GButton {...props} opacity={when(!!props.disabled, 0.5)}>
      <GButtonIcon
        w={'unset' as any}
        h={'unset' as any}
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
      {hasEmptyBadge && (
        <Box
          top={2}
          right={Platform.OS === 'ios' ? -10 : 10}
          position="absolute"
          rounded="$full"
          w="$2.5"
          h="$2.5"
          bgColor="$red500"
        />
      )}
    </GButton>
  )
}
