import { useColorScheme } from 'nativewind'
import { useCallback, useMemo } from 'react'
import { useMMKVString } from 'react-native-mmkv'
import { white, zinc } from 'tailwindcss/colors'

export function useTheme() {
  const { setColorScheme } = useColorScheme()

  const [theme, setItem] = useMMKVString('zaal-result-theme', undefined)

  const setTheme = useCallback(
    async (theme: 'light' | 'dark') => {
      setColorScheme(theme)

      setItem(theme)
    },
    [setColorScheme, setItem],
  )

  const {
    BACKGROUND_PRIMARY,
    BACKGROUND_SECONDARY,
    BORDER_PRIMARY,
    TEXT_PRIMARY,
  } = useMemo(() => {
    const BACKGROUND_PRIMARY = theme === 'dark' ? zinc[900] : white
    const BACKGROUND_SECONDARY = theme === 'dark' ? zinc[800] : zinc[100]

    const TEXT_PRIMARY = theme === 'dark' ? white : zinc[800]

    const BORDER_PRIMARY = theme === 'dark' ? zinc[700] : zinc[200]

    return {
      BACKGROUND_PRIMARY,
      BACKGROUND_SECONDARY,
      TEXT_PRIMARY,
      BORDER_PRIMARY,
    }
  }, [theme])

  return {
    setTheme,
    theme,
    BACKGROUND_PRIMARY,
    BACKGROUND_SECONDARY,
    TEXT_PRIMARY,
    BORDER_PRIMARY,
  } as const
}
