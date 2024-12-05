export type ManageMatchTeamInvitationParams = {
  matchId: number
  teamId: number
  id: number
  action: 'accept' | 'refuse'
}

export type DeleteMatchTeamInvitationParams = {
  matchId: number
  teamId: number
  id: number
}
