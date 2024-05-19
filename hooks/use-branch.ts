import { create } from 'zustand'

import type { BranchResponseDTO } from '~/types/branch-response-dto'

type Props = {
  setBranch(value: BranchResponseDTO): void
  branch: BranchResponseDTO
}

export const FAKE_BRANCH_TO_INITIAL_DATA: BranchResponseDTO = {
  id: 0,
  localId: '0',
  razaoSocial: '0',
  nomeFantasia: 'Todas as filiais',
  cnpj: '-',
}

export const useBranch = create<Props>((set) => ({
  branch: FAKE_BRANCH_TO_INITIAL_DATA,
  setBranch: (branch) => set(() => ({ branch })),
}))
