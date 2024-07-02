import { useComplexes } from '@/services/api'

export const useComplexItems = () => {
  const { data: complexes } = useComplexes({ params: {} })

  return (
    complexes?.map(({ id, name }) => ({
      value: id.toString(),
      label: name,
    })) || []
  )
}
