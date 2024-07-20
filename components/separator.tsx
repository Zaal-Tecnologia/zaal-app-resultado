import { StyleSheet, View } from 'react-native'

import { useTheme } from '~/hooks/use-theme'

import { colors } from '~/styles/colors'

export function Separator() {
  const { theme } = useTheme()

  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        width: '100%',
        backgroundColor: colors.zinc[theme === 'dark' ? 800 : 200],
      }}
    />
  )
}
