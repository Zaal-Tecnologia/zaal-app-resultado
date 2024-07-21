import { Pressable, View } from 'react-native'
import { Stack } from 'expo-router'

import { Support } from '~/components/support'
import { Theme } from '~/components/theme'
import { Separator } from '~/components/separator'

import { UserManagement } from './components/user-management'
import { LogoutOfAnAccount } from './components/log-out-of-an-account'
import { useTheme } from '~/hooks/use-theme'
import { Feather } from '@expo/vector-icons'
import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'
import { P } from '~/components/p'
import { createContext, useCallback, useRef, useState } from 'react'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type UserManagementContextData = {
  isUp: boolean
  setIsUp(isUp: boolean): void
}

export const UserManagementContext = createContext(
  {} as UserManagementContextData,
)

export default function Profile() {
  const ref = useRef<BottomSheetModal>(null)
  const rotation = useSharedValue(0)

  const { theme } = useTheme()

  const [isUp, setIsUp] = useState(false)

  const handleOpenUserManagementBottomSheet = useCallback(
    (value: boolean) => {
      if (value) ref.current?.present()
      if (!value) ref.current?.close()

      rotation.value = withTiming(value ? 180 : 0, { duration: 300 })

      setIsUp(value)
    },
    [rotation],
  )

  return (
    <UserManagementContext.Provider
      value={{ isUp, setIsUp: handleOpenUserManagementBottomSheet }}>
      <Stack.Screen options={{ headerTitle: 'Perfil & Configurações' }} />

      <UserManagement rotation={rotation} ref={ref} />

      <View style={{ padding: 24 }}>
        <Pressable
          style={{
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => handleOpenUserManagementBottomSheet(!isUp)}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              width: 40,
            }}>
            <Feather
              name="users"
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
              Gerenciar e adicionar usuários
            </P>
            <P
              style={{
                marginLeft: 12,
                fontFamily: fonts['inter-medium'],
                fontSize: 9,
                color: colors.zinc[500],
              }}>
              Gerencie todos os usuários logados ou adicione um
            </P>
          </View>

          <Feather
            name="arrow-up-right"
            style={{ marginLeft: 'auto' }}
            color={theme === 'dark' ? colors.white : colors.black}
            size={14}
          />
        </Pressable>

        <Separator />

        <Support />

        <Separator />

        <Theme />

        <Separator />

        <LogoutOfAnAccount />
      </View>
    </UserManagementContext.Provider>
  )
}
