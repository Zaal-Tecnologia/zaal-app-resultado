import { StyleSheet } from 'react-native'
import dayjs from 'dayjs'

import { useTheme } from '~/hooks/use-theme'
import { useFetch } from '~/hooks/use-fetch'

import { api } from '~/api/api'

import { P } from './p'
import { Shimmer } from './shimmer'

import { fonts } from '~/styles/fonts'
import { themes } from '~/styles/themes'
import { useMemo } from 'react'

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

  const message = useMemo(() => {
    const seconds = dayjs().diff(data?.timeStamp, 'second')

    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds >= 86400) {
      return `${days} ${days > 1 ? 'dias' : 'dia'}`
    }

    if (seconds >= 3600) {
      return `${hours} dias`
    }

    return minutes
  }, [data?.timeStamp])

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
      Atualizado há {message}
      {'  '} • {'  '}
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
