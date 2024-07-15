import { useCallback, useMemo } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useMMKVObject } from 'react-native-mmkv'
import { useRouter } from 'expo-router'

import type { User } from '~/types/user'
import { FAKE_BRANCH_TO_INITIAL_DATA, useBranch } from './use-branch'

export function useUsers() {
  const toast = useToast()

  const { push } = useRouter()
  const { setBranch } = useBranch()

  const [users, setUsers] = useMMKVObject<User[] | undefined>(
    'zaal-result-app:users',
    undefined,
  )

  const add = useCallback(
    (user: User, onSuccess: () => void) => {
      if (!users) {
        setUsers([user])
      } else {
        const userWithSameId = users.some((item) => item.userId === user.userId)

        if (userWithSameId) {
          return toast.show('Usuário já existe!')
        } else {
          setUsers([
            ...users.map((item) => ({
              ...item,
              active: false,
            })),
            {
              ...user,
              active: true,
            },
          ])
        }

        // setUsers([...users, { ...user, active: false }])
      }

      onSuccess()
    },
    [setUsers, toast, users],
  )

  const removeAll = useCallback(() => {
    setUsers(undefined)

    push('/')
  }, [setUsers, push])

  const change = useCallback(
    (userId: string) => {
      if (users) {
        // const token = generateToken(
        //   { id: input.login, password: input.senha },
        //   {
        //     companyId: company.codigo,
        //     codigoLiberacao: input.dispositivoHash,
        //     system: company.sistema,
        //   },
        // )

        // await saveToken('zaal-result-token', token)

        const userToBeActivated = users.find((item) => item.userId === userId)
        console.log('userToBeActivated', userToBeActivated)

        // setUsers(
        //   users.map((user) => ({
        //     ...user,
        //     active: user.userId === userId,
        //   })),
        // )

        // setBranch(FAKE_BRANCH_TO_INITIAL_DATA)
      }
    },
    [users],
  )

  const user = useMemo(
    () => (users ? users.find((user) => user.active) : null),
    [users],
  )

  const removeCurrentUser = useCallback(() => {
    if (users && user) {
      const userThatNeedsToBeRemoved = users.filter(
        (item) => item.userId !== user.userId,
      )

      // userThatNeedsToBeRemoved[0].active = true

      setUsers([...userThatNeedsToBeRemoved])
    }
  }, [setUsers, user, users])

  return {
    add,
    user,
    users,
    removeAll,
    removeCurrentUser,
    change,
  }
}
