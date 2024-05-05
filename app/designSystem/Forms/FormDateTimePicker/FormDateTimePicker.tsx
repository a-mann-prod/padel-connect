import { HStack } from '@gluestack-ui/themed'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'

import { FormControl, FormControlProps } from '../FormControl/FormControl'
import { formDateTimePickerServices } from './FormDateTimePicker.services'

import { useI18N } from '@/services/i18n'

const { formatWithMinuteInterval } = formDateTimePickerServices

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
  ...props
}: FormDateTimePickerProps) => {
  const { language } = useI18N()

  const sharedStyle = {
    marginLeft: -10,
  }

  const sharedProps = {
    locale: language,
    value: formatWithMinuteInterval(value),
    onChange: (_: DateTimePickerEvent, value: Date | undefined) =>
      onChange(value),
  }

  return (
    <FormControl {...formControlProps}>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          {...props}
          {...sharedProps}
          mode="datetime"
          style={{
            ...sharedStyle,
            alignSelf: 'flex-start',
          }}
          minuteInterval={15}
        />
      ) : (
        <HStack gap="$3">
          <DateTimePicker
            {...props}
            {...sharedProps}
            mode="date"
            style={sharedStyle}
          />
          <DateTimePicker
            {...props}
            {...sharedProps}
            mode="time"
            style={sharedStyle}
          />
        </HStack>
      )}
    </FormControl>
  )
}
