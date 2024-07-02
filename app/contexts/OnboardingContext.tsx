import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import { NotificationAlertsFormValues } from '@/components'
import { AvatarFormValues } from '@/components/Forms/AvatarForm/AvatarForm.services'
import { FiltersFormValues } from '@/components/Forms/FiltersForm/FiltersForm.services'
import { PersonalInfoFormValues } from '@/components/Forms/PersonalInfoForm/PersonalInfoForm.services'
import { PreferencesFormValues } from '@/components/Forms/PreferencesForm/PreferencesForm.services'
import { buildContext } from '@/services/buildContext'
import { Level } from '@/utils/level'

type OnboardingContextProps = {
  personalInfo: PersonalInfoFormValues | undefined
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfoFormValues | undefined>>
  avatar: AvatarFormValues | undefined
  setAvatar: Dispatch<SetStateAction<AvatarFormValues | undefined>>
  preferences: PreferencesFormValues | undefined
  setPreferences: Dispatch<SetStateAction<PreferencesFormValues | undefined>>
  level: Level | undefined
  setLevel: Dispatch<SetStateAction<Level | undefined>>
  notificationAlerts: NotificationAlertsFormValues | undefined
  setNotificationAlerts: Dispatch<
    SetStateAction<NotificationAlertsFormValues | undefined>
  >
  filters: FiltersFormValues | undefined
  setFilters: Dispatch<SetStateAction<FiltersFormValues | undefined>>
}

const [_, Provider, useOnboardingContext] =
  buildContext<OnboardingContextProps>('OnboardingContext')

export { useOnboardingContext }

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormValues>()
  const [avatar, setAvatar] = useState<AvatarFormValues>()
  const [preferences, setPreferences] = useState<PreferencesFormValues>()
  const [level, setLevel] = useState<Level>()
  const [notificationAlerts, setNotificationAlerts] =
    useState<NotificationAlertsFormValues>()
  const [filters, setFilters] = useState<FiltersFormValues>()

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
        notificationAlerts,
        setNotificationAlerts,
        filters,
        setFilters,
      }}
    >
      {children}
    </Provider>
  )
}
