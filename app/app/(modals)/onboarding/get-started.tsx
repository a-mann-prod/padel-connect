import { Text, VStack } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { v4 as uuid } from 'uuid'

import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useUpdateProfileWithAvatar } from '@/hooks/useUpdateProfileWithAvatar'
import { useTranslate } from '@/services/i18n'
import { FileExtension, MimeType, getFileExtension } from '@/utils/file'

export default () => {
  const t = useTranslate('onboarding', { keyPrefix: 'getStarted' })
  const tGlobal = useTranslate()

  const { mutateAsync, isPending } = useUpdateProfileWithAvatar({
    onSuccess: () => router.replace('/'),
  })
  const { personalInfo, avatar } = useOnboardingContext()

  const onSubmit = async () => {
    let avatarFile

    // TODO: refacto this code, will be used in another file
    if (avatar?.avatar) {
      const arrayBuffer = await fetch(avatar.avatar.uri).then((res) =>
        res.arrayBuffer()
      )
      const fileExt = getFileExtension(
        FileExtension.JPEG,
        avatar.avatar.fileName
      )

      avatarFile = {
        files: [
          {
            data: arrayBuffer,
            type: avatar.avatar.mimeType ?? MimeType.JPEG,
            name: `${uuid()}.${fileExt}`,
          },
        ],
      }
    }
    mutateAsync({
      avatarFile,
      ...personalInfo,
      is_onboarding_completed: true,
    })
  }

  return (
    <VStack gap="$2" mx="$5">
      <Text>{t('subtitle')}</Text>
      <Button
        title={tGlobal('letsGo')}
        onPress={onSubmit}
        isLoading={isPending}
      />
    </VStack>
  )
}
