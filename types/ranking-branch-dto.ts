export interface IBranch {
  filial: {
    cnpj: string
    id: number
    localId: string
    nomeFantasia: string
    razaoSocial: string
  }
  posicao: number
  quantidadeTotal: number
  valorTotal: number
  color: string
  quantity: number
  percentage: number
}

export type RankingBranchDTO = {
  firstOfDayDTOList: IBranch[]
  firstOfMonthDTOList: IBranch[]
  firstOfWeekDTOList: IBranch[]
}
