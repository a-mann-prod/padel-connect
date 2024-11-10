import { useComplexes } from '@/services/api'

export const useComplexItems = () => {
  const { data: complexes } = useComplexes()

  return (
    complexes?.results?.map(({ id, name }) => ({
      value: id.toString(),
      label: name,
    })) || []
  )
}
