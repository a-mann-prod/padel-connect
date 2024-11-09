export type GetProfileParams = {
  id: number
}

export type GetProfilesParams = {
  ids?: number[]
  search?: string
}

export type GetInfiniteProfilesParams = {
  search?: string
}
