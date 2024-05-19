import { Pressable } from 'react-native'

import { useTheme } from '~/hooks/use-theme'

import { Icon } from './icon'
import { P } from './p'

export function Theme() {
  const { theme, setTheme } = useTheme()

  async function onChangeTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')

    // await setTheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Pressable className="h-14 flex-row items-center" onPress={onChangeTheme}>
      <Icon name={theme === 'dark' ? 'sunny' : 'moon'} size={18} />

      <P className="ml-3 font-inter-medium text-sm -tracking-wide">
        Trocar tema
      </P>
    </Pressable>
  )
}
