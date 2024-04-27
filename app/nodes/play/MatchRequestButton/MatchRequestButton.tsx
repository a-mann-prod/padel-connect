import { Button, ButtonProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export type MatchRequestButtonProps = {
  isRequesting: boolean
  onPress: ButtonProps['onPress']
} & Pick<ButtonProps, 'isLoading'>

export const MatchRequestButton = ({
  isRequesting,
  onPress,
}: MatchRequestButtonProps) => {
  const t = useTranslate('play')

  return (
    <Button
      title={t(isRequesting ? 'joinRequestSent' : 'joinRequest')}
      icon={isRequesting ? 'FAS-check' : 'FAS-handshake'}
      iconRight={isRequesting}
      isDisabled={isRequesting}
      onPress={onPress}
    />
  )
}
