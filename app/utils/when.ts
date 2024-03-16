export const when = <T>(condition: boolean | undefined, value: T) => {
  if (condition) return value
}
