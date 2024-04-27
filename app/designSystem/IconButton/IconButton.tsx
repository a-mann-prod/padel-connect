import {
  Button as GButton,
  ButtonIcon as GButtonIcon,
} from '@gluestack-ui/themed'

import { FontAwesome, FontAwesomeProps } from '../Icon/FontAwesome/FontAwesome'

export type IconButtonProps = {
  icon: FontAwesomeProps['name']
  iconProps?: typeof GButtonIcon.defaultProps
  isLoading?: boolean
} & typeof GButton.defaultProps

export const IconButton = ({
  icon,
  isLoading,
  iconProps,
  ...props
}: IconButtonProps) => (
  <GButton {...props}>
    <GButtonIcon
      w={'unset' as any}
      h={'unset' as any}
      {...iconProps}
      as={(innerProps: any) => <FontAwesome name={icon} {...innerProps} />}
    />
  </GButton>
)
