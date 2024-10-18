import '../global.css'

import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ToastProvider } from 'react-native-toast-notifications'
import {colors} from '../styles/colors'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { queryClient } from '~/api/client'

import { InitialPageLoading } from '~/components/initial-page-loading'
import { CustomHeaderBackButton } from '~/components/custom-header-back-button'

import { useTheme } from '~/hooks/use-theme'

import { fonts } from '~/styles/fonts'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'urbanist-regular': require('../assets/fonts/urbanist/Urbanist-Regular.ttf'),
    'urbanist-medium': require('../assets/fonts/urbanist/Urbanist-Medium.ttf'),
    'urbanist-semibold': require('../assets/fonts/urbanist/Urbanist-SemiBold.ttf'),
    'urbanist-bold': require('../assets/fonts/urbanist/Urbanist-Bold.ttf'),
    'inter-regular': require('../assets/fonts/inter/Inter-Regular.ttf'),
    'inter-medium': require('../assets/fonts/inter/Inter-Medium.ttf'),
    'inter-semibold': require('../assets/fonts/inter/Inter-SemiBold.ttf'),
  })

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!theme) setTheme('light')
  }, [setTheme, theme])

  if (!fontsLoaded) return <InitialPageLoading />

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme ? (theme === 'dark' ? colors.zinc[900] : colors.white) : colors.white,
      }}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider textStyle={{ fontFamily: 'inter-medium', fontSize: 11 }}>
          <Stack
            screenOptions={{
              animation: 'ios',
              headerTitleStyle: {
                fontFamily: fonts['urbanist-bold'],
                fontSize: 12,
                color: '#007AFF',
              },
              headerStyle: {
                backgroundColor: theme
                  ? theme === 'dark'
                    ? colors.zinc[900]
                    : colors.white
                  : colors.white,
              },
              headerLeft() {
                return <CustomHeaderBackButton />
              },
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: theme === 'dark' ? colors.zinc[900] : colors.white,
              },
            }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerTitle: 'Perfil' }} />
            <Stack.Screen
              name="add-users-via-profile"
              options={{ headerTitle: 'Adicione um novo usuário' }}
            />
            <Stack.Screen
              name="ranking-product"
              options={{ headerShown: false, animation: 'ios' }}
            />
            <Stack.Screen
              name="branches"
              options={{ headerTitle: 'Selecione uma filial' }}
            />
            <Stack.Screen name="filters" options={{ headerShown: false }} />
            <Stack.Screen
              name="details/[...to]"
              options={{ headerShown: false }}
            />
          </Stack>
        </ToastProvider>
      </QueryClientProvider>

      <StatusBar backgroundColor="#305a96" style="light" />
    </GestureHandlerRootView>
  )
}
