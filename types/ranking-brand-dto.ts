export interface IBrand {
  marcaId: number
  marcaNome: string
  localId: string
  posicao: number
  quantidadeTotal: number
  valorTotal: number
  color: string
  percentage: number
}

export type RankingBrandDTO = {
  firstOfDayToList: IBrand[]
  firstOfMonthToList: IBrand[]
  firstOfWeekToList: IBrand[]
}
