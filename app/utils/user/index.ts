import { isNilOrEmpty } from '../global'

export const getUsername = (...args: (string | null | undefined)[]) =>
  args
    .reduce<string[]>((acc, curr, index) => {
      if (!curr || isNilOrEmpty(curr)) return acc

      const isLast = index === args.length - 1

      let newItem
      if (isLast) {
        newItem = `${curr.charAt(0).toUpperCase()}.`
      } else {
        newItem = curr
          .split(' ')
          .reduce<string[]>(
            (acc, curr) => [
              ...acc,
              `${curr.charAt(0).toUpperCase()}${curr.slice(1).toLowerCase()}`,
            ],
            []
          )
          .join(' ')
      }

      return [...acc, newItem]
    }, [])
    .join(' ')

export const getInitials = (...args: (string | null | undefined)[]) =>
  args.reduce(
    (acc, curr) => (curr ? `${acc}${curr[0].toUpperCase()}` : acc),
    ''
  )

export const hasAdaptedLevel = (
  level: number | undefined,
  [level_min, level_max]: [number, number]
) => {
  if (!level) return false

  return level >= level_min && level <= level_max
}
