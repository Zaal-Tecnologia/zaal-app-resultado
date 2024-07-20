import { Pressable, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { useTheme } from '~/hooks/use-theme'

import { P } from './p'
import { fonts } from '~/styles/fonts'
import { colors } from '~/styles/colors'

export function Theme() {
  const { theme, setTheme } = useTheme()

  async function handleChangeTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Pressable
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={handleChangeTheme}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          width: 40,
        }}>
        <Feather
          name={theme === 'dark' ? 'sun' : 'moon'}
          color={theme === 'dark' ? colors.white : colors.black}
          size={18}
        />
      </View>

      <View>
        <P
          style={{
            marginLeft: 12,
            fontFamily: fonts['inter-semibold'],
            fontSize: 12,
            letterSpacing: -0.35,
          }}>
          Trocar tema
        </P>
        <P
          style={{
            marginLeft: 12,
            fontFamily: fonts['inter-medium'],
            fontSize: 9,
            color: colors.zinc[500],
          }}>
          Não vai afetar as cores do gráfico.
        </P>
      </View>
    </Pressable>
  )
}
