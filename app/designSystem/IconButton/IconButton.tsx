import {
  Box,
  Button as GButton,
  ButtonIcon as GButtonIcon,
} from '@gluestack-ui/themed'

import { Platform } from 'react-native'
import { FontAwesome, FontAwesomeProps } from '../Icon/FontAwesome/FontAwesome'

export type IconButtonProps = {
  icon: FontAwesomeProps['name']
  iconProps?: typeof GButtonIcon.defaultProps
  isLoading?: boolean
  hasBadge?: boolean
} & typeof GButton.defaultProps

export const IconButton = ({
  icon,
  isLoading,
  iconProps,
  hasBadge,
  ...props
}: IconButtonProps) => (
  <GButton {...props}>
    <GButtonIcon
      w={'unset' as any}
      h={'unset' as any}
      {...iconProps}
      as={(innerProps: any) => <FontAwesome name={icon} {...innerProps} />}
    />
    {hasBadge && (
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
