import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { red, white, zinc } from 'tailwindcss/colors'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

import { Container } from './Container'
import { P } from './p'
import { Icon } from './icon'

import { useUsers } from '~/hooks/use-users'

import { useTheme } from '~/hooks/use-theme'

import { api } from '~/api/api'
import { generateToken } from '~/utils/generate-token'

import type { CompanyResponseDTO } from '~/types/company-response-dto'
import type { UserResponseDTO } from '~/types/user-response-dto'

const Schema = z.object({
  empresaId: z.string(),
  dispositivoHash: z.string(),
  login: z.string(),
  senha: z.string(),
})

type FormInput = z.input<typeof Schema>

type Props = {
  onSuccess(): void
  children: ReactNode
}

export function AddUserForm(props: Props) {
  const { add } = useUsers()
  const { user } = useUsers()

  const [errors, setErrors] = useState<string[]>([])

  const { control, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(Schema),
    defaultValues: user
      ? {
          empresaId: '3B55A873',
          dispositivoHash: '5FF93EB5',
          login: 'TESTE',
          senha: 'TESTE12345',
        }
      : {
          empresaId: '59E6FEFD',
          dispositivoHash: '5962AE39',
          login: 'MATHEUS',
          senha: '0112A',
        },
  })

  const { mutate, isPending } = useMutation<unknown, unknown, FormInput>({
    mutationKey: ['login-mutation'],
    mutationFn: async (input) => {
      await validateCompany(input.empresaId).then(async (company) => {
        if (company) {
          const deviceIsValid = await validateDevice({
            code: company.codigo,
            hash: input.dispositivoHash,
          })

          if (deviceIsValid) {
            const token = generateToken(
              { id: input.login, password: input.senha },
              {
                companyId: company.codigo,
                codigoLiberacao: input.dispositivoHash,
                system: company.sistema,
              },
            )

            const user = await validateUser(token)

            if (user) {
              add(
                {
                  userId: user.id,
                  userName: user.nome,
                  userLastName: user.usuario,
                  deviceHash: input.dispositivoHash,
                  token,
                  companyId: input.empresaId,
                  companySystem: company.sistema,
                  companyCode: company.codigo,
                  active: true,
                },
                () => errors.length === 0 && props.onSuccess(),
              )
            }
          }
        }
      })
    },
  })

  async function validateCompany(companyId: string) {
    const response = await api('validacao/empresa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hash: companyId }),
    })

    if (!response.ok) {
      setErrors((prev) => [
        ...prev,
        'Houve um problema ao validar sua empresa.',
      ])

      return
    }

    return (await response.json()) as CompanyResponseDTO
  }

  async function validateDevice({
    code,
    hash,
  }: {
    code: number
    hash: string
  }) {
    const response = await api('validacao/movel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        codigo: code,
        hash,
      }),
    })

    console.log(response.statusText, response.status)

    if (!response.ok) {
      setErrors((prev) => [
        ...prev,
        'Houve um problema ao validar seu aparelho.',
      ])

      return
    }

    return response.ok
  }

  async function validateUser(token: string) {
    const response = await api('login', {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })

    if (!response.ok) {
      setErrors((prev) => [
        ...prev,
        'Houve um problema ao validar seu usuário.',
      ])

      return
    }

    return (await response.json()) as UserResponseDTO
  }

  function onSubmit(input: FormInput) {
    mutate(input)
  }

  const { BACKGROUND_SECONDARY, TEXT_PRIMARY, BORDER_PRIMARY } = useTheme()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}>
          {props.children}

          <View className="mt-10 flex-row items-center">
            <Icon name="lock-closed" size={16} />
            <P className="ml-2.5 font-inter-regular text-[13px] -tracking-wide">
              Entre com as suas credenciais.
            </P>
          </View>

          <View
            className="my-10 h-[1px] w-full"
            style={{ backgroundColor: BORDER_PRIMARY }}></View>

          <View>
            <View>
              <P className="mb-1.5 ml-1.5 font-inter-medium text-xs -tracking-wide">
                Código de liberação da empresa
              </P>

              <Controller
                control={control}
                name="empresaId"
                render={({ field }) => (
                  <TextInput
                    className="h-14 rounded-xl border px-4 font-inter-medium text-[13px]"
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                    }}
                    cursorColor={zinc[800]}
                    placeholder="Digite o código de liberação da empresa"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View className="mt-5">
              <P className="mb-1.5 ml-1.5 font-inter-medium text-xs -tracking-wide">
                Código de liberação do dispositivo
              </P>

              <Controller
                control={control}
                name="dispositivoHash"
                render={({ field }) => (
                  <TextInput
                    className="h-14 rounded-xl border px-4 font-inter-medium text-[13px]"
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                    }}
                    cursorColor={zinc[800]}
                    placeholder="Digite o código de liberação do dispositivo"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View className="mt-5">
              <P className="mb-1.5 ml-1.5 font-inter-medium text-xs -tracking-wide">
                Usuário
              </P>

              <Controller
                control={control}
                name="login"
                render={({ field }) => (
                  <TextInput
                    className="h-14 rounded-xl border px-4 font-inter-medium text-[13px]"
                    cursorColor={zinc[800]}
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                    }}
                    placeholder="Digite o nome de usuário"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View className="mt-5">
              <P className="mb-1.5 ml-1.5 font-inter-medium text-xs -tracking-wide">
                Senha
              </P>

              <Controller
                control={control}
                name="senha"
                render={({ field }) => (
                  <TextInput
                    className="zinc[800] h-14 rounded-xl border px-4 font-inter-medium text-[13px] "
                    cursorColor={zinc[800]}
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                    }}
                    secureTextEntry
                    placeholder="Digite sua senha"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmit)}
              className="mt-5 h-14 w-full items-center justify-center rounded-xl border-2 border-[#305a96]/40 bg-[#305a96]">
              {isPending ? (
                <ActivityIndicator color={white} size={20} />
              ) : (
                <Text className="font-inter-medium text-[13px] -tracking-wide text-white">
                  Confirmar
                </Text>
              )}
            </TouchableOpacity>

            {errors.length > 0 && (
              <>
                <View className="mt-5 rounded-xl border-2 border-red-100/50 bg-red-200/50 p-5">
                  <View className="mb-5 flex-row items-center justify-start">
                    <Ionicons name="alert-circle" color={red[500]} size={32} />
                    <P className="ml-2.5 font-inter-medium text-xs text-red-500">
                      TIVEMOS ALGUNS PROBLEMAS
                    </P>

                    <TouchableOpacity
                      className="ml-auto"
                      activeOpacity={0.8}
                      hitSlop={20}
                      onPress={() => setErrors([])}>
                      <Ionicons name="close" size={20} color={red[500]} />
                    </TouchableOpacity>
                  </View>

                  {errors.map((item) => (
                    <Text
                      key={item}
                      className="mt-1.5 font-inter-medium text-xs text-red-500">
                      {item}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  )
}
