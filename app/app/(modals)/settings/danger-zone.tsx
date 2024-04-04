import { VStack } from '@gluestack-ui/themed'

import { useOverlayStore } from '@/app/store'
import { Button } from '@/designSystem'
import { useDeleteMe } from '@/hooks/useDeleteMe'
import { useTranslate } from '@/services/i18n'

// TODO : type password to self delete
export default () => {
  const t = useTranslate('settings')
  const { show } = useOverlayStore()

  const { mutate, isPending } = useDeleteMe()

  const handleOnPress = () =>
    show('alert', {
      message: t('deleteAccountWarningMessage'),
      onContinueCallback: mutate,
    })

  return (
    <VStack gap="$3" m="$5">
      <Button
        icon="FAS-trash"
        title={t('general.deleteAccount')}
        action="negative"
        onPress={handleOnPress}
        isLoading={isPending}
      />
    </VStack>
  )
}
