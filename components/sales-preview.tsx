import { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { Link } from 'expo-router'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

import { api } from '~/api/api'

import { currency } from '~/utils/currency'

import { useBranch } from '~/hooks/use-branch'

import { useTheme } from '~/hooks/use-theme'

import { Icon } from './icon'
import { P } from './p'

import type { TotalSalesResponseDTO } from '~/types/total-sales-response-dto'
import { useFetch } from '~/hooks/use-fetch'
import { zinc } from 'tailwindcss/colors'
import { useShow } from '~/hooks/use-filters'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export function SalesPreview() {
  const { theme } = useTheme()
  const { show } = useShow()

  const SHIMMER_COLORS =
    theme === 'dark' ? [zinc[700], zinc[800]] : [zinc[100], zinc[200]]

  const { branch } = useBranch()

  const { data, isLoading } = useFetch<TotalSalesResponseDTO>(
    ['get-sales-query', String(branch?.id)],
    async (authorization) => {
      const response = await api(
        branch.id !== 0
          ? `vendatotal?codigoFilial=${branch?.id}`
          : 'vendatotal',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization,
          },
        },
      )

      return await response.json()
    },
  )

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

  if (isLoading) {
    return (
      <>
        <View className="mb-5 mt-10 justify-between">
          <View className="my-2.5 flex-row items-center">
            <P className="mr-1 font-inter-semibold text-[9px] uppercase">
              vendas
            </P>

            <Icon name="chevron-forward" size={12} />
          </View>

          <ShimmerPlaceholder
            width={200}
            height={44}
            shimmerColors={SHIMMER_COLORS}
          />
        </View>

        <View
          className="flex-row items-center justify-between border-b py-5"
          style={{ borderColor: theme === 'dark' ? zinc[700] : zinc[200] }}>
          <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
            Vendas {'\n'}Dessa Semana
          </P>

          <ShimmerPlaceholder
            width={100}
            height={24}
            shimmerColors={SHIMMER_COLORS}
          />
        </View>

        <View
          className="mb-5 flex-row items-center justify-between py-5"
          style={{ borderColor: theme === 'dark' ? zinc[700] : zinc[200] }}>
          <P className="font-inter-medium text-xs leading-6 -tracking-wide text-zinc-600 dark:text-zinc-200">
            Vendas {'\n'}De Hoje
          </P>
          <ShimmerPlaceholder
            width={100}
            height={24}
            shimmerColors={SHIMMER_COLORS}
          />
        </View>
      </>
    )
  }

  return (
    <View className="px-6">
      <Link asChild href="/sales-details/MÊS">
        <Pressable className="mb-5 mt-10 justify-between">
          <View className="my-2.5 flex-row items-center">
            <P className="mr-1 font-inter-semibold text-[9px] uppercase">
              vendas
            </P>

            <Icon name="chevron-forward" size={12} />
          </View>

          <P className="mb-1.5 font-urbanist-regular text-[44px]">
            {show ? (TOTAL?.MONTH ? currency(TOTAL?.MONTH) : 'R$ 0') : '-'}
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
            {show ? (TOTAL?.WEEK ? currency(TOTAL?.WEEK) : 'R$ 0') : '-'}
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
            {show ? (TOTAL?.DAY ? currency(TOTAL?.DAY) : 'R$ 0') : '-'}
          </P>
        </Pressable>
      </Link>
    </View>
  )
}
