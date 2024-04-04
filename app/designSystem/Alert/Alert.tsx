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

import { Button } from '../Button/Button'

import { OverlayWrapper } from '@/components/OverlayWrapper/OverlayWrapper'
import { useTranslate } from '@/services/i18n'

export type AlertProps = {
  message: string
  onContinueCallback: () => void
}

export const Alert = () => {
  const t = useTranslate()

  return (
    <OverlayWrapper overlayId="alert">
      {({ hide, props, isOpen }) => (
        <AlertDialog isOpen={isOpen} onClose={hide}>
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size="lg">{t('warning')}</Heading>
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text size="sm">{props?.message}</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup space="lg">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={hide}
                  title={t('cancel')}
                />
                <Button
                  action="negative"
                  onPress={() => {
                    props?.onContinueCallback()
                    hide()
                  }}
                  title={t('continue')}
                />
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </OverlayWrapper>
  )
}
