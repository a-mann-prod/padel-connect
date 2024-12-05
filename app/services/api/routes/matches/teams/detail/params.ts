export type GetInfiniteMatchTeamsParams = {
  id: number
}

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

export type ManageMatchTeamParams = {
  matchId: number
  id: number
  action: 'accept' | 'refuse'
}
