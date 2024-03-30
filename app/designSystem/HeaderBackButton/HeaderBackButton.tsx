import {
  HeaderBackButton as RNHeaderBackButton,
  HeaderBackButtonProps as RNHeaderBackButtonProps,
} from '@react-navigation/elements'
import { router } from 'expo-router'

import {
  HeaderButtonContainer,
  HeaderButtonContainerProps,
} from '../HeaderButtonContainer/HeaderButtonContainer'

export type HeaderBackButtonProps = RNHeaderBackButtonProps &
  HeaderButtonContainerProps

export const HeaderBackButton = ({
  canGoBack,
  isInModal,
}: HeaderBackButtonProps) => {
  if (!canGoBack) return undefined

  return (
    <HeaderButtonContainer isInModal={isInModal}>
      <RNHeaderBackButton onPress={router.back} />
    </HeaderButtonContainer>
  )
}
