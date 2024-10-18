import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native'
import { colors } from '../styles/colors'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { Container } from './Container'
import { P } from './p'

import { useUsers } from '~/hooks/use-users'

import { useTheme } from '~/hooks/use-theme'

import { api } from '~/api/api'
import { generateToken } from '~/utils/generate-token'

import type { CompanyResponseDTO } from '~/types/company-response-dto'
import type { UserResponseDTO } from '~/types/user-response-dto'
import { saveToken } from '~/utils/secure-store'
import { fonts } from '~/styles/fonts'

const Schema = z.object({
  empresaId: z.string(),
  dispositivoHash: z.string(),
  login: z.string(),
  senha: z.string(),
})

type FormInput = z.input<typeof Schema>

type Props = {
  onSuccess?(): void

  defaultValues?: {
    dispositivoHash: string
    empresaId: string
  }
}

export function AddUserForm(props: Props) {
  const { add } = useUsers()

  const [errors, setErrors] = useState<string[]>([])

  const { control, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(Schema),
    // defaultValues: {
    //   dispositivoHash:
    //     props?.defaultValues?.dispositivoHash === 'nothing'
    //       ? ''
    //       : props?.defaultValues?.dispositivoHash || user?.deviceHash,
    //   empresaId: props?.defaultValues?.empresaId || user?.companyId,
    // },
    // defaultValues: {
    //   empresaId: 'E6F31DE3',
    //   dispositivoHash: 'E71CF716',
    //   login: '543',
    //   senha: '12750302706',
    // },
    // defaultValues: {
    //   empresaId: '59E6FEFD',
    //   dispositivoHash: '5962AE39',
    //   login: 'MATHEUS',
    //   senha: '0112A',
    // },
    // defaultValues: {
    //   empresaId: '739c3f09',
    //   dispositivoHash: '5b09e807',
    //   login: 'LARISSA',
    //   senha: '12750302706',
    // },
    /** defaultValues: user
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
        }, */
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

            await saveToken('zaal-result-token', token)

            if (user) {
              add(
                {
                  userId: user.id,
                  userName: user.nome,
                  userLastName: user.usuario,
                  deviceHash: input.dispositivoHash,
                  companyId: input.empresaId,
                  companySystem: company.sistema,
                  login: input.login,
                  companyCode: company.codigo,
                  password: input.senha,
                  active: true,
                },
                () =>
                  errors.length === 0 && typeof props.onSuccess !== 'undefined'
                    ? props.onSuccess()
                    : null,
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
    code: string
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
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container style={{ paddingHorizontal: 40 }}>
          <View>
            <View>
              <P
                style={{
                  marginBottom: 6,
                  marginLeft: 6,
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  letterSpacing: -0.5,
                }}>
                Código de liberação da empresa
              </P>

              <Controller
                control={control}
                name="empresaId"
                render={({ field }) => (
                  <TextInput
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                      height: 56,
                      borderRadius: 12,
                      borderWidth: 1,
                      paddingHorizontal: 16,
                      fontFamily: fonts['inter-medium'],
                      fontSize: 13,
                    }}
                    cursorColor={colors.zinc[800]}
                    placeholder="Digite o código de liberação da empresa"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <P
                style={{
                  marginBottom: 6,
                  marginLeft: 6,
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  letterSpacing: -0.5,
                }}>
                Código de liberação do dispositivo
              </P>

              <Controller
                control={control}
                name="dispositivoHash"
                render={({ field }) => (
                  <TextInput
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                      height: 56,
                      borderRadius: 12,
                      borderWidth: 1,
                      paddingHorizontal: 16,
                      fontFamily: fonts['inter-medium'],
                      fontSize: 13,
                    }}
                    cursorColor={colors.zinc[800]}
                    placeholder="Digite o código de liberação do dispositivo"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <P
                style={{
                  marginBottom: 6,
                  marginLeft: 6,
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  letterSpacing: -0.5,
                }}>
                Usuário
              </P>

              <Controller
                control={control}
                name="login"
                render={({ field }) => (
                  <TextInput
                    cursorColor={colors.zinc[800]}
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                      height: 56,
                      borderRadius: 16,
                      borderWidth: 1,
                      paddingHorizontal: 16,
                      fontFamily: fonts['inter-medium'],
                      fontSize: 13,
                    }}
                    placeholder="Digite o nome de usuário"
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <P
                style={{
                  marginBottom: 6,
                  marginLeft: 6,
                  fontFamily: fonts['inter-medium'],
                  fontSize: 12,
                  letterSpacing: -0.5,
                }}>
                Senha
              </P>

              <Controller
                control={control}
                name="senha"
                render={({ field }) => (
                  <TextInput
                    cursorColor={colors.zinc[800]}
                    style={{
                      backgroundColor: BACKGROUND_SECONDARY,
                      color: TEXT_PRIMARY,
                      borderColor: BORDER_PRIMARY,
                      height: 56,
                      borderRadius: 16,
                      borderWidth: 1,
                      paddingHorizontal: 16,
                      fontFamily: fonts['inter-medium'],
                      fontSize: 13,
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
              style={{
                marginTop: 20,
                height: 56,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                borderWidth: 2,
                borderColor: 'rgba(48, 90, 150, 0.4)',
                backgroundColor: '#305a96',
              }}>
              {isPending ? (
                <ActivityIndicator color={colors.white} size={20} />
              ) : (
                <Text
                  style={{
                    fontFamily: fonts['inter-medium'],
                    fontSize: 13,
                    letterSpacing: -0.5,
                    color: '#FFFFFF',
                  }}>
                  Confirmar
                </Text>
              )}
            </TouchableOpacity>

            {errors.length > 0 && (
              <>
                <View
                  style={{
                    marginTop: 20,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: 'rgba(254, 226, 226, 0.5)',
                    backgroundColor: 'rgba(254, 226, 226, 0.5)',
                    padding: 20,
                  }}>
                  <View
                    style={{
                      marginBottom: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Ionicons name="alert-circle" color={colors.red[500]} size={32} />
                    <P
                      style={{
                        marginLeft: 10,
                        fontFamily: fonts['inter-medium'],
                        fontSize: 12,
                        color: '#f87171',
                      }}>
                      TIVEMOS ALGUNS PROBLEMAS
                    </P>

                    <TouchableOpacity
                      style={{ marginLeft: 'auto' }}
                      activeOpacity={0.8}
                      hitSlop={20}
                      onPress={() => setErrors([])}>
                      <Ionicons name="close" size={20} color={colors.red[500]} />
                    </TouchableOpacity>
                  </View>

                  {errors.map((item) => (
                    <Text
                      key={item}
                      style={{
                        marginTop: 6,
                        fontFamily: fonts['inter-medium'],
                        fontSize: 12,
                        color: '#f87171',
                      }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
