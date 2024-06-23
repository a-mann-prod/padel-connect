import { VStack } from '@gluestack-ui/themed'

import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { useOverlayStore } from '@/services/overlaysStore'

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
