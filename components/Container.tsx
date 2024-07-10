import { SafeAreaView, ViewProps } from 'react-native'
import { clsx } from 'clsx'
import { white, zinc } from 'tailwindcss/colors'
import { useMMKVString } from 'react-native-mmkv'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Container({ children, className, ...props }: ViewProps) {
  const [theme] = useMMKVString('zaal-result-theme', undefined)

  const { top } = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme === 'dark' ? zinc[900] : white,
        paddingTop: top + 18,
      }}
      className={clsx('flex-1', className)}
      {...props}>
      {children}
    </SafeAreaView>
  )
}
