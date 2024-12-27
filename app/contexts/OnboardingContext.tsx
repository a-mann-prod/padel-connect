import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import { NotificationAlertsFormValues } from '@/components'
import { AvatarFormValues } from '@/components/Forms/AvatarForm/AvatarForm.services'
import { FiltersFormValues } from '@/components/Forms/FiltersForm/FiltersForm.services'
import { PersonalInfoFormValues } from '@/components/Forms/PersonalInfoForm/PersonalInfoForm.services'
import { buildContext } from '@/services/buildContext'
import { Level } from '@/utils/level'

type OnboardingContextProps = {
  personalInfo: PersonalInfoFormValues | undefined
  setPersonalInfo: Dispatch<SetStateAction<PersonalInfoFormValues | undefined>>
  avatar: AvatarFormValues | undefined
  setAvatar: Dispatch<SetStateAction<AvatarFormValues | undefined>>
  level: Level | undefined
  setLevel: Dispatch<SetStateAction<Level | undefined>>
  notificationAlerts: NotificationAlertsFormValues | undefined
  setNotificationAlerts: Dispatch<
    SetStateAction<NotificationAlertsFormValues | undefined>
  >
  filters: FiltersFormValues | undefined
  setFilters: Dispatch<SetStateAction<FiltersFormValues | undefined>>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, Provider, useOnboardingContext] =
  buildContext<OnboardingContextProps>('OnboardingContext')

export { useOnboardingContext }

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoFormValues>()
  const [avatar, setAvatar] = useState<AvatarFormValues>()
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
