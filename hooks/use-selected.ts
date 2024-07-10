/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

// interface ISelected {
//   color: string
//   id: number
//   produtoNome: string
//   localId: string
//   posicao: string
//   quantidadeTotal: number
//   valorTotal: number
// }

interface ISelectedData {
  setSelected(selected: any | null): void
  selected: any | null
}

export const useSelected = create<ISelectedData>((set) => ({
  selected: null,
  setSelected: (selected) =>
    set(() => {
      return { selected }
    }),
}))
