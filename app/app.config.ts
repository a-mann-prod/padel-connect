import { ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext) => ({
  ...config,
  name: 'Padel Connect',
  slug: 'padel-connect',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'com.padel-connect.app',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
    bundleIdentifier: 'com.anonymous.boilerplate',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.anonymous.boilerplate',
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  jsEngine: 'hermes',
  plugins: [
    'expo-router',
    'expo-localization',
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
      projectId: '6dcc7c36-e7ac-4604-94c1-2771dfe0b7db',
    },
  },
})