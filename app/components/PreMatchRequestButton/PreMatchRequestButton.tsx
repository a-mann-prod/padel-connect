import { Button, ButtonProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export type PreMatchRequestButtonProps = {
  isRequesting: boolean
  onPress: ButtonProps['onPress']
} & Pick<ButtonProps, 'isLoading' | 'isDisabled'>

export const PreMatchRequestButton = ({
  isRequesting,
  onPress,
  ...props
}: PreMatchRequestButtonProps) => {
  const t = useTranslate('match')

  return (
    <Button
      title={t(isRequesting ? 'seeRequest' : 'joinRequest')}
      icon={isRequesting ? 'FAS-eye' : 'FAS-handshake'}
      iconRight={isRequesting}
      onPress={onPress}
      action="primary"
      {...props}
    />
  )
}
