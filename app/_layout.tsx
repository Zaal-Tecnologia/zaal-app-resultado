import '../global.css'

import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ToastProvider } from 'react-native-toast-notifications'
import { white, zinc } from 'tailwindcss/colors'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { asyncStoragePersister, queryClient } from '~/api/client'

import { InitialPageLoading } from '~/components/initial-page-loading'

import { useTheme } from '~/hooks/use-theme'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

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
        backgroundColor: theme ? (theme === 'dark' ? zinc[900] : white) : white,
      }}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}>
        <ToastProvider textStyle={{ fontFamily: 'inter-medium' }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme === 'dark' ? zinc[900] : white,
              },
            }}
          />
        </ToastProvider>
      </PersistQueryClientProvider>

      <StatusBar backgroundColor="#305a96" style="light" />
    </GestureHandlerRootView>
  )
}
