interface Common {
  indice: number
  quantidadeTotal: number
  valorTotal: number
}

export interface TotalSalesDTO {
  diaCorrente: Common[]
  mesCorrente: Common[]
  semanaCorrente: Common[]
}
