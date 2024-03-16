import { DefaultTheme, Theme } from '@react-navigation/native'

const darkTheme: Theme = {
  dark: true,
  colors: {
    background: 'black',
    border: 'black',
    card: 'black',
    notification: 'black',
    primary: 'black',
    text: 'black',
  },
}

const lightTheme: Theme = {
  ...DefaultTheme,
}

export { darkTheme, lightTheme }
