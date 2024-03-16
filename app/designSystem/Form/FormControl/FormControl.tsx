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
import { Icon } from '../../Icon/Icon'

export type FormControlProps = {
  title: string
  helpMessage?: string
  errorMessage?: string
} & typeof GFormControl.defaultProps

export const FormControl = ({
  title,
  helpMessage,
  errorMessage,
  children,
  ...props
}: FormControlProps) => {
  return (
    <GFormControl isInvalid={!!errorMessage} {...props}>
      <FormControlLabel>
        <FormControlLabelText>{title}</FormControlLabelText>
      </FormControlLabel>
      {children}
      {helpMessage && (
        <FormControlHelper>
          <FormControlHelperText>{helpMessage}</FormControlHelperText>
        </FormControlHelper>
      )}
      {errorMessage && (
        <FormControlError>
          <FormControlErrorIcon
            color="$error700"
            w="$3.5"
            h="$3.5"
            size="xs"
            as={(props: any) => <Icon {...props} name="warning" />}
          />
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </GFormControl>
  )
}
