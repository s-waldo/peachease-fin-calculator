import type { StateCreator } from "zustand"
import { calculateFinancialFreedom, mockData } from "../calculations"

export interface ResultsT {
  savings: number
  debts: {
    name: string
    balance: number
    minimumPayment: number
    interestRateAsInteger: number
  }[]
  mortgage: {
    balance: number
    rate: number
    payment: number
  }
  retirementAccountBalance: number
}

export interface ResultStateStoreT {
  results: ResultsT[]
  setResults: (results: ResultsT[]) => void
  resetResults: () => void
}

export const resultStateStore: StateCreator<
  ResultStateStoreT,
  [],
  [],
  ResultStateStoreT
> = (set) => ({
  results: calculateFinancialFreedom(mockData, 2000, 25 * 12, {
    projectedReturnAsInteger: 10,
    targetEmergencyFund: 25000,
  }),
  setResults: (results) => set({ results }),
  resetResults: () => set({ results: [] }),
})
