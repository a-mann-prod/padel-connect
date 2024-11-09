import api from '../../../axiosConfig'
import {
  MatchConversationMessagesResponse,
  MatchConversationResponse,
} from './entities'
import {
  GetInfiniteMatchConversationMessagesParams,
  GetMatchConversationParams,
} from './params'

const ENDPOINT = '/matches'

export const getMatchConversationFn = async ({
  id,
  ...params
}: GetMatchConversationParams) => {
  const { data } = await api.get<MatchConversationResponse>(
    `${ENDPOINT}/${id}/conversation/`,
    {
      params: { ...params },
    }
  )

  return data
}

export const getInfiniteMatchConversationMessagesFn = async (
  { id, ...params }: GetInfiniteMatchConversationMessagesParams,
  pageParam: number
) => {
  const { data } = await api.get<MatchConversationMessagesResponse>(
    `${ENDPOINT}/${id}/conversation/messages/`,
    {
      params: { ...params, page: pageParam },
    }
  )

  return data
}
