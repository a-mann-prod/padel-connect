import { HStack, Input, InputField } from '@gluestack-ui/themed'

import { date } from '@/services/date'
import { forwardRef } from 'react'
import { FormControl, FormControlProps } from '../FormControl/FormControl'

type DateTimePickerProps = {
  locale?: string
  minimumDate?: Date
}

export type FormDateTimePickerProps = {
  formControlProps: FormControlProps
  value: Date
  onChange: (value: Date | undefined) => void
} & DateTimePickerProps

export const FormDateTimePicker = ({
  formControlProps,
  onChange,
  value,
}: FormDateTimePickerProps) => {
  const formattedDate = date.dayjs(value).format('YYYY-MM-DD')
  const formattedTime = date.dayjs(value).format('hh:mm')

  const handleInputProps = ({
    editable,
    accessibilityElementsHidden,
    accessible,
    placeholderTextColor,
    dataSet,
    secureTextEntry,
    ...props
  }: any) => {
    return {
      ...props,
      editable: editable.toString(),
      accessible: accessible.toString(),
      ref: undefined,
    }
  }

  return (
    <FormControl {...formControlProps}>
      <HStack gap="$3">
        <Input>
          <InputField
            value={formattedDate}
            as={forwardRef((innerProps, ref) => (
              <input
                {...handleInputProps(innerProps)}
                ref={ref}
                onChange={(e) =>
                  onChange(
                    date.dayjs(`${e.target.value}T${formattedTime}`).toDate()
                  )
                }
                type="date"
              />
            ))}
          />
        </Input>
        <Input>
          <InputField
            value={date.dayjs(value).format('HH:mm')}
            as={forwardRef((innerProps, ref) => (
              <input
                {...handleInputProps(innerProps)}
                ref={ref}
                onChange={(e) =>
                  onChange(
                    date.dayjs(`${formattedDate}T${e.target.value}`).toDate()
                  )
                }
                type="time"
              />
            ))}
          />
        </Input>
      </HStack>
    </FormControl>
  )
}
