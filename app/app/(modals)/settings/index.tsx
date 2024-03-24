import { Text, VStack } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native'

import { WithAuth } from '@/components'
import { useAuthContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

export default WithAuth(() => {
  const t = useTranslate('auth')
  const { signOut, isLoadingSignOut } = useAuthContext()

  return (
    <SafeAreaView>
      <VStack gap="$2" mx="$5">
        <Text>Welcome dans les reglages</Text>
        <Button
          title="Log out"
          onPress={signOut}
          isLoading={isLoadingSignOut}
        />
      </VStack>
    </SafeAreaView>
  )
})
