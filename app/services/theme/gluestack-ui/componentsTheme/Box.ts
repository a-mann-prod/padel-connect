import { createStyle } from '@gluestack-style/react'

export const Box = createStyle({
  variants: {
    variant: {
      colored: {
        backgroundColor: '$white',
        _dark: {
          backgroundColor: '$backgroundDark950',
        },
      },
    },
  },
})
