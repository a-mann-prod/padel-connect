export type ManageMatchInvitationParams = {
  matchId: number
  id: number
  action: 'accept' | 'refuse'
}

export type GetInfiniteMatchInvitationsParams = {
  matchId: number
}
