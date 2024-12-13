import { router } from 'expo-router'

import { Button, ButtonProps } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export type PreMatchRequestButtonProps = {
  isRequesting: boolean
  matchId: number
  inadaptedLevel: boolean
} & Pick<ButtonProps, 'isLoading' | 'isDisabled'>

export const PreMatchRequestButton = ({
  isRequesting,
  matchId,
  inadaptedLevel,
  ...props
}: PreMatchRequestButtonProps) => {
  const t = useTranslate('match')

  return (
    <Button
      title={`${t(isRequesting ? 'seeRequest' : 'joinRequest')} ${inadaptedLevel && !isRequesting ? t('inadaptedLevel') : ''}`}
      icon={isRequesting ? 'FAS-eye' : 'FAS-handshake'}
      iconRight={isRequesting}
      isDisabled={inadaptedLevel && !isRequesting}
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
