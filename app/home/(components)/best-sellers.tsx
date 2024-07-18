import { memo, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import colors, { green } from 'tailwindcss/colors'

import { api } from '~/api/api'
import { currency } from '~/utils/currency'

import { PERIOD } from '~/components/filter'
import { P } from '~/components/p'
import { Shimmer } from '~/components/shimmer'

import { useBranch } from '~/hooks/use-branch'
import { useFetch } from '~/hooks/use-fetch'
import { useTheme } from '~/hooks/use-theme'
import { useShow } from '~/hooks/use-filters'

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
    <FlatList
      data={
        [
          'rankingmarca',
          'rankingproduto',
          'rankingcategoria',
          'rankingfilial',
        ] as BestSeller[]
      }
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      style={{
        paddingHorizontal: 24,
        paddingBottom: 32,
      }}
      renderItem={({ item }) => <Card key={item} from={item} />}
    />
  )
}

function Card(props: { from: BestSeller }) {
  const { theme } = useTheme()
  const { branch } = useBranch()
  const { show } = useShow()

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

  return ITEM ? (
    <View
      style={[
        s.button,
        {
          borderColor: themes[theme].border,
          borderBottomWidth: 1,
        },
      ]}>
      <View>
        <P style={[{ color: themes[theme].textForeground }, s.buttonTitle]}>
          {TITLE[props.from]}
        </P>

        {isLoading ? (
          <Shimmer width={100} height={24} />
        ) : (
          <P
            style={[
              {
                fontSize: 16,
                lineHeight: 24,
                textTransform: 'capitalize',
                fontFamily: fonts['inter-medium'],
                letterSpacing: -0.025,
              },
            ]}>
            {props.from === 'rankingfilial'
              ? ITEM.filial.nomeFantasia
              : ITEM[NAME[props.from]]}
          </P>
        )}
      </View>

      {isLoading ? (
        <Shimmer width={100} height={24} />
      ) : (
        <P style={s.buttonPrice}>{show ? currency(ITEM.valorTotal) : '-'}</P>
      )}
    </View>
  ) : null
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  buttonTitle: {
    fontSize: 10,
    lineHeight: 24,
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.025,
    marginBottom: 12,
  },
  buttonPrice: {
    fontFamily: fonts['urbanist-semibold'],
    fontSize: 18,
    letterSpacing: -0.25,
    color: colors.green[500],
  },
})

export const BestSellers = memo(UnmemoizedBestSellers)
