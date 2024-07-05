import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red, white } from 'tailwindcss/colors'
import { Link } from 'expo-router'

import { api } from '~/api/api'

import { Filter, PERIOD, VARIANT } from '~/components/filter'

import { Chart } from '~/components/chart'
import { Sheet } from '~/components/sheet'
import { P } from '~/components/p'

import { currency } from '~/utils/currency'
import { COLORS } from '~/utils/colors'

import { useFilter } from '~/hooks/use-filters'
import { useFetch } from '~/hooks/use-fetch'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { CHART_SIZE, HEIGHT, WIDTH } from '~/utils/chart-size'

import type { RankingProductDTO } from '~/types/ranking-product-dto'
import { Average } from '~/components/average'
import { CustomSlider } from '~/components/custom-slider'
import { Container } from '~/components/Container'
import { Header } from '~/components/header'
import { useTheme } from '~/hooks/use-theme'

type ByPeriod = {
  color: string
  id: number
  produtoNome: string
  localId: string
  posicao: string
  quantidadeTotal: number
  valorTotal: number
}

let updateTimeout: NodeJS.Timeout

export default function Product() {
  const sheetRef = useSheet()
  const { filter } = useFilter()
  const { BACKGROUND_SECONDARY } = useTheme()

  const { data, isLoading, refetch } = useFetch<RankingProductDTO>(
    ['get-product-ranking-query', filter.SIZE, filter.VARIANT],
    async (authorization, branch) => {
      const response = await api(`rankingproduto${branch}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const dataByPeriod: ByPeriod[] | false = useMemo(
    () =>
      data
        ? data[PERIOD.PRODUCT[filter.PERIOD!]].length === 0
          ? false
          : data[PERIOD.PRODUCT[filter.PERIOD!]].map((item, index) => ({
              ...item,
              id: item.produtoId,
              posicao: `${item.posicao}°`,
              color: COLORS[index],
            }))
        : false,
    [data, filter.PERIOD],
  )

  const { selected, setSelected } = useSelected<ByPeriod>()

  const TOTAL = useMemo(() => {
    if (dataByPeriod) {
      return dataByPeriod.reduce((acc, curr) => acc + curr.valorTotal, 0)
    }
  }, [dataByPeriod])

  const [chartData, setChartData] = useState<ByPeriod[]>([])

  const onSlideValueChange = useCallback(
    (value: [number, number]) => {
      if (dataByPeriod) {
        clearTimeout(updateTimeout)

        updateTimeout = setTimeout(() => {
          setChartData(dataByPeriod.slice(value[0], value[1]))
        }, 500)
      }
    },
    [dataByPeriod],
  )

  useEffect(() => {
    if (dataByPeriod) setChartData(dataByPeriod)
  }, [dataByPeriod])

  useEffect(() => {
    if (!dataByPeriod) setSelected(null)
  }, [dataByPeriod, setSelected])

  const CHART_COMPONENT = useMemo(
    () => ({
      ROSCA: (
        <Chart.Pie
          data={chartData}
          y={VARIANT[filter.VARIANT!]}
          selected={selected?.id}
          innerRadius={CHART_SIZE / 2.5}
        />
      ),
      PIZZA: (
        <Chart.Pie
          data={chartData}
          y={VARIANT[filter.VARIANT!]}
          selected={selected?.id}
          innerRadius={0}
        />
      ),
      'B. HORIZONTAL': (
        <Chart.Bar
          selected={selected?.id}
          data={chartData}
          horizontal
          y={VARIANT[filter.VARIANT!]}
        />
      ),
      'B. VERTICAL': (
        <Chart.Bar
          selected={selected?.id}
          data={chartData}
          y={VARIANT[filter.VARIANT!]}
        />
      ),
    }),
    [chartData, filter.VARIANT, selected?.id],
  )

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ height: HEIGHT, width: WIDTH }}
        scrollEnabled={false}
        refreshControl={
          filter.CHART !== 'B. HORIZONTAL' ? (
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          ) : undefined
        }>
        <Header.Root style={{ paddingHorizontal: 24 }}>
          <Header.Back>PRODUTOS</Header.Back>
          <Header.Content />
        </Header.Root>

        {filter.EXPAND ? null : (
          <>
            <P className="px-6 font-urbanist-semibold text-[24px]">
              {filter.SHOW ? currency(TOTAL) : '-'}
            </P>

            <Filter.Root className="my-10">
              <Filter.Show />
              <Filter.Period />
              <Filter.Variant />
              <Filter.Chart />
            </Filter.Root>
          </>
        )}

        {isLoading ? (
          <View className="flex-1 flex-row items-center justify-center">
            <ActivityIndicator color="#305a96" />
            <P className="ml-5 font-inter-semibold text-xs uppercase">
              CARREGANDO PRODUTOS...
            </P>
          </View>
        ) : (
          <>
            {!dataByPeriod ? (
              <Chart.Empty />
            ) : (
              <>
                <Average
                  bigger={
                    dataByPeriod
                      ? currency(
                          dataByPeriod[dataByPeriod.length - 1].valorTotal,
                        )
                      : ' 0'
                  }
                  average={
                    dataByPeriod && TOTAL
                      ? currency(TOTAL / dataByPeriod.length)
                      : ' 0'
                  }
                  smaller={
                    dataByPeriod ? currency(dataByPeriod[0].valorTotal) : ' 0'
                  }
                />

                <View style={styles.sliderContainer}>
                  <CustomSlider
                    range={[0, dataByPeriod.length]}
                    maximumValue={dataByPeriod.length}
                    onValueChange={onSlideValueChange}
                  />
                </View>

                <View
                  className="relative flex-1 items-center justify-center"
                  style={{
                    marginTop:
                      filter.CHART === 'PIZZA' || filter.CHART === 'ROSCA'
                        ? 56
                        : 0,
                  }}>
                  {CHART_COMPONENT[filter.CHART!]}
                </View>
              </>
            )}

            {filter.CHART === 'PIZZA' || filter.CHART === 'ROSCA' ? (
              <View className="flex-1" />
            ) : null}

            <Sheet.Root
              ref={sheetRef}
              index={!dataByPeriod ? 0 : selected || filter.EXPAND ? 3 : 1}>
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
                      <Ionicons
                        name="chevron-down"
                        size={16}
                        color={red[500]}
                      />
                    </TouchableOpacity>
                  </View>

                  <P className="my-10 font-urbanist-semibold text-2xl capitalize">
                    {selected.produtoNome}
                  </P>

                  <View className="flex-row items-center">
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

                  <Link
                    asChild
                    href={`/details/vendaproduto/codigoProduto=${selected.id}/${selected.produtoNome}`}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="mt-10 h-14 flex-row items-center justify-center rounded-lg border-4 border-[#305a96]/20 bg-[#305a96] px-2.5">
                      <Text className="mr-2.5 font-inter-semibold text-xs text-white">
                        VER MAIS DETALHES
                      </Text>
                      <Ionicons name="arrow-forward" size={16} color={white} />
                    </TouchableOpacity>
                  </Link>
                </View>
              ) : (
                <>
                  <Sheet.Header />

                  <Sheet.List
                    data={!chartData ? [] : chartData}
                    keyExtractor={(item) => item.produtoNome}
                    renderItem={({ item }) => (
                      <Sheet.ListRow
                        onPress={() =>
                          setSelected((prev) => (!prev ? item : null))
                        }>
                        <Sheet.ListColor color={item.color} />

                        <Sheet.ListItem className="w-[20%] items-center">
                          <Sheet.ListItemTitle>
                            {item.posicao}
                          </Sheet.ListItemTitle>
                        </Sheet.ListItem>

                        <Sheet.ListItem className="w-[50%]">
                          <Sheet.ListItemTitle className="font-inter-medium">
                            {item.produtoNome}
                          </Sheet.ListItemTitle>
                        </Sheet.ListItem>

                        <Sheet.ListItem>
                          <Sheet.ListItemTitle>
                            {filter.VARIANT === 'QUANTIDADE'
                              ? item.quantidadeTotal
                              : ` ${currency(item.valorTotal)}`}
                          </Sheet.ListItemTitle>
                        </Sheet.ListItem>
                      </Sheet.ListRow>
                    )}
                  />
                </>
              )}
            </Sheet.Root>
          </>
        )}
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 40,
    marginTop: 10,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 50,
  },
})
