import { VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

import { AvatarFormValues, avatarFormServices } from './AvatarForm.services'

import { FormProvider } from '@/components'
import { FormAvatarControlled } from '@/components/FormAvatarControlled/FormInputControlled'
import { useOnboardingContext } from '@/contexts'
import { Button } from '@/designSystem'
import { useTranslate } from '@/services/i18n'

const { getDefaultValues, schema } = avatarFormServices

export const AvatarForm = () => {
  const tGlobal = useTranslate()
  const { avatar, setAvatar } = useOnboardingContext()

  const methods = useForm<AvatarFormValues>({
    defaultValues: getDefaultValues(avatar),
    resolver: zodResolver(schema),
  })

  const { handleSubmit } = methods

  const onSubmit = (avatar: AvatarFormValues) => {
    setAvatar(avatar)
    router.navigate('/(modals)/onboarding/get-started')
  }

  return (
    <>
      <VStack gap="$3">
        <FormProvider {...methods}>
          <FormAvatarControlled
            name="avatar"
            formControlProps={{
              title: tGlobal('avatar'),
            }}
          />
        </FormProvider>
      </VStack>
      <Button title={tGlobal('next')} onPress={handleSubmit(onSubmit)} />
    </>
  )
}
