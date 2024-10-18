import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Image, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AddUserForm } from '~/components/add-user-form'
import { P } from '~/components/p'
import { fonts } from '~/styles/fonts'

export default function AuthWithText() {
  const { push, back } = useRouter()
  const { top } = useSafeAreaInsets()

  const local = useLocalSearchParams()

  const info = local.info !== 'nothing' ? local.info : null

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={40}
          onPress={() => back()}
          style={{ marginTop: top + 16, marginHorizontal: 32 }}>
          <MaterialCommunityIcons name="arrow-left" size={16} color="black" />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center' }}>
          <Image
            source={require('../../assets/logo-fundo-preto.png')}
            style={{
              height: 80,
              width: 80,
              marginTop: 40,
              marginHorizontal: 32,
            }}
            alt=""
          />

          <P
            style={{
              marginHorizontal: 32,
              marginTop: 40,
              fontSize: 32,
              fontFamily: fonts['urbanist-regular'],
            }}>
            Seja bem-vindo ao Zaal Resultado
          </P>
        </View>

        <AddUserForm
          onSuccess={() => push('/home/')}
          defaultValues={
            info ? { dispositivoHash: info[0], empresaId: info[1] } : undefined
          }
        />
      </View>
    </ScrollView>
  )
}
