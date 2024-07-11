import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red } from 'tailwindcss/colors'

import { api } from '~/api/api'

import { Chart } from '~/components/chart'
import { P } from '~/components/p'
import { Sheet } from '~/components/sheet'
import { Filter, FilterChart, FilterPeriod, PERIOD } from '~/components/filter'

import { useFetch } from '~/hooks/use-fetch'
import { useChart, useExpand, usePeriod, useShow } from '~/hooks/use-filters'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { CHART_SIZE } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'
import { currency } from '~/utils/currency'

import type { TotalSalesDTO } from '~/types/total-sales-dto'
import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { useTheme } from '~/hooks/use-theme'

export default function SalesDetails() {
  const { period } = useLocalSearchParams() as {
    period: 'MÊS' | 'SEMANA' | 'DIA'
  }

  const sheetRef = useSheet()
  const { period: filterPeriod, setPeriod } = usePeriod()
  const { expand } = useExpand()
  const { show } = useShow()
  const { chart } = useChart()
  const { BACKGROUND_SECONDARY } = useTheme()

  const { data, isLoading } = useFetch<TotalSalesDTO>(
    ['get-total-sales-query'],
    async (authorization, branch) => {
      const response = await api(`vendatotal${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const dataByPeriod = useMemo(() => {
    if (!(data && data[PERIOD.SALES[filterPeriod]].length !== 0)) return false

    return data[PERIOD.SALES[filterPeriod!]].map((item, index) => ({
      ...item,
      id: item.indice,
      posicao: `${item.indice}°`,
      color: COLORS[index],
    }))
  }, [data, filterPeriod])

  const { selected, setSelected } = useSelected()

  const TOTAL = useMemo(() => {
    if (dataByPeriod) {
      return dataByPeriod.reduce((acc, curr) => acc + curr.valorTotal, 0)
    }
  }, [dataByPeriod])

  useEffect(() => {
    if (!dataByPeriod) setSelected(null)
  }, [dataByPeriod, setSelected])

  useEffect(() => {
    if (period) setPeriod(period)
  }, [period, setPeriod])

  const CHART_COMPONENT = useMemo(
    () => ({
      ROSCA: (
        <Chart.Pie data={dataByPeriod || []} innerRadius={CHART_SIZE / 2.5} />
      ),
      PIZZA: <Chart.Pie data={dataByPeriod || []} innerRadius={0} />,
      'B. HORIZONTAL': <Chart.Bar data={dataByPeriod || []} horizontal />,
      'B. VERTICAL': <Chart.Bar data={dataByPeriod || []} />,
    }),
    [dataByPeriod],
  )

  return (
    <Container>
      <Header.Root style={{ paddingHorizontal: 24 }}>
        <Header.Back>VENDAS</Header.Back>
        <Header.Content />
      </Header.Root>

      {expand ? null : (
        <>
          <P className="px-6 font-urbanist-semibold text-[24px]">
            {show ? currency(TOTAL) : '-'}
          </P>

          <Filter className="my-10">
            <FilterPeriod />
            <FilterChart />
          </Filter>
        </>
      )}

      <View className="relative flex-1 items-center justify-center">
        {isLoading ? (
          <View className="flex-1 flex-row items-center justify-center">
            <ActivityIndicator color="#305a96" />
            <P className="ml-5 font-inter-semibold text-xs uppercase">
              CARREGANDO VENDAS...
            </P>
          </View>
        ) : !dataByPeriod ? (
          <Chart.Empty />
        ) : (
          <View
            className="relative flex-1 items-center justify-center"
            style={{
              marginTop: chart === 'PIZZA' || chart === 'ROSCA' ? 56 : 0,
            }}>
            {CHART_COMPONENT[chart!]}
          </View>
        )}
      </View>

      {chart !== 'B. HORIZONTAL' && chart !== 'B. VERTICAL' && (
        <View className="flex-1" />
      )}

      <Sheet.Root
        ref={sheetRef}
        index={!dataByPeriod ? 0 : selected || expand ? 1 : 2}>
        {selected ? (
          <View className="w-full p-10">
            <View className="flex-row items-center justify-between">
              <P className="mr-2.5 font-urbanist-semibold text-2xl">
                {selected.posicao}
              </P>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelected(null)}
                className="h-10 flex-row items-center justify-center rounded-full border border-red-500 px-5">
                <Text className="mr-2 font-inter-semibold text-xs text-red-500">
                  FECHAR
                </Text>
                <Ionicons name="chevron-down" size={16} color={red[500]} />
              </TouchableOpacity>
            </View>

            <View className="mt-10 flex-row items-center">
              <View
                className="mr-1.5 flex-1 rounded-md p-5"
                style={{
                  height: 80,
                  backgroundColor: BACKGROUND_SECONDARY,
                }}>
                <P className="mb-2.5 font-inter-semibold text-xs text-zinc-500">
                  VALOR
                </P>
                <View className="flex-row items-center">
                  <P className="mr-1.5 font-urbanist-semibold text-lg -tracking-wider">
                    {currency(selected.valorTotal)}
                  </P>

                  {TOTAL && (
                    <P
                      className="rounded-full px-4 py-2 font-urbanist-semibold text-xs text-white"
                      style={{ backgroundColor: '#305a96' }}>
                      {((selected.valorTotal / TOTAL) * 100).toFixed(2)}%
                    </P>
                  )}
                </View>
              </View>

              <View
                className="ml-1.5 flex-1 rounded-md bg-zinc-100 p-5"
                style={{
                  height: 80,
                  backgroundColor: BACKGROUND_SECONDARY,
                }}>
                <P className="mb-2.5 font-inter-semibold text-xs text-zinc-500">
                  QUANTIDADE
                </P>
                <View className="flex-row items-center">
                  <P className="mr-1.5 font-urbanist-semibold text-lg -tracking-wider">
                    {selected.quantidadeTotal}
                  </P>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <View className="h-16 w-full flex-row items-center bg-[#305a96]/20">
              <View className="h-full w-[33%] items-center justify-center">
                <P className="font-inter-medium text-xs">SEMANA</P>
              </View>

              <View className="h-full w-[33%] items-start justify-center">
                <P className="font-inter-medium text-xs">VALOR</P>
              </View>

              <View className="h-full w-[33%] items-start justify-center">
                <P className="font-inter-medium text-xs">QUANTIDADE</P>
              </View>
            </View>

            <Sheet.List
              data={!dataByPeriod ? [] : dataByPeriod}
              keyExtractor={(item) => item.posicao}
              renderItem={({ item }) => (
                <Sheet.ListRow
                  onPress={() => setSelected(!selected ? item : null)}>
                  <Sheet.ListColor color={item.color} />

                  <Sheet.ListItem className="w-[33%] items-center">
                    <Sheet.ListItemTitle>{item.posicao}</Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem className="w-[33%]">
                    <Sheet.ListItemTitle>
                      {currency(item.valorTotal)}
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem className="w-[33%]">
                    <Sheet.ListItemTitle>
                      {item.quantidadeTotal.toFixed(2)}
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>
                </Sheet.ListRow>
              )}
            />
          </>
        )}
      </Sheet.Root>
    </Container>
  )
}
