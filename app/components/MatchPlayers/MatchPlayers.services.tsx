import {
  DefaultMinimalProfileResponse,
  DefaultProfileResponse,
} from '@/services/api/types'

const MAX_PLAYER_NB = 4

const getAvatarItems = (
  isCompetitive: boolean,
  team_1_users?: DefaultMinimalProfileResponse[],
  team_2_users?: DefaultMinimalProfileResponse[]
) => {
  if (!isCompetitive) {
    // Cas non compétitif : on travaille avec `participants`
    const players = [...(team_1_users || []), ...(team_2_users || [])]
    const emptySlots = MAX_PLAYER_NB - players.length

    return {
      team1: [
        ...players,
        ...Array.from({ length: emptySlots }).map<
          Partial<DefaultMinimalProfileResponse>
        >((_, i) => ({
          id: -1 - i,
        })),
      ],
      team2: [],
    }
  }

  // Cas compétitif : on travaille avec `team_1_users` et `team_2_users`
  const fillTeam = (
    teamUsers: Pick<DefaultProfileResponse, 'id' | 'avatar_url' | 'full_name'>[]
  ) => {
    const emptySlots = MAX_PLAYER_NB / 2 - teamUsers.length
    return [
      ...teamUsers,
      ...Array.from({ length: emptySlots }).map<
        Partial<DefaultMinimalProfileResponse>
      >((_, i) => ({
        id: -1 - i,
      })),
    ]
  }

  const team1WithFakes = fillTeam(team_1_users || [])
  const team2WithFakes = fillTeam(team_2_users || [])

  return { team1: team1WithFakes, team2: team2WithFakes }
}

export const matchPlayersServices = {
  getAvatarItems,
  MAX_PLAYER_NB,
}
