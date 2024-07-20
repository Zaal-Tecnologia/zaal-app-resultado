import { View } from 'react-native'
import { Stack } from 'expo-router'

import { Support } from '~/components/support'
import { Theme } from '~/components/theme'
import { Separator } from '~/components/separator'

import { UserManagement } from './components/user-management'
import { LogoutOfAnAccount } from './components/log-out-of-an-account'

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ headerTitle: 'Perfil & Configurações' }} />

      <UserManagement />

      <View style={{ padding: 24 }}>
        <Separator />

        <Support />

        <Separator />

        <Theme />

        <Separator />

        <LogoutOfAnAccount />
      </View>
    </>
  )
}
