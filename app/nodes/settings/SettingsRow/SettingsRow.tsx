import { Box, HStack, Pressable, Text } from '@gluestack-ui/themed'
import { ReactNode, useState } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Actionsheet, ActionsheetProps, Icon, IconProps } from '@/designSystem'
import { Config } from '@/services/theme/gluestack-ui/gluestack-ui.config'
import { when } from '@/utils/when'

export type SettingsRowProps = {
  title: string
  icon: IconProps['name']
  iconColor?: keyof Config['tokens']['colors']
  onPress?: typeof Pressable.defaultProps.onPress
  rightComponent?: () => ReactNode
  isDisabled?: boolean
  isHidden?: boolean

  onChange?: ActionsheetProps['onChange']
  items?: ActionsheetProps['items']
}

export const SettingsRow = ({
  title,
  icon,
  iconColor,
  onPress,
  rightComponent,
  isDisabled,
  isHidden,

  onChange,
  items,
}: SettingsRowProps) => {
  const [showActionsheet, setShowActionsheet] = useState(false)

  const handleOnPress = (event: GestureResponderEvent) =>
    onChange ? setShowActionsheet(true) : onPress?.(event)

  const isActive = (!!onPress || !!onChange) && !isDisabled

  if (isHidden) return

  return (
    <Pressable disabled={!isActive} onPress={handleOnPress} bgColor="amber.400">
      <HStack h="$10" alignItems="center" opacity={when(isDisabled, 0.5)}>
        <HStack flexGrow={1} alignItems="center">
          <Box w="$8" backgroundColor="">
            <Icon name={icon} size="md" color={iconColor} />
          </Box>
          <Text fontSize="$md">{title}</Text>
        </HStack>
        {rightComponent?.()}
      </HStack>
      {onChange && items && (
        <Actionsheet
          isOpen={showActionsheet}
          onChange={onChange}
          onClose={() => setShowActionsheet(false)}
          items={items}
        />
      )}
    </Pressable>
  )
}
