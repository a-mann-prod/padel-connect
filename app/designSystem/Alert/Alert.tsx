import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  ButtonGroup,
  Heading,
  Text,
} from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

import { Button } from '../Button/Button'

import { useTranslate } from '@/services/i18n'

export type AlertProps = {
  message?: string
  onContinueCallback: () => void
  onCancel: () => void
  isLoading?: boolean
} & typeof AlertDialog.defaultProps

export const Alert = ({
  message,
  onContinueCallback,
  onCancel,
  children,
  isLoading,
  ...props
}: PropsWithChildren<AlertProps>) => {
  const t = useTranslate()

  return (
    <AlertDialog {...props}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading size="lg">{t('warning')}</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          {children || <Text size="sm">{message}</Text>}
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup space="lg">
            <Button
              variant="outline"
              action="secondary"
              onPress={onCancel}
              title={t('cancel')}
            />
            <Button
              isLoading={isLoading}
              action="negative"
              onPress={onContinueCallback}
              title={t('continue')}
            />
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
