type Common = {
  localId: string
  posicao: number
  produtoId: number
  produtoNome: string
  quantidadeTotal: number
  valorTotal: number
}

export type RankingProductDTO = {
  firstOfDayDTOList: Common[]
  firstOfMonthDTOList: Common[]
  firstOfWeekDTOList: Common[]
}
