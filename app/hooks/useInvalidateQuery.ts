import { QueryKey, useQueryClient } from '@tanstack/react-query'

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient()

  return (ressource: QueryKey) =>
    queryClient.invalidateQueries({
      queryKey: ressource,
    })
}
