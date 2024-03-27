import { Button } from '@gluestack-ui/themed'

import { Icon, IconProps } from '../Icon/Icon'

export type IconButtonProps = {
  icon: IconProps['name']
  iconProps: Omit<IconProps, 'name'>
  isLoading?: boolean
} & typeof Button.defaultProps

export const IconButton = ({
  icon,
  isLoading,
  iconProps,
  ...props
}: IconButtonProps) => (
  <Button {...props}>
    <Icon name={icon} {...iconProps} />
  </Button>
)
