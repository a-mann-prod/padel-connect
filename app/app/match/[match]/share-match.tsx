import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { useState } from 'react'

import { SearchUser } from '@/components'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate('match')
  const [userIds, setUserIds] = useState<number[]>([])

  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} m="$3">
        <SearchUser
          selectedUserIds={userIds}
          onPress={() => console.log('test')}
          onSelectButtonPress={(id) =>
            setUserIds((prev) => {
              const index = prev.indexOf(id)
              if (index !== -1) {
                return [...prev.slice(0, index), ...prev.slice(index + 1)]
              }

              return [...prev, id]
            })
          }
        />

        <Button
          title={t('shareMatch')}
          isDisabled={!userIds.length}
          // onPress={() => createMatch()}
          // TODO: ADD SHARE
          // isLoading={isPendingCreateMatch}
        />
      </VStack>
    </SafeAreaView>
  )
}
