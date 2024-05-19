import { SafeAreaView, ViewProps } from 'react-native'
import { clsx } from 'clsx'
import { white, zinc } from 'tailwindcss/colors'

import { useMMKVString } from 'react-native-mmkv'

export function Container({ children, className, ...props }: ViewProps) {
  const [theme] = useMMKVString('zaal-result-theme', undefined)

  return (
    <SafeAreaView
      style={{ backgroundColor: theme === 'dark' ? zinc[900] : white }}
      className={clsx('flex-1', className)}
      {...props}>
      {children}
    </SafeAreaView>
  )
}
