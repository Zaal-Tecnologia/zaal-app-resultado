import { useRef } from 'react'

import BottomSheet from '@gorhom/bottom-sheet'

export function useSheet() {
  const sheetRef = useRef<BottomSheet>(null)

  return sheetRef
}
