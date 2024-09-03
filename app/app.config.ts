import { ConfigContext } from 'expo/config'

const name =
  process.env.EXPO_PUBLIC_ENV === 'production'
    ? 'Padel Connect'
    : `Padel Connect (${process.env.EXPO_PUBLIC_ENV})`

export default ({ config }: ConfigContext) => ({
  ...config,
  name,
  slug: 'padel-connect',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'a-mann-prod.padel-connect',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1D2CEF',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      UIBackgroundModes: ['remote-notification'],
    },
    bundleIdentifier: 'com.a-mann-prod.padel-connect',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.a_mann_prod.padel_connect',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  jsEngine: 'hermes',
  plugins: [
    'expo-build-properties',
    'expo-font',
    'expo-router',
    'expo-localization',
    [
      'expo-asset',
      {
        assets: ['./assets/images/home-header-background.jpg'],
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
    ],
  ],
  locales: {
    en: './services/i18n/metadata/en.json',
    fr: './services/i18n/metadata/fr.json',
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: 'e57567a8-f956-4548-aefe-67c0990d02ea',
    },
  },
  updates: {
    url: 'https://u.expo.dev/e57567a8-f956-4548-aefe-67c0990d02ea',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  owner: 'a-mann-prod',
})
