import { Entity, PaginatedResponse } from '../../../types'

export type MatchConversationMessageResponse = Entity<{
  content: string
  user: number
}>

export type MatchConversationMessagesResponse =
  PaginatedResponse<MatchConversationMessageResponse>

export type MatchConversationResponse = Entity<{
  last_message: MatchConversationMessageResponse
}>
