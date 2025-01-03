export const getInitials = (...args: (string | null | undefined)[]) =>
  args
    .reduce((acc, curr) => (curr ? `${acc}${curr[0].toUpperCase()} ` : acc), '')
    ?.trim()

export const hasAdaptedLevel = (
  level: number | undefined,
  [level_min, level_max]: [number, number]
) => {
  if (!level) return false

  return level >= level_min && level <= level_max
}
