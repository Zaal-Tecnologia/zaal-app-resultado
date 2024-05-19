import { Text, TextProps } from 'react-native'
import { white, zinc } from 'tailwindcss/colors'

import { useTheme } from '~/hooks/use-theme'

export function P(props: TextProps) {
  const { theme } = useTheme()

  return (
    <Text style={{ color: theme === 'dark' ? white : zinc[800] }} {...props}>
      {props.children}
    </Text>
  )
}
