import { View, Pressable } from 'react-native'

import { Icon } from '~/components/icon'
import { P } from '~/components/p'

import { useUsers } from '~/hooks/use-users'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

export function LogoutOfAnAccount() {
  const { users, user, onRemoveActiveUser } = useUsers()

  return users && users.length > 0 ? (
    <Pressable
      style={{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onRemoveActiveUser}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          width: 40,
        }}>
        <Icon name="log-out" color={colors.red[500]} size={18} />
      </View>

      <View>
        <P
          style={{
            marginLeft: 12,
            fontFamily: fonts['inter-semibold'],
            fontSize: 12,
            letterSpacing: -0.35,
            color: colors.red[500],
          }}>
          Sair
        </P>
        <P
          style={{
            marginLeft: 12,
            fontFamily: fonts['inter-medium'],
            fontSize: 9,
            color: colors.red[400],
          }}>
          Sair apenas de {user?.userName}
        </P>
      </View>
    </Pressable>
  ) : null
}
