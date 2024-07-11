/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'

import { api } from '~/api/api'

import { Chart } from '~/components/chart'
import { P } from '~/components/p'
import { Sheet } from '~/components/sheet'
import {
  Filter,
  FilterChart,
  FilterPeriod,
  FilterShow,
  PERIOD,
} from '~/components/filter'

import { useFetch } from '~/hooks/use-fetch'
import {
  useChart,
  useExpand,
  usePeriod,
  useShow,
  useVariant,
} from '~/hooks/use-filters'
import { useSelected } from '~/hooks/use-selected'
import { useSheet } from '~/hooks/use-sheet'

import { CHART_SIZE } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'
import { currency } from '~/utils/currency'

import type { TotalSalesDTO } from '~/types/total-sales-dto'
import { Container } from '~/components/Container'
import { Header } from '~/components/header'

type SalesByPeriod = {
  color: string
  indice: number
  id: number
  posicao: string
  quantidadeTotal: number
  valorTotal: number
}

const PERIOD_WEEK = {
  1: 'DOM.',
  2: 'SEG.',
  3: 'TER.',
  4: 'QUA.',
  5: 'QUI.',
  6: 'SEX.',
  7: 'SÁB.',
} as const

export default function SalesDetails() {
  const { to } = useLocalSearchParams() as { to: [string, string, string] }

  const [url, param, name] = to

  const { data, isLoading } = useFetch<TotalSalesDTO>(
    ['get-details-from-sales-query', url],
    async (authorization, branch) => {
      const response = await api(`${url}${branch}&${param}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  const sheetRef = useSheet()
  const { period } = usePeriod()
  const { expand } = useExpand()
  const { show } = useShow()
  const { chart } = useChart()
  const { variant } = useVariant()

  const dataByPeriod: SalesByPeriod[] | false = useMemo(
    () =>
      (data as { status: number })?.status !== 404
        ? data
          ? data[PERIOD.SALES[period!]].length === 0
            ? false
            : data[PERIOD.SALES[period!]].map((item, index) => ({
                ...item,
                id: item.indice,
                posicao:
                  period === 'SEMANA'
                    ? // @ts-ignore
                      `${PERIOD_WEEK[item.indice]}`
                    : period === 'MÊS'
                      ? `SEM. ${item.indice}`
                      : period === 'DIA'
                        ? `${item.indice}H`
                        : '',
                color: COLORS[index],
              }))
          : false
        : false,
    [data, period],
  )

  const { selected, setSelected } = useSelected()

  const TOTAL = useMemo(() => {
    if (dataByPeriod) {
      return dataByPeriod.reduce((acc, curr) => acc + curr.valorTotal, 0)
    }
  }, [dataByPeriod])

  useEffect(() => {
    if (!dataByPeriod) setSelected(null)
  }, [dataByPeriod, setSelected])

  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (dataByPeriod) setChartData(dataByPeriod)
  }, [dataByPeriod])

  const CHART_COMPONENT = useMemo(
    () => ({
      ROSCA: <Chart.Pie data={chartData} innerRadius={CHART_SIZE / 2.5} />,
      PIZZA: <Chart.Pie data={chartData} innerRadius={0} />,
      'B. HORIZONTAL': <Chart.Bar data={chartData} horizontal />,
      'B. VERTICAL': <Chart.Bar data={chartData} />,
    }),
    [chartData],
  )

  return (
    <Container>
      <Header.Root style={{ paddingHorizontal: 24 }}>
        <Header.Back>
          VENDAS DE {name.length > 15 ? `${name.slice(0, 15)}...` : name}
        </Header.Back>

        <Header.Content />
      </Header.Root>

      {expand ? null : (
        <>
          <P className="px-6 font-urbanist-semibold text-[24px]">
            {show ? currency(TOTAL) : '-'}
          </P>

          <Filter className="my-10">
            <FilterShow />
            <FilterPeriod />
            <FilterChart />
          </Filter>
        </>
      )}

      {isLoading ? (
        <View className="flex-1 flex-row items-center justify-center">
          <ActivityIndicator color="#305a96" />
          <P className="ml-5 font-inter-semibold text-xs uppercase">
            CARREGANDO...
          </P>
        </View>
      ) : (
        <>
          {!dataByPeriod ? (
            <Chart.Empty />
          ) : (
            <>
              {/* <Average
                bigger={
                  dataByPeriod
                    ? currency(dataByPeriod[dataByPeriod.length - 1].valorTotal)
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
              /> */}

              {/** <View style={styles.sliderContainer}>
                <CustomSlider
                  range={[0, dataByPeriod.length]}
                  maximumValue={dataByPeriod.length}
                  onValueChange={onSlideValueChange}
                />
              </View> */}

              <View
                className="relative flex-1 items-center justify-center"
                style={{
                  marginTop: chart === 'PIZZA' || chart === 'ROSCA' ? 56 : 0,
                }}>
                {CHART_COMPONENT[chart!]}
              </View>
            </>
          )}

          {chart === 'PIZZA' || chart === 'ROSCA' ? (
            <View className="flex-1" />
          ) : null}

          <Sheet.Root
            ref={sheetRef}
            index={!dataByPeriod ? 0 : selected || expand ? 1 : 2}>
            <View
              className="h-16 w-full flex-row items-center"
              style={{
                backgroundColor: '#305a9620',
              }}>
              <View className="h-full w-[20%] items-center justify-center">
                <P className="font-inter-semibold text-xs">POS.</P>
              </View>

              <View className="h-full w-[50%] items-start justify-center">
                <P className="font-inter-semibold text-xs">QUANTIDADE TOTAL</P>
              </View>

              <View className="h-full w-[30%] items-start justify-center">
                <P className="font-inter-semibold text-xs">VALOR</P>
              </View>

              {/** <View className="h-full w-[20%] items-start justify-center">
        <P className="font-inter-medium text-xs">QUANTIDADE</P>
      </View> */}
            </View>

            <Sheet.List
              data={!chartData ? [] : chartData}
              keyExtractor={(item) => item.posicao}
              renderItem={({ item }) => (
                <Sheet.ListRow
                  onPress={() => setSelected(!selected ? item : null)}>
                  <Sheet.ListColor color={item.color} />

                  <Sheet.ListItem className="w-[20%] items-center">
                    <Sheet.ListItemTitle>{item.posicao}</Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem className="w-[50%]">
                    <Sheet.ListItemTitle className="font-inter-medium">
                      {item.quantidadeTotal}
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>

                  <Sheet.ListItem>
                    <Sheet.ListItemTitle>
                      {variant === 'QTD'
                        ? item.quantidadeTotal
                        : ` ${currency(item.valorTotal)}`}
                    </Sheet.ListItemTitle>
                  </Sheet.ListItem>
                </Sheet.ListRow>
              )}
            />
          </Sheet.Root>
        </>
      )}
    </Container>
  )
}
