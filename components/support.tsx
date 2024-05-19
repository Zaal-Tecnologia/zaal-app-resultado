import { Linking, Pressable } from 'react-native'

import { Icon } from './icon'
import { P } from './p'

export function Support() {
  function onContactSupport() {
    const phoneNumber = '24992913840'
    const message = 'Olá, preciso de suporte para o aplicativo do Resultado'

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`

    Linking.openURL(whatsappUrl)
  }

  return (
    <Pressable
      className="h-14 flex-row items-center"
      onPress={onContactSupport}>
      <Icon name="help-circle" size={20} />

      <P className="ml-3 font-inter-medium text-sm -tracking-wide">
        Contato com o suporte
      </P>
    </Pressable>
  )
}
