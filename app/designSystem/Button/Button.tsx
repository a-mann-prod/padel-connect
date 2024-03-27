import {
  ButtonSpinner,
  Button as GButton,
  ButtonText as GButtonText,
} from '@gluestack-ui/themed'
import { ReactNode, forwardRef } from 'react'

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
        {isLoading ? <ButtonSpinner /> : <GButtonText>{title}</GButtonText>}
      </GButton>
    )
  }
)
