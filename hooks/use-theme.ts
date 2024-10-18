import { useCallback, useMemo } from 'react'
import { colors } from '../styles/colors'
import { useStorageTheme } from './use-storage-theme'
import { Appearance } from 'react-native'

export function useTheme() {
  const { setTheme: setItem, theme } = useStorageTheme()

  const setTheme = useCallback(
    async (theme: 'light' | 'dark') => {
      Appearance.setColorScheme(theme === 'dark' ? 'light' : 'dark')

      setItem(theme)
    },
    [setItem],
  )

  const {
    BACKGROUND_PRIMARY,
    BACKGROUND_SECONDARY,
    BORDER_PRIMARY,
    TEXT_PRIMARY,
  } = useMemo(() => {
    const BACKGROUND_PRIMARY = theme === 'dark' ? colors.zinc[900] : colors.white
    const BACKGROUND_SECONDARY = theme === 'dark' ? colors.zinc[800] : colors.zinc[100]

    const TEXT_PRIMARY = theme === 'dark' ? colors.white : colors.zinc[800]

    const BORDER_PRIMARY = theme === 'dark' ? colors.zinc[700] : colors.zinc[200]

    return {
      BACKGROUND_PRIMARY,
      BACKGROUND_SECONDARY,
      TEXT_PRIMARY,
      BORDER_PRIMARY,
    }
  }, [theme])

  return {
    setTheme,
    theme: theme as 'dark' | 'light',
    BACKGROUND_PRIMARY,
    BACKGROUND_SECONDARY,
    TEXT_PRIMARY,
    BORDER_PRIMARY,
  } as const
}
