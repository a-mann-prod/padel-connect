import { router } from 'expo-router'

import { Button, ButtonProps, IconNameProp } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export type PreMatchRequestButtonProps = {
  isRequesting: boolean
  hasMatchInvitations: boolean
  matchId: number
  inadaptedLevel: boolean | undefined
} & Pick<ButtonProps, 'isLoading' | 'isDisabled'>

export const PreMatchRequestButton = ({
  isRequesting,
  hasMatchInvitations,
  matchId,
  inadaptedLevel,
  ...props
}: PreMatchRequestButtonProps) => {
  const t = useTranslate('match')

  const hasSomething = isRequesting || hasMatchInvitations

  const getIcon = (): IconNameProp => {
    if (isRequesting) return 'FAS-eye'

    if (hasMatchInvitations) return 'FAS-envelope-open-text'
    return 'FAS-handshake'
  }

  const getTitle = () => {
    let title = t('joinRequest')

    if (hasMatchInvitations) title = t('seeInvitations')

    if (isRequesting) title = t('seeRequest')

    if (inadaptedLevel !== undefined && inadaptedLevel && !hasSomething)
      return `${title} ${t('inadaptedLevel')}`

    return title
  }

  const getPath = () => {
    if (isRequesting) return routing.matchManageRequest.path(matchId)

    if (hasMatchInvitations) return routing.matchManageInvitations.path(matchId)

    return routing.matchJoinRequest.path(matchId)
  }

  return (
    <Button
      title={getTitle()}
      icon={getIcon()}
      iconRight={isRequesting}
      isDisabled={
        inadaptedLevel !== undefined && inadaptedLevel && !hasSomething
      }
      onPress={() => router.navigate(getPath())}
      action="primary"
      {...props}
    />
  )
}
