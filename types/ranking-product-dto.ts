export interface Product {
  localId: string
  posicao: number
  produtoId: number
  produtoNome: string
  quantidadeTotal: number
  valorTotal: number
  color: string
  percentage: number
}

export type RankingProductDTO = {
  firstOfDayDTOList: Product[]
  firstOfMonthDTOList: Product[]
  firstOfWeekDTOList: Product[]
}

export type TransformedRankingProductDTO = {
  DIA: Product[]
  MÊS: Product[]
  SEMANA: Product[]
}
