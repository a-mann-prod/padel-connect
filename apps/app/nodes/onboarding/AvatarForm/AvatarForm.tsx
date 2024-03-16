import { FormAvatarControlled } from '@/components/FormAvatarControlled/FormInputControlled'
import { useAuthContext, useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useHandleError } from '@/hooks/useHandleError'
import { useUpdateProfile } from '@/services/api'
import { useSaveImage } from '@/services/api/image'
import { useTranslate } from '@/services/i18n'
import { FileExtension, MimeType, getFileExtension } from '@/utils/file'
import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { AvatarFormValues, avatarFormServices } from './AvatarForm.services'

const { getDefaultValues, schema } = avatarFormServices

export const AvatarForm = () => {
  const tGlobal = useTranslate()
  const { personalInfo, avatar, setAvatar } = useOnboardingContext()
  const { user } = useAuthContext()
  const { mutate: updateProfile, isPending } = useUpdateProfile({
    onSuccess: () => router.replace('/'),
  })

  const onError = useHandleError()
  const { mutate: saveAvatar, isPending: isPendingAvatar } = useSaveImage({
    storageType: 'avatars',
    onSuccess: (data) => onFinish(data[0]?.data?.path),
    onError,
  })

  const onFinish = (avatar_url?: string) => {
    updateProfile({
      id: user?.id,
      ...personalInfo,
      is_onboarding_completed: true,
      avatar_url,
    })
  }

  const methods = useForm<AvatarFormValues>({
    defaultValues: getDefaultValues(avatar),
    resolver: zodResolver(schema),
  })

  const { handleSubmit, watch } = methods

  const currentAvatar = watch('avatar')

  useEffect(() => {
    setAvatar({ avatar: currentAvatar })
  }, [currentAvatar])

  const onSubmit = async ({ avatar }: AvatarFormValues) => {
    if (avatar) {
      console.log(personalInfo, avatar)

      // TODO: refacto this code, will be used in another file
      const arrayBuffer = await fetch(avatar.uri).then((res) =>
        res.arrayBuffer()
      )
      const fileExt = getFileExtension(FileExtension.JPEG, avatar.fileName)

      saveAvatar({
        files: [
          {
            data: arrayBuffer,
            type: avatar.mimeType ?? MimeType.JPEG,
            name: `${uuid()}.${fileExt}`,
          },
        ],
      })
    }
  }

  return (
    <Fragment>
      <VStack space="md">
        <FormProvider {...methods}>
          <FormAvatarControlled
            name="avatar"
            formControlProps={{
              title: tGlobal('avatar'),
            }}
          />
        </FormProvider>
      </VStack>
      <Button
        title={tGlobal('save')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isPending || isPendingAvatar}
      />
      <Button title={'test'} onPress={() => onFinish()} isLoading={isPending} />
    </Fragment>
  )
}
