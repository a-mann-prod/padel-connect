import {
  ButtonSpinner,
  Button as GButton,
  ButtonIcon as GButtonIcon,
  ButtonText as GButtonText,
} from '@gluestack-ui/themed'
import { ReactNode, forwardRef } from 'react'
import { Icon } from '../Icon/Icon'

export type ButtonProps = {
  title: string
  icon?: ReactNode
  iconRight?: boolean
  isLoading?: boolean
} & typeof GButton.defaultProps

export const Button = forwardRef(
  (
    {
      title,
      icon,
      iconRight = false,
      isLoading = false,
      isDisabled,
      ...props
    }: ButtonProps,
    ref: any
  ) => {
    return (
      <GButton
        ref={ref}
        flexDirection={iconRight ? 'row-reverse' : 'row'}
        disabled={isLoading || isDisabled}
        {...props}
      >
        {isLoading ? (
          <ButtonSpinner />
        ) : (
          <>
            {icon && (
              <GButtonIcon
                px="$6"
                as={(iconProps: any) => <Icon name={icon} {...iconProps} />}
              />
            )}
            <GButtonText>{title}</GButtonText>
          </>
        )}
      </GButton>
    )
  }
)
