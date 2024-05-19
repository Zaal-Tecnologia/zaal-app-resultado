import { useQuery } from '@tanstack/react-query'

// import { useSession } from './use-session'
import { useBranch } from './use-branch'
import { useUsers } from './use-users'
import { useFilter } from './use-filters'

type Key = string | undefined

export function useFetch<D>(
  queryKey: Key[],
  queryFn: (token: string, branchId: string) => void,
) {
  const { user } = useUsers()
  const { branch } = useBranch()
  const { filter } = useFilter()

  const { data, error, isLoading, refetch } = useQuery<unknown, unknown, D>({
    queryKey: [...queryKey, user?.token, branch.id],
    queryFn: async () => {
      const QUANTITY = filter.SIZE === '50+' ? '80' : filter.SIZE

      return queryFn(
        user ? user.token : '',
        branch.id === 0
          ? `?quantidade=${QUANTITY}&orderBy=${filter.VARIANT}`
          : `?codigoFilial=${String(branch.id)}&quantidade=${QUANTITY}&orderBy=${filter.VARIANT}&`,
      )
    },
  })

  return { data, error, isLoading, refetch }
}
