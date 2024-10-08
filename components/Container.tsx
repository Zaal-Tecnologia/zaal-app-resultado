import { SafeAreaView, ViewProps } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '~/styles/colors'

const { zinc, white } = colors

export function Container({ children, style, ...props }: ViewProps) {
  const [theme] = useMMKVString('zaal-result-theme', undefined)

  const { top } = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={[
        style,
        {
          backgroundColor: theme === 'dark' ? zinc[900] : white,
          flex: 1,
          paddingTop: top + 8,
        },
      ]}
      {...props}>
      {children}
    </SafeAreaView>
  )
}
