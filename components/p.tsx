import { Text, TextProps } from 'react-native'

import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'

export function P({ style, ...props }: TextProps) {
  const { theme } = useTheme()

  return (
    <Text style={[{ color: themes[theme].text }, style]} {...props}>
      {props.children}
    </Text>
  )
}
