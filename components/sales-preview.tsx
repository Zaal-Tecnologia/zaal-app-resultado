import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'

import { api } from '~/api/api'

import { currency } from '~/utils/currency'

import { useBranch } from '~/hooks/use-branch'
import { useTheme } from '~/hooks/use-theme'
import { useFetch } from '~/hooks/use-fetch'
import { useShow } from '~/hooks/use-filters'

import { Shimmer } from './shimmer'
import { Button } from './button'
import { Icon } from './icon'
import { P } from './p'

import { themes } from '~/styles/themes'
import { fonts } from '~/styles/fonts'

import type { TotalSalesResponseDTO } from '~/types/total-sales-response-dto'

export function SalesPreview() {
  const { theme } = useTheme()
  const { show } = useShow()
  const { push } = useRouter()
  const { branch } = useBranch()

  const { data, isLoading } = useFetch<TotalSalesResponseDTO>(
    ['get-sales-query', String(branch?.id)],
    async (authorization) => {
      const response = await api(
        branch.id !== 0
          ? `vendatotal?codigoFilial=${branch?.id}`
          : 'vendatotal',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization,
          },
        },
      )

      return await response.json()
    },
  )

  const total = useMemo(() => {
    if (data) {
      const { diaCorrente, mesCorrente, semanaCorrente } = data

      const month = mesCorrente.reduce((acc, curr) => acc + curr.valorTotal, 0)

      const week = semanaCorrente[0] ? semanaCorrente[0].valorTotal : 0

      const day = diaCorrente[0] ? diaCorrente[0].valorTotal : 0

      return { month, week, day }
    }
  }, [data])

  return (
    <View style={s.container}>
      <Button style={s.monthButton} onPress={() => push('/sales-details/MÊS')}>
        <View style={s.monthButtonHeader}>
          <P style={s.monthButtonTitle}>vendas</P>

          <Icon name="chevron-forward" size={12} />
        </View>

        {isLoading ? (
          <Shimmer width={200} height={44} />
        ) : (
          <P style={[s.buttonPrice, { fontSize: 44 }]}>
            {show ? currency(total?.month) : '-'}
          </P>
        )}
      </Button>

      <Button
        style={[
          s.button,
          {
            borderColor: themes[theme].border,
            borderBottomWidth: 1,
          },
        ]}
        onPress={() => push('/sales-details/SEMANA')}>
        <P style={[{ color: themes[theme].textForeground }, s.buttonTitle]}>
          Vendas {'\n'}Dessa Semana
        </P>

        {isLoading ? (
          <Shimmer width={100} height={24} />
        ) : (
          <P style={s.buttonPrice}>{show ? currency(total?.week) : '-'}</P>
        )}
      </Button>

      <Button
        style={[{ marginBottom: 20 }, s.button]}
        onPress={() => push('/sales-details/DIA')}>
        <P
          style={[
            {
              color: themes[theme].textForeground,
            },
            s.buttonTitle,
          ]}>
          Vendas {'\n'}De Hoje
        </P>

        {isLoading ? (
          <Shimmer width={100} height={24} />
        ) : (
          <P style={s.buttonPrice}>{show ? currency(total?.day) : '-'}</P>
        )}
      </Button>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  monthButton: {
    marginTop: 20,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  monthButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  monthButtonTitle: {
    fontFamily: fonts['inter-semibold'],
    fontSize: 9,
    textTransform: 'uppercase',
    marginRight: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  buttonTitle: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: fonts['inter-medium'],
    letterSpacing: -0.025,
  },
  buttonPrice: {
    fontFamily: fonts['urbanist-semibold'],
    fontSize: 18,
    letterSpacing: -0.25,
  },
})
