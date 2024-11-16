import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'

import { FiltersFormServices } from '@/components/Forms/FiltersForm/FiltersForm.services'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import {
  useUpdateMatchFilters,
  useUpdateMe,
  useUpdateMeAvatar,
  useUpdateMeProfile,
} from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { prepareFile } from '@/utils/file'

export default () => {
  const t = useTranslate('onboarding', { keyPrefix: 'getStarted' })
  const tGlobal = useTranslate()

  const { formatToParams } = FiltersFormServices

  const { personalInfo, avatar, level, notificationAlerts, filters } =
    useOnboardingContext()

  const { mutateAsync: updateMe, isPending: isPendingUpdateMe } = useUpdateMe()

  const { mutateAsync: updateMatchFilters, isPending: isPendingMatchFilters } =
    useUpdateMatchFilters()

  const { mutateAsync: updateAvatarMe, isPending: isPendingUpdateAvatarMe } =
    useUpdateMeAvatar({
      options: {
        onSuccess: () => {
          updateMe({ is_onboarding_completed: true })
        },
      },
    })

  const { mutateAsync: updateMeProfile, isPending: isPendingUpdateMeProfile } =
    useUpdateMeProfile()

  const onSubmit = async () => {
    const promises = [
      updateMeProfile({
        ...personalInfo,
        ...level,
        ...notificationAlerts,
      }),
      updateMe({ is_onboarding_completed: true }),
      ...(filters ? [updateMatchFilters(formatToParams(filters))] : []),
      ...(avatar?.avatar
        ? [updateAvatarMe(await prepareFile(avatar.avatar))]
        : []),
    ]

    Promise.all(promises).then(() => router.replace('/'))
  }

  return (
    <VStack gap="$2" m="$5">
      <Text>{t('subtitle')}</Text>
      <Button
        title={tGlobal('letsGo')}
        onPress={onSubmit}
        isLoading={
          isPendingUpdateMe ||
          isPendingUpdateMeProfile ||
          isPendingUpdateAvatarMe ||
          isPendingMatchFilters
        }
      />
    </VStack>
  )
}
