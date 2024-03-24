import { isEmpty } from 'remeda'

export const getUserName = (...args: (string | null | undefined)[]) =>
  args.reduce((acc, curr, index) => {
    if (!curr || isEmpty(curr)) return acc

    const isLast = index === args.length - 1
    const newItem = isLast
      ? `${curr.charAt(0).toUpperCase()}.`
      : `${curr.charAt(0).toUpperCase()}${curr.slice(1).toLowerCase()}`

    return [acc, newItem].join(' ')
  }, '')

export const getInitials = (...args: (string | null | undefined)[]) =>
  args.reduce(
    (acc, curr) => (curr ? `${acc}${curr[0].toUpperCase()}` : acc),
    ''
  )
