import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { AvatarFormValues } from '@/nodes/onboarding/AvatarForm/AvatarForm.services'
import { PersonalInfoFormValues } from '@/nodes/onboarding/PersonalInfoForm/PersonalInfoForm.services'
import { buildContext } from '@/services/buildContext'

type OnboardingContextProps = {
  personalInfo: PersonalInfoFormValues | undefined
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfoFormValues | undefined>>
  avatar: AvatarFormValues | undefined
  setAvatar: Dispatch<SetStateAction<AvatarFormValues | undefined>>
}

const [_, Provider, useOnboardingContext] =
  buildContext<OnboardingContextProps>('OnboardingContext')

export { useOnboardingContext }

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormValues>()
  const [avatar, setAvatar] = useState<AvatarFormValues>()

  return (
    <Provider
      value={{
        personalInfo,
        setPersonalInfo,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </Provider>
  )
}
