import { Redirect, Stack } from 'expo-router'
import { Image, SafeAreaView, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useUsers } from '~/hooks/use-users'

import { P } from '~/components/p'
import { AddUserForm } from '~/components/add-user-form'
import { fonts } from '~/styles/fonts'

export default function Home() {
  const { user } = useUsers()
  const { top } = useSafeAreaInsets()

  return (
    <SafeAreaView style={{ paddingTop: top, flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />

      {!user ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
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
                style={{
                  marginHorizontal: 32,
                  marginTop: 40,
                  fontSize: 32,
                  fontFamily: fonts['urbanist-regular'],
                }}>
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

            <AddUserForm />
          </View>
        </ScrollView>
      ) : (
        <Redirect href="/home/" />
      )}
    </SafeAreaView>
  )
}
