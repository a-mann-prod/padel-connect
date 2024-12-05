import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query'
import { Entity } from '../types'

type Obj<T> = { id?: number } & T

type Results<T> = {
  results: Entity<Obj<T>>[]
}

type OldData<T> = InfiniteData<Results<T>, number> | Results<T> | Obj<T>

const isInfiniteArray = <T,>(
  data: OldData<T>
): data is InfiniteData<Results<T>, number> => {
  return 'pages' in data
}

const isArray = <T,>(data: OldData<T>): data is Results<T> => {
  return 'results' in data
}

export const useQueryCache = () => {
  const queryClient = useQueryClient()

  const addItem = <T,>(queryKey: QueryKey, data: Obj<T>) => {
    queryClient.setQueryData(queryKey, (oldData: OldData<T>) => {
      if (!oldData) return

      if (isInfiniteArray(oldData)) {
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === oldData.pages.length - 1) {
              return {
                ...page,
                results: [data, ...page.results],
              }
            }
            return page
          }),
        }

        return newData
      } else if (isArray(oldData)) {
      } else {
      }
    })
  }

  const updateItem = <T,>(queryKey: QueryKey, data: Obj<T>) => {
    queryClient.setQueryData(queryKey, (oldData: OldData<T>) => {
      if (!oldData) {
        return { ...data }
      }

      if (isInfiniteArray(oldData)) {
        const updatedPages = oldData.pages.map((page) => {
          const updatedResults = page.results.map((res) => {
            if (res.id === data.id) {
              return {
                ...res,
                ...data,
              }
            }
            return res
          })
          return {
            ...page,
            results: updatedResults,
          }
        })

        return {
          ...oldData,
          pages: updatedPages,
        }
      } else if (isArray(oldData)) {
      } else {
        return { ...oldData, ...data }
      }
    })
  }

  const removeItem = <T,>(queryKey: QueryKey, id?: number) => {
    queryClient.setQueryData(queryKey, (oldData: OldData<T>) => {
      if (!oldData) return

      if (isInfiniteArray(oldData)) {
        const updatedPages = oldData.pages.map((page) => {
          const updatedResults = page.results.filter((data) => data.id !== id)
          return {
            ...page,
            results: updatedResults,
          }
        })

        return {
          ...oldData,
          pages: updatedPages,
        }
      } else if (isArray(oldData)) {
      } else {
        return undefined
      }
    })
  }

  return {
    addItem,
    updateItem,
    removeItem,
  }
}
