import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'

export function CustomHeaderBackButton() {
  const { back } = useRouter()

  return (
    <Pressable style={s.container} onPress={back} hitSlop={40}>
      <Ionicons name="chevron-back" color="#007AFF" size={20} style={s.icon} />
    </Pressable>
  )
}

const s = StyleSheet.create({
  container: { marginLeft: 12 },
  icon: { marginRight: 20 },
})
