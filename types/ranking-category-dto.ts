type Common = {
  categoriaId: number
  categoriaNome: string
  localId: string
  posicao: number
  quantidadeTotal: number
  valorTotal: number
}

export type RankingCategoryDTO = {
  firstOfDayToList: Common[]
  firstOfMonthToList: Common[]
  firstOfWeekToList: Common[]
}
