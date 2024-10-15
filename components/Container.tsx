import { SafeAreaView, ViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useStorageTheme } from '~/hooks/use-storage-theme'

import { colors } from '~/styles/colors'

const { zinc, white } = colors

export function Container({ children, style, ...props }: ViewProps) {
  const { theme } = useStorageTheme()

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
