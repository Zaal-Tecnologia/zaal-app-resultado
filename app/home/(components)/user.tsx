import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { P } from '~/components/p'

import { useTheme } from '~/hooks/use-theme'
import { useUsers } from '~/hooks/use-users'

export function User() {
  const { BACKGROUND_SECONDARY } = useTheme()
  const { user } = useUsers()

  return (
    <Link href="/profile" asChild>
      <TouchableOpacity activeOpacity={0.8} className="flex-row items-center">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: BACKGROUND_SECONDARY }}>
          <Image
            alt=""
            source={require('../../../assets/logo-fundo-preto.png')}
            resizeMode="contain"
            className="h-16 w-16"
          />
        </View>
        <View className="ml-2.5">
          <P className="font-inter-medium text-sm -tracking-wide">
            <Text className="text-zinc-500">Olá, </Text>
            {user?.userLastName.slice(0, 20)}
          </P>
        </View>
      </TouchableOpacity>
    </Link>
  )
}
