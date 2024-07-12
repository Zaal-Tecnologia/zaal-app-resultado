import { MaterialIcons } from '@expo/vector-icons'
import { memo, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import colors, { green } from 'tailwindcss/colors'

import { api } from '~/api/api'
import { currency } from '~/utils/currency'

import { PERIOD } from '~/components/filter'
import { P } from '~/components/p'
import { Shimmer } from '~/components/shimmer'

import { useBranch } from '~/hooks/use-branch'
import { useFetch } from '~/hooks/use-fetch'
import { useTheme } from '~/hooks/use-theme'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

const TITLE = {
  rankingmarca: 'MARCA',
  rankingproduto: 'PRODUTO',
  rankingcategoria: 'CATEGORIA',
  rankingfilial: 'FILIAL',
} as const

const SELECTOR = {
  rankingmarca: 'BRAND',
  rankingproduto: 'PRODUCT',
  rankingcategoria: 'CATEGORY',
  rankingfilial: 'BRANCH',
} as const

const NAME = {
  rankingmarca: 'marcaNome',
  rankingproduto: 'produtoNome',
  rankingcategoria: 'categoriaNome',
  rankingfilial: '',
} as const

type BestSeller =
  | 'rankingmarca'
  | 'rankingproduto'
  | 'rankingcategoria'
  | 'rankingfilial'

function UnmemoizedBestSellers() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 32,
      }}>
      {(
        [
          'rankingmarca',
          'rankingproduto',
          'rankingcategoria',
          'rankingfilial',
        ] as BestSeller[]
      ).map((item) => (
        <Card key={item} from={item} />
      ))}
    </ScrollView>
  )
}

function Card(props: { from: BestSeller }) {
  const { theme } = useTheme()
  const { branch } = useBranch()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useFetch<any>(
    [`get-${props.from}-query`, String(branch.id)],
    async (authorization) => {
      const branchCode =
        branch?.id !== 0
          ? `?codigoFilial=${branch.id}&quantidade=1`
          : '?quantidade=1'

      const response = await api(`${props.from}${branchCode}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const ITEM = useMemo(() => {
    if (!(data && data[PERIOD[SELECTOR[props.from]].MÊS].length !== 0))
      return ''

    if (props.from === 'rankingfilial')
      return data[PERIOD[SELECTOR[props.from]].MÊS][0]

    return data[PERIOD[SELECTOR[props.from]].MÊS][0]
  }, [data, props.from])

  if (isLoading) {
    return (
      <Shimmer
        height={80}
        width={200}
        style={[s.card, { backgroundColor: themes[theme].foreground }]}
      />
    )
  }

  return (
    <View style={[s.card, { backgroundColor: themes[theme].foreground }]}>
      <View style={s.cardPriceWrapper}>
        <P style={s.cardPrice}>{currency(ITEM.valorTotal)}/mês</P>
      </View>

      <View style={{ gap: 4 }}>
        <View style={s.cardHeader}>
          <MaterialIcons name="show-chart" size={16} color={green[500]} />
          <Text style={s.cardTitle}>TOP {TITLE[props.from]}</Text>
        </View>

        <P numberOfLines={1} style={s.cardName}>
          {props.from === 'rankingfilial'
            ? ITEM.filial.nomeFantasia
            : ITEM[NAME[props.from]]}
        </P>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  card: {
    minHeight: 120,
    maxWidth: 200,
    minWidth: 200,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  cardTitle: {
    color: green[500],
    fontFamily: fonts['inter-semibold'],
    fontSize: 10,
    letterSpacing: -0.025,
  },
  cardName: {
    fontFamily: fonts['inter-medium'],
    fontSize: 14,
    textTransform: 'capitalize',
  },
  cardPriceWrapper: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#305a96',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPrice: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 12,
    letterSpacing: -0.25,
    color: colors.white,
  },
})

export const BestSellers = memo(UnmemoizedBestSellers)
