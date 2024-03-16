import { WithoutAuth } from '@/components'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { SafeAreaView, Text, VStack } from '@gluestack-ui/themed'
import { Link } from 'expo-router'

export default WithoutAuth(() => {
  const t = useTranslate('auth')

  return (
    <SafeAreaView>
      <VStack space="md" m="$5">
        <Text>{t('emailVerified.subTitle')}</Text>
        <Link asChild href="/(modals)/auth/login" replace>
          <Button title={t('login')} />
        </Link>
      </VStack>
    </SafeAreaView>
  )
})
