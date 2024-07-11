import { Link } from 'expo-router'
import { Image, StyleSheet, Text } from 'react-native'

import { Button } from '~/components/button'
import { P } from '~/components/p'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

export function User() {
  const { theme } = useTheme()
  const { user } = useUsers()

  return (
    <Link href="/profile" asChild>
      <Button style={s.container}>
        <Image
          alt=""
          source={require('../../../assets/logo-fundo-preto.png')}
          resizeMode="contain"
          style={s.image}
        />

        <P style={s.name}>
          <Text style={{ color: themes[theme].textForeground }}>Olá, </Text>
          {user?.userLastName.slice(0, 20)}
        </P>
      </Button>
    </Link>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 44,
    width: 44,
  },
  name: {
    fontFamily: fonts['inter-medium'],
    fontSize: 14,
    marginLeft: 10,
    letterSpacing: -0.025,
  },
})
