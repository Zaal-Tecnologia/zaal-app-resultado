type Common = {
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
}

export type RankingBranchDTO = {
  firstOfDayDTOList: Common[]
  firstOfMonthDTOList: Common[]
  firstOfWeekDTOList: Common[]
}
