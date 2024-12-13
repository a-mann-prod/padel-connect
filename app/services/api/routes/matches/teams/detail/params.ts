export type GetMatchTeamRequestParams = {
  id: number
}

export type DeleteMatchTeamParams = {
  matchId: number
  id: number
}

export type CreateMatchTeamParams = {
  matchId: number
  send_invitations?: number[]
}
