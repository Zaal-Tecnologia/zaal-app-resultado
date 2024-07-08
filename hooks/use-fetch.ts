import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useBranch } from './use-branch'
import { useFilter } from './use-filters'

import { getToken } from '~/utils/secure-store'

type Key = string | undefined

export function useFetch<D>(
  queryKey: Key[],
  queryFn: (token: string, branchId: string) => void,
) {
  const { branch } = useBranch()
  const { filter } = useFilter()

  const [token, setToken] = useState<string | null>(null)

  const { data, error, isLoading, refetch } = useQuery<unknown, unknown, D>({
    queryKey: [...queryKey, token, branch.id],
    queryFn: async () => {
      const QUANTITY = filter.SIZE === '50+' ? '80' : filter.SIZE

      return queryFn(
        token || '',
        branch.id === 0
          ? `?quantidade=${QUANTITY}&orderBy=${filter.VARIANT}`
          : `?codigoFilial=${String(branch.id)}&quantidade=${QUANTITY}&orderBy=${filter.VARIANT}&`,
      )
    },
  })

  useEffect(() => {
    getToken('zaal-result-token').then(setToken)
  }, [])

  return { data, error, isLoading, refetch }
}
