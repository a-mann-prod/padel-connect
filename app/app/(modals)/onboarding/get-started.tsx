import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useUpdateAvatarMe } from '@/hooks/useUpdateAvatarMe'
import { useUpdateMe } from '@/hooks/useUpdateMe'
import { useTranslate } from '@/services/i18n'
import { prepareFile } from '@/utils/file'

export default () => {
  const t = useTranslate('onboarding', { keyPrefix: 'getStarted' })
  const tGlobal = useTranslate()

  const { personalInfo, avatar, preferences } = useOnboardingContext()

  const { mutate: updateAvatarMe, isPending: isPendingUpdateAvatarMe } =
    useUpdateAvatarMe()
  const { mutate: updateMe, isPending: isPendingUpdateMe } = useUpdateMe({
    onSuccess: async () => {
      if (avatar?.avatar) {
        const file = await prepareFile(avatar?.avatar)
        updateAvatarMe(file)
      }
      router.replace('/')
    },
  })

  const onSubmit = async () =>
    updateMe({ ...personalInfo, ...preferences, is_onboarding_completed: true })

  return (
    <VStack gap="$2" m="$5">
      <Text>{t('subtitle')}</Text>
      <Button
        title={tGlobal('letsGo')}
        onPress={onSubmit}
        isLoading={isPendingUpdateAvatarMe || isPendingUpdateMe}
      />
    </VStack>
  )
}
