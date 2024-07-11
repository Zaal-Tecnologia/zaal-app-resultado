import { MaterialIcons } from '@expo/vector-icons'
import { memo, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { green } from 'tailwindcss/colors'

import { api } from '~/api/api'

import { PERIOD } from '~/components/filter'
import { P } from '~/components/p'

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

  const ITEM_NAME = useMemo(() => {
    if (!(data && data[PERIOD[SELECTOR[props.from]].MÊS].length !== 0))
      return ''

    if (props.from === 'rankingfilial')
      return data[PERIOD[SELECTOR[props.from]].MÊS][0].filial.nomeFantasia

    return data[PERIOD[SELECTOR[props.from]].MÊS][0][NAME[props.from]]
  }, [data, props.from])

  if (isLoading) {
    return (
      <View
        style={[s.loading, { backgroundColor: themes[theme].foreground }]}
      />
    )
  }

  return (
    <View style={[s.card, { backgroundColor: themes[theme].foreground }]}>
      <View style={s.cardHeader}>
        <MaterialIcons name="show-chart" size={16} color={green[500]} />
        <Text style={s.cardTitle}>{TITLE[props.from]} QUE MAIS VENDE</Text>
      </View>

      <P numberOfLines={1} style={s.cardName}>
        {ITEM_NAME}
      </P>
    </View>
  )
}

const s = StyleSheet.create({
  loading: {
    minHeight: 80,
    minWidth: 200,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginRight: 12,
    padding: 16,
  },
  card: {
    height: 80,
    width: 200,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginRight: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
})

export const BestSellers = memo(UnmemoizedBestSellers)
