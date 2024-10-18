import { ComponentProps } from 'react'
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
} from 'victory-native'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { HEIGHT, WIDTH } from '~/utils/chart-size'
import { COLORS } from '~/utils/colors'

import { P } from './p'

import { useExpand, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'
import { useSelected } from '~/hooks/use-selected'
import { formatDependentAxisTicks } from '~/utils/format-dependent-axis-ticks'
import { VARIANT } from '~/constants/variant'
import { fonts } from '~/styles/fonts'

function Empty() {
  return (
    <View
      style={{
        paddingBottom: 200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <P
        style={{
          fontFamily: fonts['inter-medium'],
          fontSize: 24,
          letterSpacing: -0.5,
        }}>
        Vazio!
      </P>
      <View
        style={{
          marginTop: 20,
          width: '80%',
        }}>
        <P
          style={{
            textAlign: 'center',
            fontFamily: 'Inter-Medium',
            fontSize: 12,
            lineHeight: 24,
          }}>
          Sua pesquisa não retornou resultados, talvez esteja no começo do mês
          ainda 😉.
        </P>
      </View>

      <View
        style={{
          marginTop: 20,
          width: '80%',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 16,
          backgroundColor: 'rgba(48, 90, 150, 0.2)',
          padding: 20,
        }}>
        <Feather name="phone-call" size={20} color="#305a96" />
        <P
          style={{
            marginLeft: 20,
            fontFamily: fonts['inter-medium'],
            fontSize: 12,
            lineHeight: 20,
            color: '#305a96',
          }}>
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
    <View style={s.container}>
      <VictoryPie
        data={props.data}
        x="posicao"
        y={VARIANT[variant!]}
        height={WIDTH * 0.9}
        width={WIDTH * 0.9}
        colorScale={COLORS}
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
            fontFamily: 'urbanist-bold',
            fontSize: 12,
          },
        }}
        labels={({ datum, index, data }) => {
          const value = +data[0].percentage.replace('%', '')

          if (value <= 99) {
            if (value <= 60) {
              if (value <= 45) {
                if (value <= 15) {
                  return index % 2 === 0 ? datum.percentage : ''
                }

                return index < 5 ? datum.percentage : ''
              }

              return index < 3 ? datum.percentage : ''
            }

            return index < 2 ? datum.percentage : ''
          } else {
            return datum.percentage
          }
        }}
        {...props}
      />
    </View>
  )
}

function Bar(props: ComponentProps<typeof VictoryBar>) {
  const { expand } = useExpand()
  const { variant } = useVariant()
  const { selected, setSelected } = useSelected()
  const { TEXT_PRIMARY } = useTheme()

  return (
    <ScrollView
      contentContainerStyle={{
        paddingRight: 40,
        paddingLeft: 40,
        paddingBottom: props.horizontal ? HEIGHT - 550 : 0,
      }}
      horizontal={!props.horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <VictoryChart
        domainPadding={{ x: props.horizontal ? 40 : 80, y: 40 }}
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
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: (_, props) => {
                  setSelected(props.datum)
                },
              },
            },
          ]}
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
          labelComponent={
            <VictoryLabel
              dy={!props.horizontal ? 5 : 0}
              dx={!props.horizontal ? 25 : 10}
              angle={!props.horizontal ? -90 : 0}
            />
          }
          labels={({ datum }) =>
            props.data && props.data.length > 10
              ? !props.horizontal
                ? datum.percentage
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
          invertAxis={props.horizontal}
          style={{
            tickLabels: {
              textTransform: 'uppercase',
              fontFamily: 'urbanist-bold',
              fontSize: 10,
              fill: TEXT_PRIMARY,
            },
            ticks: { stroke: 'grey', size: 5 },
            axis: { stroke: 'grey' },
          }}
        />

        <VictoryAxis
          dependentAxis
          // invertAxis={props.horizontal}
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

const s = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const Chart = {
  Pie,
  Bar,
  Empty,
}
