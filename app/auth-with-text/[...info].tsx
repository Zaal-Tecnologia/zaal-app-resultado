import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Image, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AddUserForm } from '~/components/add-user-form'
import { P } from '~/components/p'

export default function AuthWithText() {
  const { push, back } = useRouter()
  const { top } = useSafeAreaInsets()

  const local = useLocalSearchParams()

  const info = local.info !== 'nothing' ? local.info : null

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="flex-1 justify-center">
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={40}
          onPress={() => back()}
          style={{ marginTop: top + 16, marginHorizontal: 32 }}>
          <MaterialCommunityIcons name="arrow-left" size={16} color="black" />
        </TouchableOpacity>

        <View className="justify-center">
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
            style={{ marginHorizontal: 32 }}
            className="mt-10 font-urbanist-regular text-[32px] -tracking-wide">
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
