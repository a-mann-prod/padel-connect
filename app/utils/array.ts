export const iterate = (length: number) => Array.from({ length }, (_, i) => i)

export const insertIfNotExists = <T extends { [key: string]: any }>(
  newValues: T[],
  array: T[],
  prop: keyof T = 'id'
) => {
  const existingIds = array.map((obj) => obj[prop])
  const notExists = newValues.filter(
    (newObj) => !existingIds.includes(newObj[prop])
  )

  return array.concat(notExists)
}
