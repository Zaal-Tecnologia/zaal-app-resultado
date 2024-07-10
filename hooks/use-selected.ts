import { create } from 'zustand'

interface ISelected {
  color: string
  id: number
  produtoNome: string
  localId: string
  posicao: string
  quantidadeTotal: number
  valorTotal: number
}

interface ISelectedData {
  setSelected(selected: ISelected | null): void
  selected: ISelected | null
}

export const useSelected = create<ISelectedData>((set) => ({
  selected: null,
  setSelected: (selected) =>
    set(() => {
      return { selected }
    }),
}))
