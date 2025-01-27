import { HStack, useColorMode } from '@gluestack-ui/themed'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { Platform } from 'react-native'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { useI18N } from '@/services/i18n'

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
  const colorMode = useColorMode() || 'light'
  const { language } = useI18N()

  const sharedStyle = {
    marginLeft: -10,
  }

  const sharedProps = {
    locale: language,
    value,
    onChange: (_: DateTimePickerEvent, value: Date | undefined) =>
      onChange(value),
    themeVariant: colorMode,
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
          minuteInterval={30}
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
