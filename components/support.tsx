import { Linking, Pressable, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { P } from './p'

import { fonts } from '~/styles/fonts'
import { colors } from '~/styles/colors'
import { useTheme } from '~/hooks/use-theme'

export function Support() {
  const { theme } = useTheme()

  function handleOpenWhatsApp() {
    const phoneNumber = '24992913840'
    const message = 'Olá, preciso de suporte para o aplicativo do Resultado'

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.openURL(whatsappUrl)
  }

  return (
    <Pressable
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={handleOpenWhatsApp}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          width: 40,
        }}>
        <Feather
          name="phone-call"
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
          Contato com o suporte
        </P>
        <P
          style={{
            marginLeft: 12,
            fontFamily: fonts['inter-medium'],
            fontSize: 9,
            color: colors.zinc[500],
          }}>
          Isso vai te direcionar para o Whatsapp
        </P>
      </View>

      <Feather
        name="arrow-up-right"
        style={{ marginLeft: 'auto' }}
        color={theme === 'dark' ? colors.white : colors.black}
        size={14}
      />
    </Pressable>
  )
}
