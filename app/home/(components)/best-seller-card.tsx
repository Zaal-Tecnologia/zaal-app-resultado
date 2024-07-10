import { MaterialIcons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { green } from 'tailwindcss/colors'

import { api } from '~/api/api'

import { PERIOD } from '~/components/filter'
import { P } from '~/components/p'

import { useBranch } from '~/hooks/use-branch'
import { useFetch } from '~/hooks/use-fetch'
import { useTheme } from '~/hooks/use-theme'

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

export function BestSellerCard(props: {
  from: 'rankingmarca' | 'rankingproduto' | 'rankingcategoria' | 'rankingfilial'
}) {
  const { BACKGROUND_SECONDARY } = useTheme()
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
        style={{
          minHeight: 80,
          minWidth: 200,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderRadius: 8,
          backgroundColor: BACKGROUND_SECONDARY,
          marginRight: 12,
          padding: 16,
        }}></View>
    )
  }

  return (
    <View
      style={{
        height: 80,
        width: 200,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: BACKGROUND_SECONDARY,
        borderRadius: 8,
        marginRight: 12,
        padding: 16,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <MaterialIcons name="show-chart" size={16} color={green[500]} />
        <Text
          className="font-inter-semibold text-[10px] -tracking-wide"
          style={{ color: green[500] }}>
          {TITLE[props.from]} QUE MAIS VENDE
        </Text>
      </View>
      <P numberOfLines={1} className="font-inter-medium text-sm capitalize">
        {ITEM_NAME}
      </P>
    </View>
  )
}
