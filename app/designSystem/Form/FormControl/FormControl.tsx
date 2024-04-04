import {
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  FormControl as GFormControl,
} from '@gluestack-ui/themed'
import { FieldError } from 'react-hook-form'

import { Icon } from '@/designSystem/Icon/Icon'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'

export type FormControlProps = {
  title?: string
  helpMessage?: string
  error?: FieldError
} & typeof GFormControl.defaultProps

export const FormControl = ({
  title,
  helpMessage,
  error,
  children,
  ...props
}: FormControlProps) => {
  const t = useTranslate('zod', { keyPrefix: 'errors' })
  const errorMessage = error?.message ? t(error.message) : undefined

  return (
    <GFormControl isInvalid={!!errorMessage} {...props}>
      {!isNilOrEmpty(title) && (
        <FormControlLabel>
          <FormControlLabelText>{title}</FormControlLabelText>
        </FormControlLabel>
      )}
      {children}
      {helpMessage && (
        <FormControlHelper>
          <FormControlHelperText>{helpMessage}</FormControlHelperText>
        </FormControlHelper>
      )}
      {!isNilOrEmpty(errorMessage) && (
        <FormControlError>
          <FormControlErrorIcon
            color="$error700"
            w="$3.5"
            h="$3.5"
            size="xs"
            as={(props: any) => (
              <Icon {...props} name="FAS-circle-exclamation" />
            )}
          />
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </GFormControl>
  )
}
