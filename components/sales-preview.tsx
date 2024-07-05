import { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { Link } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import { api } from '~/api/api'

import { currency } from '~/utils/currency'

import { useUsers } from '~/hooks/use-users'
import { useBranch } from '~/hooks/use-branch'

import { useTheme } from '~/hooks/use-theme'

import { Icon } from './icon'
import { P } from './p'

import type { TotalSalesResponseDTO } from '~/types/total-sales-response-dto'

export function SalesPreview() {
  const { user } = useUsers()

  const { branch } = useBranch()

  const { data } = useQuery({
    queryKey: ['get-total-sales-query', user, branch],
    queryFn: async () => {
      const response = await api('vendatotal', {
        headers: {
          'Content-Type': 'application/json',
          authorization: user ? user.token : '',
        },
      })

      return (await response.json()) as TotalSalesResponseDTO
    },
  })

  const TOTAL = useMemo(() => {
    if (data) {
      const MONTH = data.mesCorrente.reduce(
        (acc, curr) => acc + curr.valorTotal,
        0,
      )
      const WEEK = data.semanaCorrente[0]?.valorTotal
      const DAY = data.diaCorrente[0]?.valorTotal

      return { MONTH, WEEK, DAY }
    }
  }, [data])

  const { BORDER_PRIMARY } = useTheme()

  // 739C3F09
  // 5B09E807
  // LARISSA
  // 12750302706

  return (
    <>
      <Link asChild href="/sales-details/MÊS">
        <Pressable className="mb-5 mt-10 justify-between">
          <View className="my-2.5 flex-row items-center">
            <P className="mr-1 font-inter-semibold text-[9px] uppercase">
              vendas
            </P>

            <Icon name="chevron-forward" size={12} />
          </View>

          <P className="mb-1.5 font-urbanist-regular text-[44px]">
            {currency(TOTAL?.MONTH)}
          </P>
        </Pressable>
      </Link>

      <Link asChild href="/sales-details/SEMANA">
        <Pressable
          className="flex-row items-center justify-between border-b py-5"
          style={{ borderColor: BORDER_PRIMARY }}>
          <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
            Vendas {'\n'}Dessa Semana
          </P>
          <P className="font-urbanist-medium text-[24px]">
            {currency(TOTAL?.WEEK)}
          </P>
        </Pressable>
      </Link>

      <Link asChild href="/sales-details/DIA">
        <Pressable
          className="mb-5 flex-row items-center justify-between py-5"
          style={{ borderColor: BORDER_PRIMARY }}>
          <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
            Vendas {'\n'}De Hoje
          </P>
          <P className="font-urbanist-medium text-[24px]">
            {currency(TOTAL?.DAY)}
          </P>
        </Pressable>
      </Link>
    </>
  )
}
