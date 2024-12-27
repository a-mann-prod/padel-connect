export const getLevelRange = (
  level = 0,
  allowDecimals = true
): [number, number] => {
  const baseLevel = allowDecimals
    ? Math.round(level * 10) / 10
    : Math.floor(level)

  let min: number
  let max: number

  if (baseLevel < 1) {
    // Cas spécial pour les niveaux entre 0 et 1 (1 non inclus)
    min = 0
    max = Math.min(10, baseLevel + 1)
  } else if (baseLevel > 9) {
    // Cas spécial pour les niveaux entre 9 et 10 (10 inclus)
    min = Math.max(0, baseLevel - 1)
    max = 10
  } else {
    // Cas général pour les niveaux entre 1 et 9
    min = Math.max(0, baseLevel - 1)
    max = Math.min(10, baseLevel + 1)
  }

  return [min, max]
}
