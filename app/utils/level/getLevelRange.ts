export const getLevelRange = (level = 0): [number, number] => {
  const min = level === 0 ? 0 : level - 1
  const max = level === 10 ? 10 : level + 1

  return [min, max]
}
