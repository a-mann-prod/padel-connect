import { VStack } from '@gluestack-ui/themed'

import { useOverlayStore } from '@/app/store'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate('settings')
  const { show } = useOverlayStore()

  return (
    <VStack gap="$3" m="$5">
      <Button
        icon="FAS-trash"
        title={t('general.deleteAccount')}
        action="negative"
        onPress={() => show('selfDeleteAlert')}
      />
    </VStack>
  )
}
