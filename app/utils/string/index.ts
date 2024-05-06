export const capitalizeLetter = (word: string, charAt = 0) => {
  if (charAt > word.length - 1 || charAt < 0) return word

  const firstPart = word.slice(0, charAt)
  const upperCaseLetter = word[charAt].toUpperCase()
  const secondPart = word.slice(charAt + 1)
  return `${firstPart}${upperCaseLetter}${secondPart}`
}
