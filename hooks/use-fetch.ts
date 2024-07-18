import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useBranch } from './use-branch'
import { useSize, useVariant } from './use-filters'

import { getToken } from '~/utils/secure-store'
import { useUsers } from './use-users'

type Key = string | undefined

const NEW_VARIANT = {
  VLR: 'VALOR',
  QNT: 'QUANTIDADE',
} as const

export function useFetch<D>(
  queryKey: Key[],
  queryFn: (token: string, branchId: string) => void,
) {
  const { branch } = useBranch()
  const { size } = useSize()
  const { user } = useUsers()
  const { variant } = useVariant()

  const [token, setToken] = useState<string | null>(null)

  const { data, error, isLoading, refetch } = useQuery<unknown, unknown, D>({
    queryKey: [...queryKey, token, branch.id, size, variant],
    queryFn: async () => {
      const QUANTITY = size === '50+' ? '80' : size

      return queryFn(
        token || '',
        branch.id === 0
          ? `?quantidade=${QUANTITY}&orderBy=${NEW_VARIANT[variant!]}`
          : `?codigoFilial=${branch.id}&quantidade=${QUANTITY}&orderBy=${NEW_VARIANT[variant!]}&`,
      )
    },
  })

  useEffect(() => {
    if (user)
      getToken('zaal-result-token').then((token) => {
        setToken(token)
      })
  }, [user])

  return { data, error, isLoading, refetch }
}
