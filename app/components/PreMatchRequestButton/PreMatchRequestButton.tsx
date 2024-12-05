import { router } from 'expo-router'

import { Button, ButtonProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export type PreMatchRequestButtonProps = {
  isRequesting: boolean
  matchId: number
} & Pick<ButtonProps, 'isLoading' | 'isDisabled'>

export const PreMatchRequestButton = ({
  isRequesting,
  matchId,
  ...props
}: PreMatchRequestButtonProps) => {
  const t = useTranslate('match')

  return (
    <Button
      title={t(isRequesting ? 'seeRequest' : 'joinRequest')}
      icon={isRequesting ? 'FAS-eye' : 'FAS-handshake'}
      iconRight={isRequesting}
      onPress={() =>
        router.navigate(
          isRequesting
            ? routing.matchManageRequest.path(matchId)
            : routing.matchJoinRequest.path(matchId)
        )
      }
      action="primary"
      {...props}
    />
  )
}
