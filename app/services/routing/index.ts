import { Href } from 'expo-router'

const root = {
  modals: {
    name: '(modals)',
    path: () => '/(modals)' as Href,
  },
  tabs: {
    name: '(tabs)',
    path: () => '/(tabs)' as Href,
  },
  match: {
    name: 'match/[match]',
    path: (matchId: string | number, isJustCreated?: boolean) => {
      if (isJustCreated)
        return `/match/${matchId}?isJustCreated=${isJustCreated}` as Href

      return `/match/${matchId}` as Href
    },
  },
  matchCreate: {
    name: 'match/(create)',
    path: ({ datetime }: { datetime?: string } = {}) =>
      (datetime
        ? `/match/(create)?datetime=${datetime}`
        : '/match/(create)') as Href,
  },
  matchCreateAddPartner: {
    name: 'add-partner',
    path: () => '/match/(create)/add-partner' as Href,
  },
  matchCreateShareMatch: {
    name: 'share-match',
    path: () => '/match/(create)/share-match' as Href,
  },
  matchParamMatch: {
    name: 'match-param',
    path: () => '/match/(create)/match-param' as Href,
  },
}

const modalsRoot = {
  auth: {
    name: 'auth',
    path: () => `${root.modals.path()}/auth` as Href,
  },
  onboarding: {
    name: 'onboarding',
    path: () => `${root.modals.path()}/onboarding` as Href,
  },
  root: {
    name: 'root',
    path: () => `${root.modals.path()}/root` as Href,
  },
  report: {
    name: 'report',
    path: () => `${root.modals.path()}/report` as Href,
  },
}

const tabsRoot = {
  home: {
    name: '(home)',
    path: () => `${root.tabs.path()}/(home)` as Href,
  },
  play: {
    name: 'play',
    path: () => `${root.tabs.path()}/play` as Href,
  },
  community: {
    name: 'community',
    path: () => `${root.tabs.path()}/community` as Href,
  },
  profile: {
    name: 'profile',
    path: () => `${root.tabs.path()}/profile` as Href,
  },
}

const homeMyMatches = {
  name: 'my-matches',
  path: () => `${tabsRoot.home.path()}/my-matches` as Href,
}

const profileSettings = {
  name: 'settings',
  path: () => `${tabsRoot.profile.path()}/settings` as Href,
}

