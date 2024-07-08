import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMMKVString } from 'react-native-mmkv'
import { Image, SafeAreaView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUsers } from '~/hooks/use-users'

import { P } from '~/components/p'
import { AddUserForm } from '~/components/add-user-form'

export default function Home() {
  // const { user } = useSession()
  const { user } = useUsers()
  const { top } = useSafeAreaInsets()

  const [theme] = useMMKVString('zaal-result-theme', undefined)

  return (
    <SafeAreaView style={{ paddingTop: top, flex: 1 }}>
      <Stack.Screen options={{ title: 'Home' }} />

      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      {!user ? (
        <>
          <View className="flex-1 justify-center">
            <View className="justify-center">
              <Image
                source={require('../assets/logo-fundo-preto.png')}
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

              {/** <View
                style={{ marginHorizontal: 32 }}
                className="mt-10 flex-row items-center justify-start">
                <MaterialCommunityIcons
                  name="hand-wave-outline"
                  size={16}
                  color="black"
                />

                <P className="ml-2.5 font-inter-regular text-[15px] -tracking-wider">
                  Selecione uma forma de autenticação
                </P>
              </View> */}
            </View>

            {/** <View style={{ padding: 24, marginTop: 20 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => push('/auth-with-qrcode')}
                style={[
                  s.button,
                  {
                    backgroundColor: theme !== 'dark' ? zinc[100] : zinc[800],
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  },
                ]}>
                <MaterialCommunityIcons
                  name="qrcode"
                  size={24}
                  color="#305a96"
                />
                <P
                  className="ml-2.5 flex-1 font-inter-medium -tracking-wide"
                  style={{ fontSize: 12 }}>
                  Autenticar com QRCode
                </P>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color="black"
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  s.button,
                  {
                    borderTopWidth: 1,
                    borderTopColor: theme !== 'dark' ? white : zinc[900],
                    backgroundColor: theme !== 'dark' ? zinc[100] : zinc[800],
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                ]}
                onPress={() => push('/auth-with-text/nothing')}>
                <MaterialCommunityIcons
                  name="pencil-box"
                  size={24}
                  color="#305a96"
                />
                <P
                  className="ml-2.5 flex-1 font-inter-medium -tracking-wide"
                  style={{ fontSize: 12 }}>
                  Autenticar por texto
                </P>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color="black"
                />
              </TouchableOpacity>
            </View> */}

            <AddUserForm onSuccess={() => console.log('success')}>
              <></>
            </AddUserForm>
          </View>
        </>
      ) : (
        <Redirect href="/home" />
      )}
    </SafeAreaView>
  )
}
