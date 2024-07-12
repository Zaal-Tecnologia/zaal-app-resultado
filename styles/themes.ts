import { colors } from './colors'

const { zinc, white } = colors

export const themes = {
  dark: {
    shimmer: [zinc[700], zinc[800]],
    foreground: zinc[800],
    background: zinc[900],
    text: white,
    textForeground: zinc[400],
    border: zinc[700],
  },
  light: {
    shimmer: [zinc[100], zinc[200]],
    foreground: zinc[100],
    background: white,
    text: zinc[800],
    textForeground: zinc[500],
    border: zinc[200],
  },
} as const
