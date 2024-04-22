import { HStack, Switch, Text } from '@gluestack-ui/themed'

import { FormControl, FormControlProps } from '../FormControl/FormControl'

export type FormSwitchProps = {
  formControlProps: FormControlProps
} & typeof Switch.defaultProps

export const FormSwitch = ({
  formControlProps: { title, ...formControlProps },
  ...props
}: FormSwitchProps) => {
  return (
    <FormControl {...formControlProps}>
      <HStack gap="$3" alignItems="center">
        <Switch my="$1" {...props} />
        <Text>{title}</Text>
      </HStack>
    </FormControl>
  )
}
