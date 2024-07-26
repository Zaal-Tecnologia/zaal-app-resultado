import { StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { memo } from 'react'

import { useShow, useVariant } from '~/hooks/use-filters'
import { useTheme } from '~/hooks/use-theme'

import { P } from './p'
import { Button } from './button'
import { Shimmer } from './shimmer'

import { currency } from '~/utils/currency'

import { themes } from '~/styles/themes'
import { colors } from '~/styles/colors'
import { fonts } from '~/styles/fonts'

interface Props {
  total: number[] // month, week, day
  isLoading: boolean
  bestSellerName: string | undefined
}

const SalesPreviewByPage = ({ total, isLoading, bestSellerName }: Props) => {
  const { theme } = useTheme()
  const { variant } = useVariant()
  const { show } = useShow()

  const [month, week, day] = total

  return (
    <>
      <View
        style={[
          s.container,
          {
            borderTopColor: themes[theme].border,
          },
        ]}>
        <View style={s.monthWrapper}>
          <P style={[s.monthTitle, { color: themes[theme].textForeground }]}>
            {variant === 'VLR' ? 'Faturamento ' : 'Quantidade '}Mensal
          </P>
          {isLoading ? (
            <Shimmer width={100} height={28} />
          ) : (
            <P style={s.monthPriceTitle}>
              {show
                ? variant === 'VLR'
                  ? currency(month)
                  : month.toFixed(2)
                : '-'}
            </P>
          )}

          {bestSellerName !== undefined ? (
            <View style={s.bestSellerContainer}>
              <MaterialCommunityIcons
                name="chart-line-variant"
                size={16}
                color={colors.green[700]}
              />
              {isLoading ? (
                <Shimmer width={50} height={10} />
              ) : (
                <P
                  style={[
                    { color: colors.green[700], textTransform: 'capitalize' },
                    s.buttonTitle,
                  ]}>
                  {bestSellerName}
                </P>
              )}
            </View>
          ) : null}
        </View>

        <View style={s.monthAndWeekContainer}>
          <Button
            style={[
              s.button,
              {
                borderColor: themes[theme].border,
                borderBottomWidth: 1,
              },
            ]}>
            <P style={[{ color: themes[theme].textForeground }, s.buttonTitle]}>
              Dessa Semana
            </P>

            {isLoading ? (
              <Shimmer width={100} height={24} />
            ) : (
              <P style={s.buttonPrice}>
                {show
                  ? variant === 'VLR'
                    ? currency(week)
                    : week.toFixed(2)
                  : '-'}
              </P>
            )}
          </Button>

          <Button style={s.button}>
            <P
              style={[
                {
                  color: themes[theme].textForeground,
                },
                s.buttonTitle,
              ]}>
              De Hoje
            </P>

            {isLoading ? (
              <Shimmer width={100} height={24} />
            ) : (
              <P style={s.buttonPrice}>
                {show
                  ? variant === 'VLR'
                    ? currency(day)
                    : day.toFixed(2)
                  : '-'}
              </P>
            )}
          </Button>
        </View>
      </View>
    </>
  )
}

export const MemoizedSalesPreviewByPage = memo(SalesPreviewByPage)

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  monthWrapper: { flex: 1, paddingTop: 16 },
  monthTitle: {
    marginBottom: 4,
    fontFamily: fonts['urbanist-bold'],
    fontSize: 10,
  },
  monthAndWeekContainer: { flex: 1 },
  bestSellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  monthPriceTitle: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 24,
    letterSpacing: -0.025,
  },
  button: {
    paddingVertical: 12,
    paddingLeft: 12,
  },
  buttonTitle: {
    fontSize: 10,
    lineHeight: 20,
    fontFamily: fonts['urbanist-bold'],
  },
  buttonPrice: {
    fontFamily: fonts['urbanist-bold'],
    fontSize: 14,
    letterSpacing: -0.25,
  },
})
