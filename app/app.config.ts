import { ConfigContext } from 'expo/config'

const name =
  process.env.EXPO_PUBLIC_ENV === 'production'
    ? 'Padel Connect'
    : `PC (${process.env.EXPO_PUBLIC_ENV})`

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
    bundleIdentifier: 'com.a-mann-prod.padel-connect',
  },
  android: {
    permissions: ['android.permission.READ_MEDIA_IMAGES'],
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
        iosUrlScheme:
          process.env.EXPO_PUBLIC_REVERSED_CLIENT_ID ||
          'com.googleusercontent.apps.898183396795-1tk1k1vlu70nl8hp3il70mnodf9sg1jk',
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
