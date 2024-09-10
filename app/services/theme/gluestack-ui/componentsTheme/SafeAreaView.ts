import { createStyle } from '@gluestack-style/react'

export const SafeAreaView = createStyle({
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
