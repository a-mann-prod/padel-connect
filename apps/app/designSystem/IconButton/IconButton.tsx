import { Button, ButtonIcon } from '@gluestack-ui/themed'
import { Icon, IconName } from '../Icon/Icon'

export type IconButtonProps = {
  name: IconName
  iconProps?: typeof ButtonIcon.defaultProps
  isLoading?: boolean
} & typeof Button.defaultProps

export const IconButton = ({
  name,
  isLoading,
  iconProps,
  ...props
}: IconButtonProps) => (
  <Button {...props}>
    <ButtonIcon
      {...iconProps}
      as={(iconProps: any) => <Icon name={name} {...iconProps} />}
    />
  </Button>
)
