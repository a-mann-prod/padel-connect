import { Box, HStack, Text } from '@gluestack-ui/themed'
import { ReactNode, useState } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Actionsheet, ActionsheetProps } from '../Actionsheet/Actionsheet'
import { Icon, IconProps } from '../Icon/Icon'
import { Pressable, PressableProps } from '../Pressable/Pressable'

import { Config } from '@/services/theme/gluestack-ui/gluestack-ui.config'
import { when } from '@/utils/when'

export type SectionRowProps = {
  title: string
  icon: IconProps['name']
  iconColor?: keyof Config['tokens']['colors']
  onPress?: PressableProps['onPress']
  rightComponent?: () => ReactNode
  isDisabled?: boolean
  isHidden?: boolean

  onChange?: ActionsheetProps['onChange']
  items?: ActionsheetProps['items']
}

export const SectionRow = ({
  title,
  icon,
  iconColor,
  onPress,
  rightComponent,
  isDisabled,
  isHidden,

  onChange,
  items,
}: SectionRowProps) => {
  const [showActionsheet, setShowActionsheet] = useState(false)

  const handleOnPress = (event: GestureResponderEvent) =>
    onChange ? setShowActionsheet(true) : onPress?.(event)

  const isActive = (!!onPress || !!onChange) && !isDisabled

  if (isHidden) return

  return (
    <Pressable disabled={!isActive} onPress={handleOnPress}>
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