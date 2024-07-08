import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export function ProductCard() {
  return (
    <Link asChild href="/ranking-product">
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ borderBottomLeftRadius: 40, borderRadius: 4 }}
        className="mr-2 h-80 flex-1 items-start justify-evenly bg-[#305a96] py-10">
        <View className="ml-8 h-12 w-12 items-center justify-center rounded-full bg-white">
          <Ionicons name="arrow-forward" color="#305a96" size={16} />
        </View>

        <Text className="ml-8 font-inter-semibold text-[12px] text-white">
          PRODUTOS
        </Text>
      </TouchableOpacity>
    </Link>
  )
}
