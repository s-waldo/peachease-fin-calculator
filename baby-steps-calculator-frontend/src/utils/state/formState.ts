import { type StateCreator } from "zustand"

type UserData = {
  age: string
  annualIncome: string
  savings: string
  retirementBalance: string
}
export type MortgageData = {
  balance: string
  rate: string
  payment: string
}
export type DebtData = {
  id: string
  name: string
  balance: string
  minimumPayment: string
  interestRateAsInteger: string
}
type GoalsData = {
  targetEmergencyFund: string
  targetRetirementBalance: string
  snowballAmount: string
  projectedReturns: string
}

type FormData = {
  user: UserData
  mortgage: MortgageData
  debts: DebtData[]
  goals: GoalsData
}

export interface FormStateStoreT {
  formData: FormData
  setUserData: (section: keyof UserData, newData: string) => void
  setMortgageData: (section: keyof MortgageData, newData: string) => void
  addDebt: (debt: DebtData) => void
  deleteDebt: (id: string) => void
  setGoalsData: (section: keyof GoalsData, newData: string) => void
  resetForm: () => void
}
const initialFormValue: FormData = {
  user: { age: "", annualIncome: "", savings: "", retirementBalance: "" },
  mortgage: { balance: "", rate: "", payment: "" },
  debts: [],
  goals: {
    targetEmergencyFund: "",
    targetRetirementBalance: "",
    snowballAmount: "",
    projectedReturns: "",
  },
}

export const formStateStore: StateCreator<
  FormStateStoreT,
  [],
  [],
  FormStateStoreT
> = (set) => ({
  formData: initialFormValue,
  setUserData: (section, newData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        user: { ...state.formData.user, [section]: newData },
      },
    })),
  setMortgageData: (section, newData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        mortgage: {
          ...state.formData.mortgage,
          [section]: newData,
        },
      },
    })),
  addDebt: (debt) =>
    set((state) => ({
      formData: {
        ...state.formData,
        debts: [...state.formData.debts, debt],
      },
    })),
  deleteDebt: (id) => {
    set((state) => ({
      formData: {
        ...state.formData,
        debts: state.formData.debts.filter((debt) => debt.id !== id),
      },
    }))
  },
  setGoalsData: (section, newData) =>
    set((state) => ({
      formData: {
        ...state.formData,
        goals: {
          ...state.formData.goals,
          [section]: newData,
        },
      },
    })),
  resetForm: () => set({ formData: initialFormValue }),
})
