import { Switch, Text } from '@gluestack-ui/themed'
import Constants from 'expo-constants'
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
            icon: 'at',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/email-change`),
            rightComponent: () => <Icon name="chevron-right" size="md" />,
          },
          {
            title: t('general.passwordChange'),
            icon: 'key',
            onPress: () =>
              router.navigate(`${SETTINGS_RACINE}/password-change`),
            rightComponent: () => <Icon name="chevron-right" size="md" />,
          },
          {
            title: t('general.biometricAuth'),
            icon: 'fingerprint',
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
            icon: 'mug-hot',
            onPress: () =>
              process.env.EXPO_PUBLIC_KOFI_URL &&
              openUrl(process.env.EXPO_PUBLIC_KOFI_URL),
            rightComponent: () => (
              <Icon name="up-right-from-square" size="md" />
            ),
            isDisabled: !process.env.EXPO_PUBLIC_KOFI_URL,
          },
          {
            title: t('support.sendMessage'),
            icon: 'comment',
            onPress: () =>
              process.env.EXPO_PUBLIC_CONTACT_EMAIL_URL &&
              openUrl(process.env.EXPO_PUBLIC_CONTACT_EMAIL_URL),
            rightComponent: () => (
              <Icon name="up-right-from-square" size="md" />
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
            icon: 'file-contract',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/terms-of-use`),
            rightComponent: () => <Icon name="chevron-right" size="md" />,
          },
          {
            title: t('legalInformation.privacyPolicy'),
            icon: 'shield-halved',
            onPress: () => router.navigate(`${SETTINGS_RACINE}/privacy-policy`),
            rightComponent: () => <Icon name="chevron-right" size="md" />,
          },
        ],
      },
      {
        title: t('tech.title'),
        rows: [
          {
            title: t('tech.version'),
            icon: 'code-merge',
            rightComponent: () => <Text>{Constants.expoGoConfig.version}</Text>,
          },
        ],
      },
      {
        rows: [
          {
            title: t('logout'),
            icon: 'power-off',
            iconColor: 'red500',
            onPress: signOut,
          },
        ],
      },
    ],
    [signOut, t]
  )
  return { items }
}
