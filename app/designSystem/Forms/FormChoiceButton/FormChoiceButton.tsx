import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { Icon, IconNameProp, IconProps } from '@/designSystem/Icon/Icon'
import { isNilOrEmpty } from '@/utils/global'
import { when } from '@/utils/when'

type CheckboxGroupProps = ComponentProps<typeof CheckboxGroup>

export type FormChoiceButtonProps<TSingle extends boolean> = {
  formControlProps: FormControlProps
  options: ChoiceButtonProps[]
  value: TSingle extends boolean ? string : string[]
  single?: TSingle
} & CheckboxGroupProps

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
            <ChoiceButton
              key={opt.value}
              {...opt}
              customChecked={transformValue(value).includes(opt.value)}
            />
          ))}
        </Box>
      </CheckboxGroup>
    </FormControl>
  )
}

type CheckboxProps = ComponentProps<typeof Checkbox>

export type ChoiceButtonProps = {
  label: string
  value: string
  icon?: IconNameProp
  iconProps?: IconProps
  customChecked?: boolean
} & CheckboxProps

const ChoiceButton = ({
  label,
  icon,
  iconProps,
  customChecked, // TODO: find a better way to know if it's checked (to change icon color)
  ...props
}: ChoiceButtonProps) => {
  const iconColorProps = customChecked
    ? {
        color: '$primary500',
      }
    : {
        '$light-color': '$textLight600',
        '$dark-color': '$textDark400',
      }
  return (
    <Checkbox {...props} aria-label={label} flex={1}>
      <CheckboxIndicator
        w="$full"
        h="auto"
        $checked-bgColor="unset"
        $checked-borderColor="$primary500"
        $active-borderColor="$primary600"
      >
        {icon && (
          <Icon
            px="$3"
            pt="$3"
            pb="$1"
            size="xl"
            name={icon}
            $invalid-color="$error700"
            {...iconColorProps}
            {...iconProps}
          />
        )}
        <CheckboxLabel
          $checked-color="$primary500"
          $active-color="$primary600"
          $invalid-color="$error700"
          pb={when(!!icon, '$2')}
        >
          {label}
        </CheckboxLabel>
      </CheckboxIndicator>
    </Checkbox>
  )
}
