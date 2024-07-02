import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

type CheckboxProps = ComponentProps<typeof Checkbox>

export type FormCheckboxProps = {
  formControlProps: FormControlProps
} & CheckboxProps

export const FormCheckbox = ({
  formControlProps: { title, ...formControlProps },
  ...props
}: FormCheckboxProps) => {
  return (
    <FormControl {...formControlProps}>
      <HStack gap="$3" alignItems="center">
        <Checkbox {...props} aria-label="checkbox">
          <CheckboxIndicator mr="$3">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel flex={1}>{title}</CheckboxLabel>
        </Checkbox>
      </HStack>
    </FormControl>
  )
}
