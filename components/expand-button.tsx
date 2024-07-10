import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import { useExpand } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

export function ExpandButton() {
  const { expand, setExpand } = useExpand()
  const { BORDER_PRIMARY, BACKGROUND_SECONDARY } = useTheme()

  return (
    <Pressable
      onPress={() => setExpand(!expand)}
      style={{
        borderColor: BORDER_PRIMARY,
        backgroundColor: BACKGROUND_SECONDARY,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        borderWidth: 1,
      }}>
      <Ionicons
        name={expand ? 'contract-sharp' : 'expand-sharp'}
        color="#305a96"
        size={18}
      />
    </Pressable>
  )
}
