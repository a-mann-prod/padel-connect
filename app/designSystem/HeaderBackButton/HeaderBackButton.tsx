import {
  HeaderBackButton as RNHeaderBackButton,
  HeaderBackButtonProps as RNHeaderBackButtonProps,
} from '@react-navigation/elements'
import { router } from 'expo-router'

import {
  HeaderButtonContainer,
  HeaderButtonContainerProps,
} from '../HeaderButtonContainer/HeaderButtonContainer'

import { useTranslate } from '@/services/i18n'

export type HeaderBackButtonProps = RNHeaderBackButtonProps &
  HeaderButtonContainerProps

export const HeaderBackButton = ({
  canGoBack,
  isInModal,
}: HeaderBackButtonProps) => {
  const t = useTranslate()
  if (!canGoBack) return undefined

  return (
    <HeaderButtonContainer isInModal={isInModal}>
      <RNHeaderBackButton onPress={router.back} label={t('back')} />
    </HeaderButtonContainer>
  )
}
