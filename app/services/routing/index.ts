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
    name: 'match/(create)',
    path: ({ datetime }: { datetime?: string } = {}) =>
      datetime ? `/match/(create)?datetime=${datetime}` : '/match/(create)',
  },
  matchCreateAddPartner: {
    name: 'add-partner',
    path: () => '/match/(create)/add-partner',
  },
  matchCreateShareMatch: {
    name: 'share-match',
    path: () => '/match/(create)/share-match',
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
  onboardingLevelEstimation: {
    name: 'level-estimation',
    path: () => `${modalsRoot.onboarding.path()}/level-estimation`,
  },
  onboardingNotificationAlerts: {
    name: 'notification-alerts',
    path: () => `${modalsRoot.onboarding.path()}/notification-alerts`,
  },
  onboardingFilters: {
    name: 'filters',
    path: () => `${modalsRoot.onboarding.path()}/filters`,
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
  homeMyOldMatches: {
    name: 'my-old-matches',
    path: () => `${tabsRoot.home.path()}/my-old-matches`,
  },
  homeNotifications: {
    name: 'notifications',
    path: () => `${tabsRoot.home.path()}/notifications`,
  },
  homeTournaments: {
    name: 'tournaments',
    path: () => `${tabsRoot.home.path()}/tournaments`,
  },
  homeTournamentsFilters: {
    name: 'tournaments-filters',
    path: () => `${tabsRoot.home.path()}/tournaments-filters`,
  },
  homeTournamentDetail: {
    name: '[tournament]',
    path: (tournamentId: string | number) =>
      `${tabsRoot.home.path()}/${tournamentId}`,
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

  // (tabs)/profile
  profileSettings,

  // (tabs)/profile/settings
  profileSettingsUpdatePersonalInformation: {
    name: 'update-personal-information',
    path: () => `${profileSettings.path()}/update-personal-information`,
  },
  profileSettingsUpdateNotificationAlerts: {
    name: 'update-notification-alerts',
    path: () => `${profileSettings.path()}/update-notification-alerts`,
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
  matchTeamsManage: {
    name: 'teams-manage',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/teams-manage`,
  },
  matchChat: {
    name: 'chat',
    path: (matchId: string | number) => `${root.match.path(matchId)}/chat`,
  },
  matchJoinRequest: {
    name: 'join-request',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/join-request`,
  },
  matchManageRequest: {
    name: 'manage-request',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-request`,
  },
  matchShareMatch: {
    name: 'share-match',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/share-match`,
  },
}
