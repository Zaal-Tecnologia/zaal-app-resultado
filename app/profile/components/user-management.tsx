/* eslint-disable react/display-name */
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { forwardRef, useContext, useMemo } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { Icon } from '~/components/icon'
import { P } from '~/components/p'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

import { capitalize } from '~/utils/capitalize'
import { LogoutOfAllAccounts } from './log-out-of-all-accounts'
import { Avatar } from './avatar'

import { UserManagementContext } from '..'

type Props = {
  rotation: SharedValue<number>
}

export const UserManagement = forwardRef<BottomSheetModal, Props>(
  ({ rotation }, ref) => {
    const { isUp, setIsUp } = useContext(UserManagementContext)

    const { onChangeUser, user, users } = useUsers()
    const { theme } = useTheme()
    const { push } = useRouter()

    const snapPoints = useMemo(() => ['50%', '55%'], [])

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      }
    })

    const arrayOfUsersRemovingTheAsset = users?.filter((item) => !item.active)

    return user ? (
      <BottomSheetModalProvider>
        <View style={s.header}>
          <Avatar name={user.userName} photo={user.photo} variant="xl" />

          <Pressable
            hitSlop={16}
            style={s.headerContent}
            onPress={() => setIsUp(!isUp)}>
            <View>
              <P style={s.headerContentTitle}>{capitalize(user.userName)}</P>
              <P style={s.headerContentDescription}>
                <P style={{ color: colors.green[500] }}>Ativo</P> • Smartphone
                autorizado
              </P>
            </View>

            <Animated.View style={animatedStyle}>
              <Icon name="chevron-down" size={16} />
            </Animated.View>
          </Pressable>
        </View>

        <BottomSheetModal
          onChange={(value) => setIsUp(value !== -1)}
          snapPoints={snapPoints}
          ref={ref}
          handleStyle={{ display: 'none' }}
          backgroundStyle={{
            borderTopWidth: 1,
            borderColor: colors.zinc[theme === 'dark' ? 800 : 200],
            backgroundColor: theme === 'dark' ? colors.zinc[900] : colors.white,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}>
          <BottomSheetView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => push('/add-users-via-profile')}
                style={[
                  s.sheetButton,
                  {
                    borderColor: colors.zinc[theme === 'dark' ? 800 : 200],
                    borderRightWidth: 1,
                  },
                ]}>
                <Icon name="add" size={20} color="#305a96" />
                <P style={s.sheetTitle}>Novo usuário</P>
              </TouchableOpacity>

              <LogoutOfAllAccounts />
            </View>

            <View style={{ paddingVertical: 24, flex: 1 }}>
              <BottomSheetFlatList
                data={arrayOfUsersRemovingTheAsset}
                keyExtractor={(item) => item.userLastName}
                ListHeaderComponent={
                  <P
                    style={{
                      fontFamily: fonts['inter-semibold'],
                      fontSize: 9,
                      color: colors.zinc[500],
                      marginBottom: 8,
                      marginHorizontal: 24,
                    }}>
                    {arrayOfUsersRemovingTheAsset &&
                    arrayOfUsersRemovingTheAsset.length > 0
                      ? 'OUTRAS CONTAS'
                      : 'NENHUMA OUTRA CONTA ADICIONADA'}
                  </P>
                }
                renderItem={({ item }) => (
                  <View style={s.header}>
                    <Avatar
                      name={item.userName}
                      photo={item.photo}
                      variant="sm"
                    />

                    <Pressable
                      hitSlop={16}
                      style={s.headerContent}
                      onPress={() => onChangeUser(item.userId)}>
                      <View>
                        <P style={[s.headerContentTitle, { fontSize: 14 }]}>
                          {capitalize(item.userName)}
                        </P>
                        <P style={s.headerContentDescription}>
                          <P style={{ color: colors.red[500] }}>Inativo</P> •
                          Smartphone autorizado
                        </P>
                      </View>
                    </Pressable>
                  </View>
                )}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    ) : null
  },
)

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  headerContent: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 24,
  },
  headerContentTitle: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 16,
    letterSpacing: -0.5,
  },
  headerContentDescription: {
    fontFamily: fonts['inter-medium'],
    fontSize: 10,
    color: colors.zinc[500],
    marginTop: 2,
  },
  sheetButton: {
    borderBottomWidth: 1,
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    marginLeft: 12,
    fontFamily: fonts['inter-semibold'],
    fontSize: 12,
    letterSpacing: -0.35,
  },
})
