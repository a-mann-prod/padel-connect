import { Button, ButtonProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export type MatchRequestButtonProps = {
  isRequesting: boolean
  onPress: ButtonProps['onPress']
  onCancelPress: ButtonProps['onPress']
} & Pick<ButtonProps, 'isLoading'>

export const MatchRequestButton = ({
  isRequesting,
  onPress,
  onCancelPress,
  ...props
}: MatchRequestButtonProps) => {
  const t = useTranslate('play')

  return (
    <Button
      title={t(isRequesting ? 'cancelRequest' : 'joinRequest')}
      icon={isRequesting ? 'FAS-ban' : 'FAS-handshake'}
      iconRight={isRequesting}
      onPress={isRequesting ? onCancelPress : onPress}
      action={isRequesting ? 'negative' : 'primary'}
      {...props}
    />
  )
}
