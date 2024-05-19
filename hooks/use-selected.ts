import { useState } from 'react'

export function useSelected<T>() {
  const [selected, setSelected] = useState<T | null>(null)

  return { selected, setSelected } as const
}
