import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren } from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

import { FontAwesome } from '@/designSystem/Icon/FontAwesome/FontAwesome'
import { isNilOrEmpty } from '@/utils/global'
import { when } from '@/utils/when'

type SelectProps = ComponentProps<typeof Select>

type SelectItemProps = Omit<ComponentProps<typeof SelectItem>, 'value'>

type SelectItemsProps = SelectItemProps & {
  label: string
  value: string
}

export type FormSelectProps = {
  displayPlaceHolder?: boolean
  formControlProps: FormControlProps
  items: SelectItemsProps[]
  value?: string
} & SelectProps

export const FormSelect = ({
  displayPlaceHolder = false,
  formControlProps,
  items,
  value,
  ...props
}: FormSelectProps) => {
  return (
    <FormControl {...formControlProps}>
      <Select
        {...props}
        selectedValue={
          Platform.OS !== 'web'
            ? value
            : !isNilOrEmpty(value)
              ? value
              : undefined
        }
      >
        <SelectTrigger>
          <SelectInput
            placeholder={when(displayPlaceHolder, formControlProps.title)}
            value={items.find((i) => i.value === value)?.label || ''}
          />
          <SelectIcon
            px="$2"
            w={null}
            h={null}
            as={(iconProps: any) => (
              <FontAwesome {...iconProps} name="FAS-chevron-down" />
            )}
          />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectItemsContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {items.map(({ value, ...item }) => (
              <SelectItem key={item.label} value={value} {...item} />
            ))}
          </SelectItemsContent>
        </SelectPortal>
      </Select>
    </FormControl>
  )
}

const SelectItemsContent = ({ children }: PropsWithChildren) => {
  if (Platform.OS !== 'web') {
    return (
      <SelectContent>
        <SafeAreaView
          style={{ width: '100%', paddingTop: 0 }}
          edges={['bottom']}
          mode="padding"
        >
          {children}
        </SafeAreaView>
      </SelectContent>
    )
  }

  return <SelectContent>{children}</SelectContent>
}
