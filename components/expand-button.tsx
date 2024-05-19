import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import { useFilter } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

export function ExpandButton() {
  const { setFilter, filter } = useFilter()
  const { BORDER_PRIMARY, BACKGROUND_SECONDARY } = useTheme()

  return (
    <Pressable
      onPress={() => setFilter({ EXPAND: !filter.EXPAND })}
      style={{
        borderColor: BORDER_PRIMARY,
        backgroundColor: BACKGROUND_SECONDARY,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        borderWidth: 1,
      }}>
      <Ionicons name="expand" color="#305a96" size={18} />
    </Pressable>
  )
}
