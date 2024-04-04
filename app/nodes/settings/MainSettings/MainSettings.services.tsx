import { Switch } from '@gluestack-ui/themed'
import { router } from 'expo-router'
import { useMemo } from 'react'
import { Platform } from 'react-native'

import { SettingsRowProps } from '../SettingsRow/SettingsRow'
import { SettingsSectionProps } from '../SettingsSection/SettingsSection'

import { useAuthContext } from '@/contexts'
import { Icon } from '@/designSystem'
import { useTranslate } from '@/services/i18n'
import { openUrl } from '@/utils/url'

export const SETTINGS_RACINE = '/(modals)/settings'

type SettingsSection = SettingsSectionProps & {
  rows: SettingsRowProps[]
}

export const useSettingsItems = () => {
  const t = useTranslate('settings')

  const { signOut } = useAuthContext()

  const items = useMemo<SettingsSection[]>(
    () => [
      {
        title: t('general.title'),
        rows: [
          {
            title: t('general.emailChange'),
            icon: 'FAS-at',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/email-change`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
          {
            title: t('general.passwordChange'),
            icon: 'FAS-key',
            onPress: () =>
              router.navigate(`${SETTINGS_RACINE}/password-change`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
          {
            title: t('general.updatePersonalInformation'),
            icon: 'FAR-id-badge',
            onPress: () =>
              router.navigate(`${SETTINGS_RACINE}/update-personal-information`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
          {
            title: t('general.biometricAuth'),
            icon: 'FAS-fingerprint',
            rightComponent: () => <Switch isDisabled />,
            isDisabled: true,
            isHidden: Platform.OS === 'web',
          },
        ],
      },
      {
        title: t('support.title'),
        rows: [
          {
            title: t('support.coffee'),
            icon: 'FAS-mug-hot',
            onPress: () =>
              process.env.EXPO_PUBLIC_KOFI_URL &&
              openUrl(process.env.EXPO_PUBLIC_KOFI_URL),
            rightComponent: () => (
              <Icon name="FAS-up-right-from-square" size="md" />
            ),
            isDisabled: !process.env.EXPO_PUBLIC_KOFI_URL,
          },
          {
            title: t('support.sendMessage'),
            icon: 'FAS-comment',
            onPress: () =>
              process.env.EXPO_PUBLIC_CONTACT_EMAIL_URL &&
              openUrl(process.env.EXPO_PUBLIC_CONTACT_EMAIL_URL),
            rightComponent: () => (
              <Icon name="FAS-up-right-from-square" size="md" />
            ),
            isDisabled: !process.env.EXPO_PUBLIC_CONTACT_EMAIL_URL,
          },
        ],
      },
      {
        title: t('legalInformation.title'),
        rows: [
          {
            title: t('legalInformation.termsOfUse'),
            icon: 'FAS-file-contract',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/terms-of-use`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
          {
            title: t('legalInformation.privacyPolicy'),
            icon: 'FAS-shield-halved',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/privacy-policy`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
        ],
      },
      {
        rows: [
          {
            title: t('dangerZone'),
            icon: 'FAS-radiation',
            iconColor: 'yellow500',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/danger-zone`),
            rightComponent: () => <Icon name="FAS-chevron-right" size="md" />,
          },
        ],
      },
      {
        rows: [
          {
            title: t('logout'),
            icon: 'FAS-power-off',
            iconColor: 'red500',
            onPress: () => {
              signOut()
              router.replace('/')
            },
          },
        ],
      },
    ],
    [signOut, t]
  )
  return { items }
}
