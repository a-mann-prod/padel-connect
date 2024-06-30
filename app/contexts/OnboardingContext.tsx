import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import { PersonalInfoFormValues } from '@/components/Forms/PersonalInfoForm/PersonalInfoForm.services'
import { PreferencesFormValues } from '@/components/Forms/PreferencesForm/PreferencesForm.services'
import { AvatarFormValues } from '@/nodes/onboarding/AvatarForm/AvatarForm.services'
import { buildContext } from '@/services/buildContext'
import { Level } from '@/utils/levelEstimation'

type OnboardingContextProps = {
  personalInfo: PersonalInfoFormValues | undefined
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfoFormValues | undefined>>
  avatar: AvatarFormValues | undefined
  setAvatar: Dispatch<SetStateAction<AvatarFormValues | undefined>>
  preferences: PreferencesFormValues | undefined
  setPreferences: Dispatch<SetStateAction<PreferencesFormValues | undefined>>
  level: Level | undefined
  setLevel: Dispatch<SetStateAction<Level | undefined>>
}

const [_, Provider, useOnboardingContext] =
  buildContext<OnboardingContextProps>('OnboardingContext')

export { useOnboardingContext }

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormValues>()
  const [avatar, setAvatar] = useState<AvatarFormValues>()
  const [preferences, setPreferences] = useState<PreferencesFormValues>()
  const [level, setLevel] = useState<Level>()

  return (
    <Provider
      value={{
        personalInfo,
        setPersonalInfo,
        avatar,
        setAvatar,
        preferences,
        setPreferences,
        level,
        setLevel,
      }}
    >
      {children}
    </Provider>
  )
}
