import { Redirect, Stack, useRouter } from 'expo-router'

// import { useSession } from '~/hooks/use-session'
import { useUsers } from '~/hooks/use-users'

import { AddUserForm } from '~/components/add-user-form'
import { P } from '~/components/p'
import { StatusBar } from 'expo-status-bar'
import { useMMKVString } from 'react-native-mmkv'
import { Image } from 'react-native'

export default function Home() {
  // const { user } = useSession()
  const { user } = useUsers()
  const { push } = useRouter()

  const [theme] = useMMKVString('zaal-result-theme', undefined)

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />

      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      {!user ? (
        <AddUserForm onSuccess={() => push('/home')}>
          <Image
            source={require('../assets/icon.png')}
            style={{ height: 80, width: 80, marginTop: 40 }}
            alt=""
          />

          <P className="mt-10 font-urbanist-regular text-[32px] -tracking-wide">
            Seja bem-vindo ao Zaal Resultado
          </P>
        </AddUserForm>
      ) : (
        <Redirect href="/home" />
      )}
    </>
  )
}
