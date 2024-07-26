export interface ICategory {
  categoriaId: number
  categoriaNome: string
  localId: string
  posicao: number
  quantidadeTotal: number
  valorTotal: number
  color: string
  percentage: number
}

export type RankingCategoryDTO = {
  firstOfDayToList: ICategory[]
  firstOfMonthToList: ICategory[]
  firstOfWeekToList: ICategory[]
}
