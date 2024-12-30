import { Box, HStack, Text } from '@gluestack-ui/themed'
import { ReactNode, useState } from 'react'
import { GestureResponderEvent } from 'react-native'

import { Actionsheet, ActionsheetProps } from '../Actionsheet/Actionsheet'
import { Icon, IconNameProp } from '../Icon/Icon'
import { Loader } from '../Loader/Loader'
import { Pressable, PressableProps } from '../Pressable/Pressable'

import { Config } from '@/services/theme/gluestack-ui/gluestack-ui.config'
import { when } from '@/utils/when'

export type SectionRowProps = {
  title: string
  icon: IconNameProp
  iconColor?: keyof Config['tokens']['colors']
  onPress?: PressableProps['onPress']
  rightComponent?: () => ReactNode
  isDisabled?: boolean
  isHidden?: boolean
  isLoading?: boolean

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
  isLoading,

  onChange,
  items,
}: SectionRowProps) => {
  const [showActionsheet, setShowActionsheet] = useState(false)

  const handleOnPress = (event: GestureResponderEvent) =>
    onChange ? setShowActionsheet(true) : onPress?.(event)

  const isActive = (!!onPress || !!onChange) && !isDisabled

  if (isHidden) return

  return (
    <Pressable
      displayDisabledOpacity={false}
      isDisabled={!isActive}
      onPress={handleOnPress}
    >
      <HStack h="$10" alignItems="center" opacity={when(isDisabled, 0.5)}>
        <HStack flexGrow={1} alignItems="center">
          <Box w="$8" backgroundColor="">
            <Icon name={icon} size="md" color={iconColor} />
          </Box>
          {isLoading ? <Loader /> : <Text fontSize="$md">{title}</Text>}
        </HStack>
        {rightComponent?.()}
      </HStack>
      {onChange && items && (
        <Actionsheet
          isOpen={showActionsheet}
          onChange={(e) => {
            onChange(e)
            setShowActionsheet(false)
          }}
          onClose={() => setShowActionsheet(false)}
          items={items}
        />
      )}
    </Pressable>
  )
}
