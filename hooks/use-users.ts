import { useCallback, useMemo } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useMMKVObject } from 'react-native-mmkv'
import { useRouter } from 'expo-router'

import type { User } from '~/types/user'
import { FAKE_BRANCH_TO_INITIAL_DATA, useBranch } from './use-branch'
import { generateToken } from '~/utils/generate-token'
import { saveToken } from '~/utils/secure-store'

export function useUsers() {
  const toast = useToast()

  const { push } = useRouter()
  const { setBranch } = useBranch()

  const [users, setUsers] = useMMKVObject<User[] | undefined>(
    'zaal-result-app:users',
    undefined,
  )

  const user = useMemo(
    () => (users ? users.find((user) => user.active) : null),
    [users],
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

  const onRemoveAllUsers = useCallback(() => {
    setUsers(undefined)

    push('/')
  }, [setUsers, push])

  const onChangeUser = useCallback(
    async (userId: string) => {
      if (users) {
        const userToBeActivated = users.find((item) => item.userId === userId)

        if (userToBeActivated) {
          const token = generateToken(
            {
              id: userToBeActivated.login,
              password: userToBeActivated.password,
            },
            {
              companyId: userToBeActivated.companyCode,
              codigoLiberacao: userToBeActivated.deviceHash,
              system: userToBeActivated.companySystem,
            },
          )

          await saveToken('zaal-result-token', token).then(() => {
            setUsers((prev) =>
              prev
                ? prev.map((user) => ({
                    ...user,
                    active: user.userId === userId,
                  }))
                : [],
            )

            setBranch(FAKE_BRANCH_TO_INITIAL_DATA)

            toast.show(`Usuário alterado para ${userToBeActivated.login}`)
          })
        }
      }
    },
    [setBranch, setUsers, toast, users],
  )

  const onRemoveActiveUser = useCallback(() => {
    if (users && user) {
      const userThatNeedsToBeRemoved = users.filter(
        (item) => item.userId !== user.userId,
      )

      if (userThatNeedsToBeRemoved.length > 0) {
        const user = userThatNeedsToBeRemoved[0]

        onChangeUser(user.userId)
      } else {
        push('/')
      }

      setUsers([...userThatNeedsToBeRemoved])
    }
  }, [onChangeUser, push, setUsers, user, users])

  const addPhoto = useCallback(
    (photo: string) => {
      if (users) {
        const userWithPhoto = { ...user!, photo }

        const userThatNeedsToBeRemoved = users.filter(
          (item) => item.userId !== user!.userId,
        )

        setUsers([userWithPhoto, ...userThatNeedsToBeRemoved])
      }
    },
    [setUsers, user, users],
  )

  return {
    add,
    user,
    users,
    onRemoveAllUsers,
    onRemoveActiveUser,
    onChangeUser,
    addPhoto,
  }
}
