import {
  ButtonSpinner,
  Button as GButton,
  ButtonIcon as GButtonIcon,
  ButtonText as GButtonText,
} from '@gluestack-ui/themed'
import { forwardRef, PropsWithChildren } from 'react'

import { FontAwesome, FontAwesomeProps } from '../Icon/FontAwesome/FontAwesome'

import { isNilOrEmpty } from '@/utils/global'

type GButtonProps = PropsWithChildren<typeof GButton.defaultProps>

export type ButtonProps = {
  title: string
  icon?: FontAwesomeProps['name']
  iconRight?: boolean
  isLoading?: boolean
} & GButtonProps

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
        isDisabled={isLoading || isDisabled}
        {...props}
      >
        {isLoading ? (
          <ButtonSpinner />
        ) : (
          <>
            {!isNilOrEmpty(icon) && (
              <GButtonIcon
                px="$2"
                w={null}
                h={null}
                as={(iconProps: any) => (
                  <FontAwesome {...iconProps} name={icon} />
                )}
              />
            )}
            <GButtonText>{title}</GButtonText>
          </>
        )}
      </GButton>
    )
  }
)
