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

import { useExpand, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'
import { VARIANT } from './filter'
import { useSelected } from '~/hooks/use-selected'
import { formatDependentAxisTicks } from '~/utils/format-dependent-axis-ticks'

function Empty() {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ paddingBottom: 200 }}>
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
      labelRadius={({ innerRadius }) =>
        props.innerRadius
          ? innerRadius
            ? innerRadius + 12
            : undefined
          : undefined
      }
      style={{
        ...props.style,
        data: {
          stroke: ({ datum }) =>
            selected && selected.id === datum.id ? datum.color : 'none',
          fill: ({ datum }) => datum.color,
          strokeWidth: 10,
          strokeOpacity: 0.25,
        },
        labels: {
          fontFamily: 'urbanist-semibold',
          fontSize: 12,
        },
      }}
      labels={({ datum, index }) =>
        index % 2 === 0 ? datum.percentage : index < 3 ? datum.percentage : ''
      }
      {...props}
    />
  )
}

function Bar(props: ComponentProps<typeof VictoryBar>) {
  const { expand } = useExpand()
  const { variant } = useVariant()
  const { selected } = useSelected()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <ScrollView
      contentContainerStyle={{
        paddingRight: 40,
        paddingLeft: 40,
        paddingBottom: props.horizontal ? 80 : 0,
      }}
      horizontal={!props.horizontal}
      showsHorizontalScrollIndicator={false}>
      <VictoryChart
        domainPadding={{ x: 80, y: 40 }}
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
                selected && selected.id === datum.id ? datum.color : 'none',
              fill: ({ datum }) => datum.color,
              strokeWidth: 10,
              strokeOpacity: 0.5,
            },
            labels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-bold',
              fontSize: 10,
              fill: TEXT_PRIMARY,
            },
          }}
          labelComponent={<VictoryLabel dy={5} dx={25} angle={-90} />}
          labels={({ datum }) =>
            props.data && props.data.length > 10
              ? !props.horizontal
                ? variant === 'VLR'
                  ? datum.percentage
                  : null
                : datum.percentage
              : datum.percentage
          }
          barWidth={props.data && props.data.length <= 20 ? 18 : 4}
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
            axis: { stroke: 'grey' },
          }}
        />

        <VictoryAxis
          fixLabelOverlap
          dependentAxis
          label={({ datum }) => datum}
          tickFormat={(tick) =>
            variant === 'VLR' ? formatDependentAxisTicks(tick) : tick
          }
          style={{
            tickLabels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-bold',
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
