export const getLevelRange = (level = 0): [number, number] => {
  const integerPart = Math.floor(level)

  const min = integerPart === 0 ? 0 : integerPart - 1
  const max = integerPart === 10 ? 10 : integerPart + 1

  return [min, max]
}
