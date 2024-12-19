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
    path: (matchId: string | number, isJustCreated?: boolean) => {
      if (isJustCreated)
        return `/match/${matchId}?isJustCreated=${isJustCreated}`

      return `/match/${matchId}`
    },
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
  matchParamMatch: {
    name: 'match-param',
    path: () => '/match/(create)/match-param',
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

const homeMyMatches = {
  name: 'my-matches',
  path: () => `${tabsRoot.home.path()}/my-matches`,
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

  // (tabs)/home/my-matches
  homeMyMatches,
  homeMyMatchesIncomingMatches: {
    name: 'incoming-matches',
    path: () => `${homeMyMatches.path()}/incoming-matches`,
  },
  homeMyMatchesOldMatches: {
    name: 'old-matches',
    path: () => `${homeMyMatches.path()}/old-matches`,
  },
  homeMyMatchesReceivedInvitations: {
    name: 'received-invitations',
    path: () => `${homeMyMatches.path()}/received-invitations`,
  },

  // match

  // update
  matchUpdateField: {
    name: 'update',
    path: (
      matchId: string | number,
      { datetime, complexId }: { datetime?: string; complexId?: number } = {}
    ) => {
      // TODO a refacto pour la suite si besoin
      const queryParams = []

      if (datetime) {
        queryParams.push(`datetime=${datetime}`)
      }

      if (complexId) {
        queryParams.push(`complexId=${complexId}`)
      }

      // Construire la URL avec les query params, s'il y en a
      const basePath = `${root.match.path(matchId)}/update`
      return queryParams.length
        ? `${basePath}?${queryParams.join('&')}`
        : basePath
    },
  },
  matchUpdateParam: {
    name: 'param',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/update/param`,
  },

  matchUser: {
    name: 'user/[user]',
    path: (matchId: string | number, userId: string | number) =>
      `${root.match.path(matchId)}/user/${userId}`,
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

  // request
  matchManageRequest: {
    name: 'manage-request',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-request`,
  },
  matchManageRequestAddPartners: {
    name: 'add-partners',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-request/add-partners`,
  },

  matchManageInvitations: {
    name: 'manage-invitations',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-invitations`,
  },
  matchShareMatch: {
    name: 'share-match',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/share-match`,
  },
}
