export type GetFavoriteUserParams = {
  user_id: string
  favorite_user_id: string
}

export type GetFavoriteUsersParams = {
  user_id: string
}

export type InsertFavoriteUserParams = {
  created_at?: string | undefined
  favorite_user_id?: string | null
  id?: number | undefined
  user_id?: string | null
}[]

export type DeleteFavoriteUserParams = {
  user_id: string
  favorite_user_id: string
}
