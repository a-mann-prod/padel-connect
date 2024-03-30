import { HeaderBackButtonProps as RNHeaderBackButtonProps } from '@react-navigation/elements'
import { router } from 'expo-router'

import {
  HeaderButtonContainer,
  HeaderButtonContainerProps,
} from '../HeaderButtonContainer/HeaderButtonContainer'
import { IconButton } from '../IconButton/IconButton'

export type HeaderCloseButtonProps = RNHeaderBackButtonProps &
  HeaderButtonContainerProps

export const HeaderCloseButton = ({
  tintColor,
  isInModal,
}: HeaderCloseButtonProps) => (
  <HeaderButtonContainer isInModal={isInModal}>
    <IconButton
      marginHorizontal="$3"
      variant="headerIcon"
      icon="circle-xmark"
      iconProps={{ color: tintColor, size: 'lg' }}
      onPress={() => router.navigate('/')}
    />
  </HeaderButtonContainer>
)
