import { useController } from 'react-hook-form'

import {
  FormDateTimePicker,
  FormDateTimePickerProps,
} from '@/designSystem/Forms'
import { date } from '@/services/date'

export type FormDateTimePickerControlledProps = {
  name: string
} & Omit<FormDateTimePickerProps, 'value' | 'onChange'>

export const FormDateTimePickerControlled = ({
  name,
  formControlProps,
  ...props
}: FormDateTimePickerControlledProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name })

  return (
    <FormDateTimePicker
      formControlProps={{ ...formControlProps, error }}
      onChange={(value: Date | undefined) =>
        onChange(date.dayjs(value).toISOString())
      }
      value={date.dayjs(value).toDate()}
      {...props}
    />
  )
}
