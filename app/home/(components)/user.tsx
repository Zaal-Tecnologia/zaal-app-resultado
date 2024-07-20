import { useRouter } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { Button } from '~/components/button'
import { Greeting } from '~/components/greeting'
import { Icon } from '~/components/icon'
import { P } from '~/components/p'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

import { fonts } from '~/styles/fonts'

export function User() {
  const { theme } = useTheme()
  const { user } = useUsers()
  const { push } = useRouter()

  return (
    <Button
      style={[
        s.container,
        { backgroundColor: colors.zinc[theme === 'light' ? 100 : 800] },
      ]}
      onPress={() => push('/profile/')}>
      <Image
        alt=""
        source={require('../../../assets/logo-fundo-preto.png')}
        resizeMode="contain"
        style={s.image}
      />

      <View style={{ marginLeft: 12 }}>
        <Greeting />
        <P style={s.name}>{user?.userName.split(' ')[0]}</P>
      </View>

      <Icon name="chevron-forward" size={18} style={{ marginLeft: 32 }} />
    </Button>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 12,
    borderRadius: 999,
  },
  image: {
    height: 40,
    width: 40,
  },
  name: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 14,
    letterSpacing: -0.025,
    textTransform: 'capitalize',
  },
})
