import { Pressable, StyleSheet } from 'react-native'

import { useShow } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { themes } from '~/styles/themes'

import { Icon } from './icon'

export function FilterShow() {
  const { setShow, show } = useShow()
  const { theme } = useTheme()

  return (
    <Pressable
      style={[
        {
          borderColor: themes[theme].border,
          backgroundColor: themes[theme].foreground,
        },
        s.singleButtonContainer,
      ]}
      onPress={() => setShow(!show)}>
      <Icon name={!show ? 'eye' : 'eye-off'} color="#305a96" size={16} />
    </Pressable>
  )
}

const s = StyleSheet.create({
  singleButtonContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
  },
})
