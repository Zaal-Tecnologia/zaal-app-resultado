import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

export function ProductCard() {
  return (
    <Link asChild href="/ranking-product">
      <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }}>
        <LinearGradient
          colors={['#305c99', '#305a80']}
          style={{
            borderBottomLeftRadius: 24,
            height: 96,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          {/* <View className="ml-8 h-12 w-12 items-center justify-center rounded-full bg-white">
          <Ionicons name="arrow-forward" color="#305a96" size={16} />
          </View> */}

          <Text className="font-inter-semibold text-[12px] text-white">
            PRODUTOS
          </Text>

          <Feather
            name="arrow-up-right"
            color="#fff"
            style={{ position: 'absolute', top: 15, right: 15 }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </Link>
  )
}
