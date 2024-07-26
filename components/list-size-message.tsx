import { StyleSheet } from 'react-native'

import { useTheme } from '~/hooks/use-theme'
import { useSize } from '~/hooks/use-filters'

import { P } from './p'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

export function ListSizeMessage() {
  const { theme } = useTheme()
  const { size } = useSize()

  return (
    <P
      style={[
        s.container,
        {
          color: themes[theme].textForeground,
        },
      ]}>
      {size}
    </P>
  )
}

const s = StyleSheet.create({
  container: {
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.25,
    fontSize: 10,
  },
})
