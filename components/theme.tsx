import { Pressable, View } from 'react-native'

import { useTheme } from '~/hooks/use-theme'

import { Icon } from './icon'
import { P } from './p'

export function Theme() {
  const { theme, setTheme, BACKGROUND_SECONDARY } = useTheme()

  async function onChangeTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')

    // await setTheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Pressable className="h-14 flex-row items-center" onPress={onChangeTheme}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: BACKGROUND_SECONDARY,
          justifyContent: 'center',
          height: 40,
          width: 40,
          borderRadius: 99,
        }}>
        <Icon name={theme === 'dark' ? 'sunny' : 'moon'} size={18} />
      </View>

      <P className="ml-3 font-inter-medium text-sm -tracking-wide">
        Trocar tema
      </P>
    </Pressable>
  )
}
