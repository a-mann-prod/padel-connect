import { useQueryClient } from '@tanstack/react-query'
import { toPairs } from 'remeda'

const JOIN_CHAR = '&'

const customEncodeURIComponent = (str: string) =>
  encodeURIComponent(str).replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16)
  )

export const useInvalidatePostgrestQuery = () => {
  const queryClient = useQueryClient()

  return (
    table: string,
    selectedColumns?: string,
    filters?: Record<string, unknown>
  ) => {
    if (!selectedColumns || !filters) {
      queryClient.invalidateQueries({
        queryKey: ['postgrest', 'null', 'public', table],
      })
      return
    }

    const filtersStringified = toPairs(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join(JOIN_CHAR)
    const selectedColumnsFormatted = `select=${customEncodeURIComponent(selectedColumns.replaceAll(' ', ''))}`
    const rest = [filtersStringified, selectedColumnsFormatted].join(JOIN_CHAR)

    queryClient.invalidateQueries({
      queryKey: ['postgrest', 'null', 'public', table, rest],
    })
  }
}
