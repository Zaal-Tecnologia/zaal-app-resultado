import { useCallback, useMemo } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { useMMKVObject } from 'react-native-mmkv'
import { useRouter } from 'expo-router'

import type { User } from '~/types/user'

export function useUsers() {
  const toast = useToast()

  /**  const { setUser } = useSession()
  const { setItem, getItem, removeItem } = useAsyncStorage('zaal-result-users')

  async function handleSwitchUser(userId: string) {
    const users = await getItem()

    if (users) {
      const parsedUsers = (await JSON.parse(users)) as User[]

      const active = parsedUsers.find((user) => user.active)

      const userActive = parsedUsers.find((user) => user.userId === userId)

      await setItem(
        JSON.stringify([
          ...parsedUsers.filter((item) => !item.active),
          { ...active, active: false },
          { ...userActive, active: true },
        ]),
      )

      if (userActive) {
        setUser({
          token: userActive.token,
          userLastName: userActive.userLastName,
          userName: userActive.userName,
        })
      }
    }
  }

  const handleRemoveActiveUser = useCallback(async () => {
    const users = await getItem()

    if (users) {
      const parsedUsers = (await JSON.parse(users)) as User[]

      const inactiveUsers = parsedUsers.filter((item) => !item.active)

      const activeUser = { ...inactiveUsers[0], active: true }

      await setItem(JSON.stringify([...inactiveUsers, activeUser]))

      setUser({ ...parsedUsers[0] })
    }
  }, [getItem, setItem, setUser])

  async function add(user: User) {
    const users = await getItem()

    if (!users) {
      await setItem(JSON.stringify([user]))

      return
    }

    if (users) {
      const parsedUsers = (await JSON.parse(users)) as User[]

      const active = parsedUsers.find((user) => user.active)

      if (active) {
        await setItem(
          JSON.stringify([
            ...parsedUsers.filter((item) => !item.active),
            { ...active, active: false },
            user,
          ]),
        )
      } else {
        await setItem(JSON.stringify([...parsedUsers, user]))
      }

      
       * 🚨 EU TENHO QUE USAR O CÓDIGO COMENTADO PARA VERIFICAR SE JÁ TEM USUÁRIO CADASTRADO 🚨
       * 
       * if (!parsedUsers.some((item) => item.userId === user.userId)) {
            await setItem(JSON.stringify([...parsedUsers, user]))
          } else {
            console.log('usuário já existe!')
          }
     
    }
  }  

  async function getActive() {
    const users = await getItem()

    if (users) {
      const parsed = (await JSON.parse(users)) as User[]

      return parsed.find((item) => item.active) || null
    } else {
      return null
    }
  }

  const getUsers = useCallback(async () => {
    return await getItem()
  }, [getItem]) */

  /** MMKV */
  const { push } = useRouter()

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
        setUsers([...users, { ...user, active: false }])

        // const userWithSameId = users.some((item) => item.userId === user.userId)

        /** if (userWithSameId) {
          return toast.show('Usuário já existe!')
        } else {
          setUsers([...users, user])
        } */
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
        const userThatNeedsToBeActivated = users.find(
          (item) => item.userId === userId,
        )

        if (user && userThatNeedsToBeActivated) {
          setUsers([
            { ...userThatNeedsToBeActivated, active: true },
            { ...user, active: false },
            ...users.filter(
              (item) => item.userId !== userId && item.userId !== user.userId,
            ),
          ])
        }
      }
    },
    [setUsers, user, users],
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
