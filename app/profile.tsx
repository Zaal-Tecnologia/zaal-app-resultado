import { Ionicons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { red } from 'tailwindcss/colors'

import { Container } from '~/components/Container'
import { AddUserForm } from '~/components/add-user-form'
import { Header } from '~/components/header'
import { P } from '~/components/p'
import { ProfileCard } from '~/components/profile-card'
import { ProfileUserCard } from '~/components/profile-user-card'
import { Support } from '~/components/support'
import { Theme } from '~/components/theme'

import { useUsers } from '~/hooks/use-users'

import { version } from '../package.json'
import { WIDTH } from '~/utils/chart-size'
import { useFilter } from '~/hooks/use-filters'

export default function Profile() {
  const { setFilter } = useFilter()

  const { removeAll, user, users, removeCurrentUser, change } = useUsers()

  const [isAddingUser, setIsAddingUser] = useState(false)

  const handleWhenUserIsAdded = useCallback(() => {
    setIsAddingUser(false)
  }, [])

  /** useEffect(() => {
    getUsers().then((users) => (users ? setUsers(JSON.parse(users)) : null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingUser, user]) */

  useEffect(() => {
    setFilter({ EXPAND: false })
  }, [])

  return (
    <Container className="pt-5">
      {isAddingUser ? (
        <>
          <Header.Root style={{ paddingHorizontal: 32 }}>
            <Header.Back onBack={() => setIsAddingUser(false)}>
              ADICIONE UM NOVO USUÁRIO
            </Header.Back>
          </Header.Root>

          <AddUserForm onSuccess={handleWhenUserIsAdded}>
            <P className="font-urbanist-regular text-[32px] -tracking-wide">
              Adicione um novo usuário a sua conta
            </P>
          </AddUserForm>
        </>
      ) : (
        <>
          <View style={{ paddingHorizontal: 28, position: 'relative' }}>
            <Header.Root style={{ paddingHorizontal: 0 }}>
              <Header.Back>PERFIL</Header.Back>
            </Header.Root>

            {users &&
              users.map((item, index) => (
                <ProfileUserCard.Root
                  index={index}
                  key={`${item.userId}-${index}`}
                  onPress={() => change(item.userId)}>
                  <ProfileUserCard.Content>
                    <ProfileUserCard.Name name={item.userName} />
                  </ProfileUserCard.Content>
                  <ProfileUserCard.Status
                    isActive={item.active}
                    system={item.companySystem}
                  />
                </ProfileUserCard.Root>
              ))}

            <ProfileCard.Root onPress={() => setIsAddingUser(true)}>
              <ProfileCard.Svg name="add-circle" />

              <ProfileCard.Name>Adicionar nova conta</ProfileCard.Name>
            </ProfileCard.Root>

            <ProfileCard.Root className="rounded-b-3xl" onPress={removeAll}>
              <ProfileCard.Svg name="log-out" />

              <ProfileCard.Name>
                {users?.length === 1
                  ? 'Sair dessa conta'
                  : 'Sair de todas as contas'}
              </ProfileCard.Name>
            </ProfileCard.Root>

            <P className="my-5 ml-3 font-inter-medium text-xs -tracking-wide">
              CONFIGURAÇÕES
            </P>

            <View className="px-2.5">
              <Support />

              <Theme />

              {users && users.length > 1 && (
                <Pressable
                  className="h-14 flex-row items-center"
                  onPress={removeCurrentUser}>
                  <Ionicons name="trash" color={red[500]} size={20} />

                  <Text className="ml-3 font-inter-medium text-sm -tracking-wide text-red-500">
                    Remover {user?.userLastName}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 40,
              width: WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <P className="font-inter-medium text-sm -tracking-wide">
              Versão {version}
            </P>
          </View>
        </>
      )}
    </Container>
  )
}
