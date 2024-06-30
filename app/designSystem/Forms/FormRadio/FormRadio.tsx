import {
  Box,
  CircleIcon,
  Radio as GLRadio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@gluestack-ui/themed'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

export type FormRadioProps = {
  formControlProps: FormControlProps
  options: RadioProps[]
  value: string
} & typeof RadioGroup.defaultProps

export const FormRadio = ({
  formControlProps,
  options,
  onChange,
  value,
  ...props
}: FormRadioProps) => {
  return (
    <FormControl {...formControlProps}>
      <RadioGroup {...props} value={value} onChange={onChange}>
        <Box display="flex" flexDirection="column" gap="$2">
          {options.map((opt) => (
            <Radio key={opt.value} {...opt} />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  )
}

type RadioProps = {
  label: string
  value: string
} & typeof GLRadio.defaultProps

const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <GLRadio {...props} gap="$2">
      <RadioIndicator>
        <RadioIcon as={CircleIcon} />
      </RadioIndicator>
      <RadioLabel flex={1}>{label}</RadioLabel>
    </GLRadio>
  )
}
