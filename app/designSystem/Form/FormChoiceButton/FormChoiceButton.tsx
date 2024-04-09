import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { isNilOrEmpty } from '@/utils/global'

export type FormChoiceButtonProps<TSingle extends boolean> = {
  formControlProps: FormControlProps
  options: ChoiceButtonProps[]
  value: TSingle extends boolean ? string : string[]
  single?: TSingle
} & typeof CheckboxGroup.defaultProps

export const FormChoiceButton = <TSingle extends boolean>({
  formControlProps,
  options,
  single,
  onChange,
  value,
  ...props
}: FormChoiceButtonProps<TSingle>) => {
  const handleOnChange = (selectedItems: string[]) => {
    if (single) {
      const lastSelectedItem = selectedItems.pop()
      onChange?.(lastSelectedItem || '')
      return
    }

    onChange?.(selectedItems)
  }

  const transformValue = (curr: string | string[]): string[] => {
    if (isNilOrEmpty(curr)) {
      return []
    }

    if (!Array.isArray(curr)) {
      return [curr]
    }

    return curr
  }

  return (
    <FormControl {...formControlProps}>
      <CheckboxGroup
        {...props}
        value={transformValue(value)}
        onChange={handleOnChange}
      >
        <Box display="flex" flexDirection="row" gap={5}>
          {options.map((opt) => (
            <ChoiceButton key={opt.value} {...opt} />
          ))}
        </Box>
      </CheckboxGroup>
    </FormControl>
  )
}

type ChoiceButtonProps = {
  label: string
  value: string
} & typeof Checkbox.defaultProps

const ChoiceButton = ({ label, ...props }: ChoiceButtonProps) => {
  return (
    <Checkbox {...props} aria-label={label} flex={1}>
      <CheckboxIndicator
        w="$full"
        h="auto"
        $checked-bgColor="unset"
        $checked-borderColor="$primary500"
        $active-borderColor="$primary600"
      >
        <CheckboxLabel
          $checked-color="$primary500"
          $active-color="$primary600"
          $invalid-color="$error700"
        >
          {label}
        </CheckboxLabel>
      </CheckboxIndicator>
    </Checkbox>
  )
}
