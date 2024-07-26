export interface ISale {
  indice: number
  quantidadeTotal: number
  valorTotal: number
  posicao: string
  color: string
  percentage: number
}

export type TotalSalesResponseDTO = {
  diaCorrente: ISale[]
  mesCorrente: ISale[]
  semanaCorrente: ISale[]
}
