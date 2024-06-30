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

export const chunk = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  )
}

export const modifyArray = <T>(arr: T[], index: number, value: T): T[] => {
  const newArr = [...arr]

  if (index >= newArr.length) {
    newArr.push(value)
  } else {
    newArr[index] = value
  }

  return newArr
}
