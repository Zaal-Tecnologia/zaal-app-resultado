import { Linking, Pressable, View } from 'react-native'

import { Icon } from './icon'
import { P } from './p'
import { useTheme } from '~/hooks/use-theme'

export function Support() {
  function onContactSupport() {
    const phoneNumber = '24992913840'
    const message = 'Olá, preciso de suporte para o aplicativo do Resultado'

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.openURL(whatsappUrl)
  }

  const { BACKGROUND_SECONDARY } = useTheme()

  return (
    <Pressable
      className="h-14 flex-row items-center"
      onPress={onContactSupport}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: BACKGROUND_SECONDARY,
          justifyContent: 'center',
          height: 40,
          width: 40,
          borderRadius: 99,
        }}>
        <Icon name="help-circle" size={20} />
      </View>

      <P className="ml-3 font-inter-medium text-sm -tracking-wide">
        Contato com o suporte
      </P>
    </Pressable>
  )
}
