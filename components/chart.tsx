import { ComponentProps } from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
} from 'victory-native'
import { ScrollView, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { CHART_SIZE, HEIGHT, WIDTH } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'

import { P } from './p'

import { currency } from '~/utils/currency'
import { useExpand, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'
import { renderTheLabelAboveTheBar } from '~/utils/render-the-label-above-the-bar'
import { VARIANT } from './filter'
import { useSelected } from '~/hooks/use-selected'

function Empty() {
  return (
    <View className="h-screen items-center justify-center pb-20">
      <P className="font-inter-medium text-2xl -tracking-wide">Vazio!</P>
      <View className="mt-5 w-[80%]">
        <P className="text-center font-inter-medium text-xs leading-6 text-zinc-500 dark:text-zinc-400">
          Sua pesquisa não retornou resultados, talvez esteja no começo do mês
          ainda 😉.
        </P>
      </View>

      <View className="mt-5 w-[80%] flex-row items-center rounded-2xl bg-[#305a96]/20 p-5">
        <Feather name="phone-call" size={20} color="#305a96" />
        <P className="ml-5 font-inter-medium text-xs leading-5 text-[#305a96]">
          Caso esteja tendo problemas com a visualização entre em contato com o
          suporte.
        </P>
      </View>
    </View>
  )
}

function Pie(props: ComponentProps<typeof VictoryPie>) {
  const { variant } = useVariant()
  const { selected } = useSelected()

  return (
    <VictoryPie
      data={props.data}
      x="posicao"
      y={VARIANT[variant!]}
      height={CHART_SIZE}
      width={CHART_SIZE}
      innerRadius={props.innerRadius || CHART_SIZE / 2.5}
      colorScale={COLORS}
      labelComponent={<VictoryLabel angle={30} dx={10} />}
      style={{
        ...props.style,
        data: {
          stroke: ({ datum }) =>
            selected && selected === datum.id ? datum.color : 'none',
          fill: ({ datum }) => datum.color,
          strokeWidth: 10,
          strokeOpacity: 0.25,
        },
        labels: {
          display: ({ datum }) => (selected === datum.id ? 'flex' : 'none'),
          fontFamily: 'urbanist-semibold',
          fontSize: 12,
        },
      }}
      {...props}
    />
  )
}

function Bar(props: ComponentProps<typeof VictoryBar>) {
  // const { filter } = useFilter()
  const { expand } = useExpand()
  const { variant } = useVariant()
  const { selected } = useSelected()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <ScrollView
      contentContainerStyle={{
        paddingRight: 40,
        paddingLeft: 20,
        paddingBottom: props.horizontal ? 80 : 0,
      }}
      horizontal={!props.horizontal}
      showsHorizontalScrollIndicator={false}>
      <VictoryChart
        domainPadding={30}
        width={
          !props.horizontal
            ? props.data && props.data.length < 10
              ? WIDTH
              : props.data && props.data.length < 30
                ? WIDTH * 2
                : WIDTH * 3
            : WIDTH
        }
        height={
          !props.horizontal ? (expand ? HEIGHT * 0.65 : HEIGHT * 0.5) : HEIGHT
        }>
        <VictoryBar
          horizontal={props.horizontal}
          alignment="middle"
          style={{
            ...props.style,
            data: {
              stroke: ({ datum }) =>
                selected && selected === datum.id ? datum.color : 'none',
              fill: ({ datum }) => datum.color,
              strokeWidth: 10,
              strokeOpacity: 0.25,
            },
            labels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-bold',
              fontSize: 10,
              fill: TEXT_PRIMARY,
              letterSpacing: -0.5,
            },
          }}
          labels={({ datum, index }) =>
            props.data && props.data.length > 10
              ? !props.horizontal
                ? variant === 'VLR'
                  ? index % 2 === 0
                    ? renderTheLabelAboveTheBar(datum._y)
                    : null
                  : datum._y.toFixed(2).replace('.00', '')
                : renderTheLabelAboveTheBar(datum._y)
              : renderTheLabelAboveTheBar(datum._y)
          }
          barWidth={18}
          colorScale={COLORS}
          data={props.data}
          x="posicao"
          y={VARIANT[variant!]}
          {...props}
        />

        <VictoryAxis
          fixLabelOverlap
          style={{
            tickLabels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-semibold',
              fontSize: 10,
              fill: TEXT_PRIMARY,
            },
            ticks: { stroke: 'grey', size: 5 },
            axis: {
              stroke: 'grey',
            },
          }}
        />

        <VictoryAxis
          fixLabelOverlap
          dependentAxis
          label={({ datum }) => datum}
          tickFormat={(tick) =>
            variant === 'VLR'
              ? tick >= 1000
                ? `${currency(tick / 1000)} K`
                    .replace(',', '.')
                    .replace('.00', '')
                : `${currency(tick).replace('.00', '')}`
              : tick.toFixed(2).replace('.00', '')
          }
          style={{
            tickLabels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-semibold',
              fontSize: 10,
              fill: TEXT_PRIMARY,
            },
            ticks: { stroke: 'grey', size: 5 },
            axis: { stroke: 'grey' },
            grid: { stroke: 'grey', opacity: 0.1 },
          }}
        />
      </VictoryChart>
    </ScrollView>
  )
}

export const Chart = {
  Pie,
  Bar,
  Empty,
}
