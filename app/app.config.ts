import { ConfigContext } from 'expo/config'

const ENV = process.env.EXPO_PUBLIC_ENV
const IS_DEV = ENV !== 'production'

export default ({ config }: ConfigContext) => ({
  ...config,
  name: 'Padel Connect',
  slug: 'padel-connect',
  version: '1.0.0',
  orientation: 'portrait',
  icon: `./assets/images/${ENV}/icon.png`,
  scheme: 'a-mann-prod.padel-connect',
  userInterfaceStyle: 'automatic',
  splash: {
    image: `./assets/images/${ENV}/splash.png`,
    resizeMode: 'cover',
    backgroundColor: '#004AAB',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      UIBackgroundModes: ['remote-notification'],
    },
    bundleIdentifier: IS_DEV
      ? `com.a-mann-prod.padel-connect.${ENV}`
      : 'com.a-mann-prod.padel-connect',
  },
  android: {
    permissions: ['android.permission.READ_MEDIA_IMAGES'],
    adaptiveIcon: {
      foregroundImage: `./assets/images/${ENV}/adaptive-icon.png`,
      backgroundColor: '#ffffff',
    },
    package: IS_DEV
      ? `com.a_mann_prod.padel_connect.${ENV}`
      : 'com.a_mann_prod.padel_connect',
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
        assets: ['./assets/images/home_header_background.jpg'],
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
    ],
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: process.env.EXPO_PUBLIC_REVERSED_CLIENT_ID,
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
