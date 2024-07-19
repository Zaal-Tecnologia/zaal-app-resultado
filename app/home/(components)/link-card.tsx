/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

import { Button } from '~/components/button'

import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

type Props = {
  from: 'CATEGORIAS' | 'PRODUTOS' | 'FILIAIS' | 'MARCAS'
  style?: StyleProp<ViewStyle>
}

const COLORS = {
  PRODUTOS: ['#305c99', '#105c96'],
  CATEGORIAS: ['#699DC6', '#699Dd1'],
  FILIAIS: ['#50B72B', '#50B75B'],
  MARCAS: ['#A079C8', '#A079F8'],
}

const LINKS = {
  PRODUTOS: '/ranking-product',
  CATEGORIAS: '/ranking-category',
  FILIAIS: '/ranking-branch',
  MARCAS: '/ranking-brand',
} as const

export function LinkCard({ from, style }: Props) {
  const { push } = useRouter()

  return (
    <Button style={s.container} onPress={() => push(LINKS[from])}>
      <LinearGradient colors={COLORS[from]} style={[s.gradient, style]}>
        <Text style={s.title}>{from}</Text>

        <Feather name="arrow-up-right" color="#fff" style={s.icon} />
      </LinearGradient>
    </Button>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    flex: 1,
    marginBottom: 4,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
    borderRadius: 12,
  },
  title: {
    fontFamily: fonts['inter-semibold'],
    fontSize: 12,
    color: colors.white,
  },
  icon: { position: 'absolute', top: 15, right: 15 },
})
