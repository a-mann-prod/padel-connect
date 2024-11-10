import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useUpdateMeProfile } from '@/services/api'
import { useTranslate } from '@/services/i18n'

export default () => {
  const t = useTranslate('onboarding', { keyPrefix: 'getStarted' })
  const tGlobal = useTranslate()

  const { personalInfo, avatar, level, notificationAlerts } =
    useOnboardingContext()

  const { mutate: updateMe, isPending: isPendingUpdateMe } = useUpdateMeProfile(
    {
      options: {
        onSuccess: async () => {
          router.replace('/')
        },
        onError: (e: any) => console.log(e),
      },
    }
  )

  // gerer avatar via formdata
  const onSubmit = async () =>
    updateMe({
      ...personalInfo,
      ...level,
      ...notificationAlerts,
      ...avatar,
      is_onboarding_completed: true,
    })

  return (
    <VStack gap="$2" m="$5">
      <Text>{t('subtitle')}</Text>
      <Button
        title={tGlobal('letsGo')}
        onPress={onSubmit}
        isLoading={isPendingUpdateMe}
      />
    </VStack>
  )
}