export const routing = {
  // root
  ...root,

  // (modals)
  ...modalsRoot,

  // (modals)/auth
  authLogin: {
    name: 'login',
    path: () => `${modalsRoot.auth.path()}/login` as Href,
  },
  authRegister: {
    name: 'register',
    path: () => `${modalsRoot.auth.path()}/register` as Href,
  },
  authPasswordResetRequest: {
    name: 'password-reset-request',
    path: () => `${modalsRoot.auth.path()}/password-reset-request` as Href,
  },

  // (modals)/onboarding
  onboardingPersonalInformation: {
    name: 'personal-information',
    path: () => `${modalsRoot.onboarding.path()}/personal-information` as Href,
  },
  onboardingAvatar: {
    name: 'avatar',
    path: () => `${modalsRoot.onboarding.path()}/avatar` as Href,
  },
  onboardingGetStarted: {
    name: 'get-started',
    path: () => `${modalsRoot.onboarding.path()}/get-started` as Href,
  },
  onboardingLevelEstimation: {
    name: 'level-estimation',
    path: () => `${modalsRoot.onboarding.path()}/level-estimation` as Href,
  },
  onboardingNotificationAlerts: {
    name: 'notification-alerts',
    path: () => `${modalsRoot.onboarding.path()}/notification-alerts` as Href,
  },
  onboardingFilters: {
    name: 'filters',
    path: () => `${modalsRoot.onboarding.path()}/filters` as Href,
  },

  // (modals)/root
  rootEmailVerified: {
    name: 'email-verified',
    path: () => `${modalsRoot.root.path()}/email-verified` as Href,
  },
  rootPasswordReset: {
    name: 'password-reset',
    path: () => `${modalsRoot.root.path()}/password-reset` as Href,
  },

  // (tabs)
  ...tabsRoot,

  // (tabs)/(home)
  homeNotifications: {
    name: 'notifications',
    path: () => `${tabsRoot.home.path()}/notifications` as Href,
  },
  homeTournaments: {
    name: 'tournaments',
    path: () => `${tabsRoot.home.path()}/tournaments` as Href,
  },
  homeTournamentsFilters: {
    name: 'tournaments-filters',
    path: () => `${tabsRoot.home.path()}/tournaments-filters` as Href,
  },
  homeTournamentDetail: {
    name: '[tournament]',
    path: (tournamentId: string | number) =>
      `${tabsRoot.home.path()}/${tournamentId}` as Href,
  },

  // (tabs)/play
  playFilters: {
    name: 'filters',
    path: () => `${tabsRoot.play.path()}/filters` as Href,
  },

  // (tabs)/community
  communityUser: {
    name: '[user]',
    path: (userId: string | number) =>
      `${tabsRoot.community.path()}/${userId}` as Href,
  },

  // (tabs)/profile
  profileSettings,

  // (tabs)/profile/settings
  profileSettingsUpdatePersonalInformation: {
    name: 'update-personal-information',
    path: () => `${profileSettings.path()}/update-personal-information` as Href,
  },
  profileSettingsUpdateNotificationAlerts: {
    name: 'update-notification-alerts',
    path: () => `${profileSettings.path()}/update-notification-alerts` as Href,
  },
  profileSettingsEmailChange: {
    name: 'email-change',
    path: () => `${profileSettings.path()}/email-change` as Href,
  },
  profileSettingsPasswordChange: {
    name: 'password-change',
    path: () => `${profileSettings.path()}/password-change` as Href,
  },
  profileSettingsPrivacyPolicy: {
    name: 'privacy-policy',
    path: () => `${profileSettings.path()}/privacy-policy` as Href,
  },
  profileSettingsTermsOfUse: {
    name: 'terms-of-use',
    path: () => `${profileSettings.path()}/terms-of-use` as Href,
  },
  profileSettingsDangerZone: {
    name: 'danger-zone',
    path: () => `${profileSettings.path()}/danger-zone` as Href,
  },

  // (tabs)/home/my-matches
  homeMyMatches,
  homeMyMatchesIncomingMatches: {
    name: 'incoming-matches',
    path: () => `${homeMyMatches.path()}/incoming-matches` as Href,
  },
  homeMyMatchesOldMatches: {
    name: 'old-matches',
    path: () => `${homeMyMatches.path()}/old-matches` as Href,
  },
  homeMyMatchesReceivedInvitations: {
    name: 'received-invitations',
    path: () => `${homeMyMatches.path()}/received-invitations` as Href,
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
      return (
        queryParams.length ? `${basePath}?${queryParams.join('&')}` : basePath
      ) as Href
    },
  },
  matchUpdateParam: {
    name: 'param',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/update/param` as Href,
  },

  matchUser: {
    name: 'user/[user]',
    path: (matchId: string | number, userId: string | number) =>
      `${root.match.path(matchId)}/user/${userId}` as Href,
  },
  matchChat: {
    name: 'chat',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/chat` as Href,
  },
  matchJoinRequest: {
    name: 'join-request',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/join-request` as Href,
  },

  // old match
  oldMatch: {
    name: 'old-match',
    path: (matchId: string | number) => `old-match/${matchId}` as Href,
  },

  // request
  matchManageRequest: {
    name: 'manage-request',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-request` as Href,
  },
  matchManageRequestAddPartners: {
    name: 'add-partners',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-request/add-partners` as Href,
  },

  matchManageInvitations: {
    name: 'manage-invitations',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/manage-invitations` as Href,
  },
  matchShareMatch: {
    name: 'share-match',
    path: (matchId: string | number) =>
      `${root.match.path(matchId)}/share-match` as Href,
  },
}
