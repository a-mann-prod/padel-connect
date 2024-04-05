import {
  Button as GButton,
  ButtonIcon as GButtonIcon,
} from '@gluestack-ui/themed'

import { FontAwesome, FontAwesomeProps } from '../Icon/FontAwesome/FontAwesome'

export type IconButtonProps = {
  icon: FontAwesomeProps['name']
  iconProps: Omit<FontAwesomeProps, 'name'>
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
      as={(iconProps: any) => <FontAwesome {...iconProps} name={icon} />}
    />
  </GButton>
)
