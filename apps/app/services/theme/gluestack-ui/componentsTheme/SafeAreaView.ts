import { createStyle } from '@gluestack-style/react'

export const SafeAreaView = createStyle({
  backgroundColor: '$backgroundLight50',

  _dark: {
    backgroundColor: '$backgroundDark950',
  },
})
