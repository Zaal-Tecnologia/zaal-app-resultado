import { Image, Text, View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { zinc } from 'tailwindcss/colors'
import { useMMKVString } from 'react-native-mmkv'

import { P } from './p'
import { Icon } from './icon'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export function InitialPageLoading() {
  const [theme] = useMMKVString('zaal-result-theme', undefined)

  const SHIMMER_COLORS =
    theme === 'dark' ? [zinc[700], zinc[800]] : [zinc[100], zinc[200]]

  return (
    <>
      <View className="mt-10 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{
              backgroundColor: theme === 'dark' ? zinc[700] : zinc[200],
            }}>
            <Image
              alt=""
              source={require('../assets/icon.png')}
              resizeMode="contain"
              className="h-16 w-16"
            />
          </View>
          <View className="ml-2.5">
            <ShimmerPlaceholder width={80} shimmerColors={SHIMMER_COLORS} />
          </View>
        </View>
      </View>

      <View className="mb-5 mt-10 justify-between">
        <View className="my-2.5 flex-row items-center">
          <P className="mr-1 font-inter-semibold text-[9px] uppercase">
            vendas
          </P>

          <Icon name="chevron-forward" size={12} />
        </View>

        <ShimmerPlaceholder
          width={200}
          height={44}
          shimmerColors={SHIMMER_COLORS}
        />
      </View>

      <View
        className="flex-row items-center justify-between border-b py-5"
        style={{ borderColor: theme === 'dark' ? zinc[700] : zinc[200] }}>
        <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
          Vendas {'\n'}Dessa Semana
        </P>

        <ShimmerPlaceholder
          width={100}
          height={24}
          shimmerColors={SHIMMER_COLORS}
        />
      </View>

      <View
        className="mb-5 flex-row items-center justify-between py-5"
        style={{ borderColor: theme === 'dark' ? zinc[700] : zinc[200] }}>
        <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
          Vendas {'\n'}De Hoje
        </P>
        <ShimmerPlaceholder
          width={100}
          height={24}
          shimmerColors={SHIMMER_COLORS}
        />
      </View>

      <View className="h-80 flex-row items-center">
        <View className="mr-2 h-80 flex-1 items-start justify-evenly rounded-xl rounded-bl-[40px] bg-[#305a96] py-10">
          <View className="ml-8 h-12 w-12 items-center justify-center rounded-full bg-white">
            <Ionicons name="arrow-forward" color="#305a96" size={16} />
          </View>

          <Text className="ml-8 font-inter-semibold text-[9px] text-white">
            PRODUTOS
          </Text>
        </View>

        <View className="flex-1">
          <View className="mb-1 h-24 flex-1 items-center justify-center rounded-xl rounded-tr-[32px] bg-[#699DC6]">
            <Text className="mr-1 font-inter-semibold text-[9px] text-white">
              CATEGORIAS
            </Text>
          </View>

          <View className="my-1 h-24 flex-1 items-center justify-center rounded-xl bg-[#50B79B]">
            <Text className="mr-1 font-inter-semibold text-[9px] text-white">
              FILIAIS
            </Text>
          </View>

          <View className="mt-1 h-24 flex-1 items-center justify-center rounded-xl rounded-br-[32px] bg-[#A079F8]">
            <Text className="mr-1 font-inter-semibold text-[9px] text-white">
              MARCAS
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}
