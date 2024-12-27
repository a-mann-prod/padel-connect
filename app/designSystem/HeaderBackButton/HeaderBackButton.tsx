import { useToken } from '@gluestack-style/react'
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
  HeaderButtonContainerProps & { canGoBack?: boolean }

export const HeaderBackButton = ({
  canGoBack,
  isInModal,
}: HeaderBackButtonProps) => {
  const t = useTranslate()
  const color = useToken('colors', 'primary500')
  if (!canGoBack) return undefined

  return (
    <HeaderButtonContainer isInModal={isInModal}>
      <RNHeaderBackButton
        onPress={router.back}
        label={t('back')}
        tintColor={color}
      />
    </HeaderButtonContainer>
  )
}
