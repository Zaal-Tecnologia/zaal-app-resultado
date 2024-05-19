type Common = {
  marcaId: number
  marcaNome: string
  localId: string
  posicao: number
  quantidadeTotal: number
  valorTotal: number
}

export type RankingBrandDTO = {
  firstOfDayToList: Common[]
  firstOfMonthToList: Common[]
  firstOfWeekToList: Common[]
}
