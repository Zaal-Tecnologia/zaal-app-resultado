import { StyleSheet } from 'react-native'
import dayjs from 'dayjs'

import { useTheme } from '~/hooks/use-theme'
import { useFetch } from '~/hooks/use-fetch'

import { api } from '~/api/api'

import { P } from './p'
import { Shimmer } from './shimmer'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'

export function LastUpdateMessage() {
  const { theme } = useTheme()

  const { data, isLoading } = useFetch<{ timeStamp: string }>(
    ['get-last-update-query'],
    async (authorization) => {
      const response = await api(`ultimasincronizacao`, {
        headers: {
          'Content-Type': 'application/json',
          authorization,
        },
      })

      return await response.json()
    },
  )

  return isLoading ? (
    <Shimmer width={60} height={13} />
  ) : (
    <P
      style={[
        s.container,
        {
          color: themes[theme].textForeground,
        },
      ]}>
      Atualizado há {dayjs().diff(data?.timeStamp, 'minutes')} minutos{'  '} •{' '}
      {'  '}
    </P>
  )
}

const s = StyleSheet.create({
  container: {
    fontFamily: fonts['inter-semibold'],
    letterSpacing: -0.25,
    fontSize: 10,
  },
})
