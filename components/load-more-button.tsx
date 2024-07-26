import { Feather } from '@expo/vector-icons'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'

import { useSize } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { P } from './p'

import { fonts } from '~/styles/fonts'

interface Props {
  isLoading: boolean
}

export function LoadMoreButton({ isLoading }: Props) {
  const { theme } = useTheme()
  const { setSize } = useSize()

  return (
    <Pressable
      style={[
        s.loadMoreButton,
        {
          backgroundColor: theme === 'light' ? '#305a9620' : '#305a9680',
        },
      ]}
      onPress={() => setSize('30')}>
      {isLoading ? (
        <ActivityIndicator color="#305a96" size={18} />
      ) : (
        <Feather name="arrow-up-right" color="#305a96" size={18} />
      )}
      <P style={s.loadMoreButtonTitle}>Carregar + 10 items</P>
    </Pressable>
  )
}

const s = StyleSheet.create({
  loadMoreButton: {
    position: 'relative',
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMoreButtonTitle: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 13,
  },
})
