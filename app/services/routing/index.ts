const root = {
  modals: {
    name: '(modals)',
    path: () => '/(modals)',
  },
  tabs: {
    name: '(tabs)',
    path: () => '/(tabs)',
  },
  match: {
    name: 'match/[match]',
    path: (matchId: string | number) => `/match/${matchId}`,
  },
  matchCreate: {
    name: 'match/create',
    path: ({ datetime }: { datetime?: string } = {}) =>
      datetime ? `/match/create?datetime=${datetime}` : '/match/create',
  },
}

const modalsRoot = {
  auth: {
    name: 'auth',
    path: () => `${root.modals.path()}/auth`,
  },
  onboarding: {
    name: 'onboarding',
    path: () => `${root.modals.path()}/onboarding`,
  },
  root: {
    name: 'root',
    path: () => `${root.modals.path()}/root`,
  },
}

const tabsRoot = {
  home: {
    name: '(home)',
    path: () => `${root.tabs.path()}/(home)`,
  },
  play: {
    name: 'play',
    path: () => `${root.tabs.path()}/play`,
  },
  community: {
    name: 'community',
    path: () => `${root.tabs.path()}/community`,
  },
  profile: {
    name: 'profile',
    path: () => `${root.tabs.path()}/profile`,
  },
}

const profileSettings = {
  name: 'settings',
  path: () => `${tabsRoot.profile.path()}/settings`,
}

export const routing = {
  // root
  ...root,

  // (modals)
  ...modalsRoot,

  // (modals)/auth
  authLogin: {
    name: 'login',
    path: () => `${modalsRoot.auth.path()}/login`,
  },
  authRegister: {
    name: 'register',
    path: () => `${modalsRoot.auth.path()}/register`,
  },
  authPasswordResetRequest: {
    name: 'password-reset-request',
    path: () => `${modalsRoot.auth.path()}/password-reset-request`,
  },

  // (modals)/onboarding
  onboardingPersonalInformation: {
    name: 'personal-information',
    path: () => `${modalsRoot.onboarding.path()}/personal-information`,
  },
  onboardingAvatar: {
    name: 'avatar',
    path: () => `${modalsRoot.onboarding.path()}/avatar`,
  },
  onboardingGetStarted: {
    name: 'get-started',
    path: () => `${modalsRoot.onboarding.path()}/get-started`,
  },
  onboardingPreferences: {
    name: 'preferences',
    path: () => `${modalsRoot.onboarding.path()}/preferences`,
  },

  // (modals)/root
  rootEmailVerified: {
    name: 'email-verified',
    path: () => `${modalsRoot.root.path()}/email-verified`,
  },
  rootPasswordReset: {
    name: 'password-reset',
    path: () => `${modalsRoot.root.path()}/password-reset`,
  },

  // (tabs)
  ...tabsRoot,

  // (tabs)/(home)
  homeMyMatches: {
    name: 'my-matches',
    path: () => `${tabsRoot.home.path()}/my-matches`,
  },
  homeNotifications: {
    name: 'notifications',
    path: () => `${tabsRoot.home.path()}/notifications`,
  },

  // (tabs)/play
  playFilters: {
    name: 'filters',
    path: () => `${tabsRoot.play.path()}/filters`,
  },

  // (tabs)/community
  communityUser: {
    name: '[user]',
    path: (userId: string | number) => `${tabsRoot.community.path()}/${userId}`,
  },
  communityFavoriteUsers: {
    name: 'favorite-users',
    path: () => `${tabsRoot.community.path()}/favorite-users`,
  },

  // (tabs)/profile
  profileSettings,

  // (tabs)/profile/settings
  profileSettingsUpdatePersonalInformation: {
    name: 'update-personal-information',
    path: () => `${profileSettings.path()}/update-personal-information`,
  },
  profileSettingsUpdatePreferences: {
    name: 'update-preferences',
    path: () => `${profileSettings.path()}/update-preferences`,
  },
  profileSettingsEmailChange: {
    name: 'email-change',
    path: () => `${profileSettings.path()}/email-change`,
  },
  profileSettingsPasswordChange: {
    name: 'password-change',
    path: () => `${profileSettings.path()}/password-change`,
  },
  profileSettingsPrivacyPolicy: {
    name: 'privacy-policy',
    path: () => `${profileSettings.path()}/privacy-policy`,
  },
  profileSettingsTermsOfUse: {
    name: 'terms-of-use',
    path: () => `${profileSettings.path()}/terms-of-use`,
  },
  profileSettingsDangerZone: {
    name: 'danger-zone',
    path: () => `${profileSettings.path()}/danger-zone`,
  },

  // match
  matchUpdate: {
    name: 'update',
    path: (matchId: string | number) => `${root.match.path(matchId)}/update`,
  },
  matchUser: {
    name: 'user/[user]',
    path: (matchId: string | number, userId: string | number) =>
      `${root.match.path(matchId)}/user/${userId}`,
  },
  matchPlayersManage: {
    name: 'players-manage',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/players-manage`,
  },
  matchChat: {
    name: 'chat',
    path: (matchId: string | number) => `${root.match.path(matchId)}/chat`,
  },
}