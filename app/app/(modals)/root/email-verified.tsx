import { SafeAreaView, Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { WithoutAuth } from '@/components'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithoutAuth(() => {
  const t = useTranslate('auth')

  return (
    <SafeAreaView>
      <VStack gap="$2" m="$5">
        <Text>{t('emailVerified.subTitle')}</Text>
        <Button
          title={t('login')}
          onPress={() => router.replace(routing.authLogin.path())}
        />
      </VStack>
    </SafeAreaView>
  )
})
