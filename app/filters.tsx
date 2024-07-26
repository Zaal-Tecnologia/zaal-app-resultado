import { useRouter } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'

import { Container } from '~/components/Container'
import { VARIANT } from '~/components/filter'
import { Icon } from '~/components/icon'
import { P } from '~/components/p'

import { useChart, usePeriod, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

export const CHART = {
  ROSCA: 'ROSCA',
  PIZZA: 'PIZZA',
  'B. VERTICAL': 'B. VERTICAL',
  'B. HORIZONTAL': 'B. HORIZONTAL',
} as const

export default function Filters() {
  const { back } = useRouter()
  const { theme } = useTheme()
  const { period, setPeriod } = usePeriod()
  const { variant, setVariant } = useVariant()
  const { chart, setChart } = useChart()

  return (
    <Container>
      <Pressable onPress={back} style={s.filterGoBack}>
        <Icon name="chevron-back" size={14} />
        <P style={s.filterGoBackTitle}>Filtros</P>
      </Pressable>

      <View style={s.container}>
        <P style={s.title}>Período</P>
        <P
          style={[
            s.description,
            {
              color: themes[theme].textForeground,
            },
          ]}>
          Selecione um período no qual você deseja ver o gráfico.
        </P>

        <View style={s.list}>
          {(['MÊS', 'SEMANA', 'DIA'] as ['MÊS', 'SEMANA', 'DIA']).map(
            (item) => (
              <Pressable
                key={item}
                onPress={() => setPeriod(item)}
                style={s.button}>
                <View
                  style={[
                    s.ball,
                    {
                      borderColor:
                        period === item ? '#305a96' : themes[theme].border,
                    },
                  ]}
                />

                <P className="font-inter-semibold text-xs capitalize">{item}</P>
              </Pressable>
            ),
          )}
        </View>

        <View
          style={[
            s.separator,
            {
              backgroundColor: themes[theme].border,
            },
          ]}
        />

        <P style={s.title}>Valor ou quantidade</P>
        <P
          style={[
            s.description,
            {
              color: themes[theme].textForeground,
            },
          ]}>
          Selecione entre valor ou quantidade no qual você deseja ver o gráfico.
        </P>

        <View style={s.list}>
          {(['VLR', 'QNT'] as (keyof typeof VARIANT)[]).map((item) => (
            <Pressable
              key={item}
              onPress={() => setVariant(item)}
              style={s.button}>
              <View
                style={[
                  s.ball,
                  {
                    borderColor:
                      variant === item ? '#305a96' : themes[theme].border,
                  },
                ]}
              />

              <P className="font-inter-semibold text-xs capitalize">
                {item === 'QNT' ? 'QUANTIDADE' : 'VALOR'}
              </P>
            </Pressable>
          ))}
        </View>

        <View
          style={[
            s.separator,
            {
              backgroundColor: themes[theme].border,
            },
          ]}
        />

        <P style={s.title}>Gráfico</P>
        <P
          style={[
            s.description,
            {
              color: themes[theme].textForeground,
            },
          ]}>
          Selecione o gráfico que você quer
        </P>

        <View style={s.list}>
          {(
            [
              'B. VERTICAL',
              'B. HORIZONTAL',
              'ROSCA',
              'PIZZA',
            ] as (keyof typeof CHART)[]
          ).map((item) => (
            <Pressable
              key={item}
              onPress={() => setChart(item)}
              style={s.button}>
              <View
                style={[
                  s.ball,
                  {
                    borderColor:
                      chart === item ? '#305a96' : themes[theme].border,
                  },
                ]}
              />

              <P className="font-inter-semibold text-xs capitalize">{item}</P>
            </Pressable>
          ))}
        </View>
      </View>
    </Container>
  )
}

const s = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  list: { gap: 12 },
  container: {
    paddingHorizontal: 20,
  },
  filterGoBack: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterGoBackTitle: { fontSize: 18, fontFamily: fonts['urbanist-bold'] },
  ball: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderWidth: 4,
    borderRadius: 999,
  },
  description: {
    fontSize: 10,
    fontFamily: fonts['inter-semibold'],
    marginBottom: 16,
  },
  title: { fontSize: 14, fontFamily: fonts['urbanist-bold'] },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginVertical: 20,
  },
})
