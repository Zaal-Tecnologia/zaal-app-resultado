import { Pressable, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import dayjs from 'dayjs'

import { P } from './p'
import { Icon } from './icon'
import { ListSizeMessage } from './list-size-message'

import { useTheme } from '~/hooks/use-theme'
import { usePeriod } from '~/hooks/use-filters'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'
import { LastUpdateMessage } from './last-update-message'

const PERIOD = {
  DIA: 'day',
  MÊS: 'month',
  SEMANA: 'week',
} as const

export function FilterPageOptions() {
  const { theme } = useTheme()
  const { period } = usePeriod()
  const { push } = useRouter()

  return (
    <View style={s.container}>
      <View style={s.leftContent}>
        <P style={s.periodMessage}>
          {dayjs().startOf(PERIOD[period]).format('MMM DD')} {'  '}-{'  '} Hoje
        </P>

        <Pressable
          onPress={() => push('/filters')}
          style={[
            s.button,
            {
              borderColor: themes[theme].border,
            },
          ]}>
          <P style={s.buttonTitle}>Filtros</P>

          <Icon name="chevron-down" style={s.icon} color="#305a96" />
        </Pressable>
      </View>

      <View style={s.lastUpdateAndQuantityContainer}>
        <LastUpdateMessage />

        <ListSizeMessage />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 12,
  },
  leftContent: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonTitle: {
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.5,
    fontSize: 11,
  },
  icon: { marginTop: 2 },
  periodMessage: {
    fontFamily: fonts['inter-semibold'],
    fontSize: 11,
    letterSpacing: -0.25,
  },
  lastUpdateAndQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
