import { when } from '@/utils/when'
import { Input, InputField } from '@gluestack-ui/themed'
import { FormControl, FormControlProps } from '../FormControl/FormControl'

export type FormInputProps = {
  displayPlaceHolder?: boolean
  formControlProps: FormControlProps
} & typeof InputField.defaultProps

export const FormInput = ({
  displayPlaceHolder = false,
  formControlProps,
  ...props
}: FormInputProps) => {
  return (
    <FormControl {...formControlProps}>
      <Input>
        <InputField
          placeholder={when(displayPlaceHolder, formControlProps.title)}
          {...props}
        />
      </Input>
    </FormControl>
  )
}
