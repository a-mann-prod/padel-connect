import { HeaderBackButtonProps as RNHeaderBackButtonProps } from '@react-navigation/elements'
import { router } from 'expo-router'

import {
  HeaderButtonContainer,
  HeaderButtonContainerProps,
} from '../HeaderButtonContainer/HeaderButtonContainer'
import { IconButton } from '../IconButton/IconButton'

export type HeaderCloseButtonProps = RNHeaderBackButtonProps &
  HeaderButtonContainerProps

export const HeaderCloseButton = ({ isInModal }: HeaderCloseButtonProps) => (
  <HeaderButtonContainer isInModal={isInModal}>
    <IconButton
      variant="header"
      icon="FAR-circle-xmark"
      iconProps={{ size: 'md' }}
      onPress={() => router.navigate('/')}
    />
  </HeaderButtonContainer>
)
