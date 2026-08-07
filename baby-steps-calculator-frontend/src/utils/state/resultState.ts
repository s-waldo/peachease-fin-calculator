import type { StateCreator } from "zustand"
import { calculateFinancialFreedom, mockData } from "../calculations"
import {
  analyzeFinancialFreedomResults,
  type FinancialFreedomSummaryT,
} from "../resultAnalysis"

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
  summary: FinancialFreedomSummaryT
  setResults: (results: ResultsT[], options: {targetEmergencyFund: number, targetRetirementBalance: number}) => void
  resetResults: () => void
}

export const resultStateStore: StateCreator<
  ResultStateStoreT,
  [],
  [],
  ResultStateStoreT
> = (set) => {
  const calculatedResults = calculateFinancialFreedom({
    stats: mockData,
    snowball: 2000,
    ageInMonths: 25 * 12,
    options: {
      projectedReturnAsInteger: 11,
      targetEmergencyFund: 25000,
    },
  })

  return {
    results: calculatedResults,
    summary: analyzeFinancialFreedomResults(calculatedResults, {
      targetEmergencyFund: 25000,
      targetRetirementBalance: 1000000
    }),
    setResults: (results, options) =>
      set({
        results,
        summary: analyzeFinancialFreedomResults(results, options),
      }),
    resetResults: () =>
      set({ results: [], summary: analyzeFinancialFreedomResults([], {targetEmergencyFund: 0, targetRetirementBalance: 0}) }),
  }
}
