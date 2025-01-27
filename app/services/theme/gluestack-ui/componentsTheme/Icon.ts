import { createStyle } from '@gluestack-style/react'

export const BaseIcon = createStyle({
  color: '$backgroundLight800',
  _dark: {
    color: '$backgroundDark400',
  },
  variants: {
    size: {
      '3xs': {
        h: '$2',
        w: '$2',
        props: {
          // @ts-ignore
          size: 10,
        },
      },
      '2xs': {
        h: '$3',
        w: '$3',
        props: {
          // @ts-ignore
          size: 12,
        },
      },
      xs: {
        h: '$3.5',
        w: '$3.5',
        props: {
          //@ts-ignore
          size: 14,
        },
      },
      sm: {
        h: '$4',
        w: '$4',
        props: {
          //@ts-ignore
          size: 16,
        },
      },
      md: {
        h: '$4.5',
        w: '$4.5',
        props: {
          //@ts-ignore
          size: 18,
        },
      },
      lg: {
        h: '$5',
        w: '$5',
        props: {
          //@ts-ignore
          size: 20,
        },
      },
      xl: {
        h: '$6',
        w: '$6',
        props: {
          //@ts-ignore
          size: 24,
        },
      },
      '2xl': {
        h: '$8',
        w: '$8',
        props: {
          //@ts-ignore
          size: 28,
        },
      },
    },
    variant: {
      subtitle: {
        color: '$textLight600',
        _dark: {
          color: '$textDark300',
        },
      },
    },
  },
  // defaultProps: {
  //   size: 'md',
  // },
})

export const Icon = createStyle({
  props: {
    size: 'md',
    //@ts-ignore
    fill: 'none',
  },
  color: '$backgroundLight800',
  _dark: {
    //@ts-ignore
    color: '$backgroundDark400',
  },
})
