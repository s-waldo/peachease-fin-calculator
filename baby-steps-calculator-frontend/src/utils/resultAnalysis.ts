import type { FinancialFreedomMonthT } from "./calculations"

export interface BabyStepSummaryT {
  step: number
  name: string
  description: string
  completed: boolean
  dateCompleted: string | null
}

export interface FinancialFreedomSummaryT {
  financialFreedomPossible: boolean
  currentBabyStep: number
  projectedRetirementNetWorth: number
  millionDollarNetWorthMonth: number | null
  babySteps: BabyStepSummaryT[]
}

const babyStepDefinitions: Array<
  Omit<BabyStepSummaryT, "completed" | "dateCompleted">
> = [
  {
    step: 1,
    name: "Emergency Fund ($1,000)",
    description: "Build a small emergency fund",
  },
  {
    step: 2,
    name: "Debt Snowball",
    description: "Pay off all non-mortgage debt",
  },
  {
    step: 3,
    name: "Full Emergency Fund (3-6 months)",
    description: "Save 3-6 months of expenses",
  },
  {
    step: 4,
    name: "Retirement Investing (15%)",
    description: "Invest 15% of gross income",
  },
  {
    step: 5,
    name: "College Savings",
    description: "Save for children's education",
  },
  {
    step: 6,
    name: "Pay Off Home Early",
    description: "Accelerate mortgage payments",
  },
  {
    step: 7,
    name: "Build Wealth & Give",
    description: "Invest and support causes",
  },
]

export function analyzeFinancialFreedomResults(
  months: FinancialFreedomMonthT[],
  options: { targetEmergencyFund: number; targetRetirementBalance: number },
): FinancialFreedomSummaryT {
  const targetEmergencyFund = options?.targetEmergencyFund ?? 20000

  if (months.length === 0) {
    return {
      financialFreedomPossible: false,
      currentBabyStep: 1,
      projectedRetirementNetWorth: 0,
      millionDollarNetWorthMonth: null,
      babySteps: babyStepDefinitions.map((step) => ({
        ...step,
        completed: false,
        dateCompleted: null,
      })),
    }
  }

  const latestMonth = months[months.length - 1]
  const projectedRetirementNetWorth =
    latestMonth.savings + latestMonth.retirementAccountBalance

  const emergencyFundReachedMonth = months.findIndex(
    (month) => month.savings >= 1000,
  )
  const debtFreeMonth = months.findIndex((month) =>
    month.debts.every((debt) => debt.balance <= 0),
  )
  const fullEmergencyFundMonth = months.findIndex(
    (month) => month.savings >= targetEmergencyFund,
  )
  const retirementStartedMonth = months.findIndex(
    (month) => month.savings >= targetEmergencyFund + 1,
  )
  const mortgageFreeMonth = months.findIndex(
    (month) => month.mortgage.balance <= 0,
  )
  const millionDollarNetWorthMonth = months.findIndex(
    (month) => month.savings + month.retirementAccountBalance >= 1000000,
  )

  const hasNoDebt = latestMonth.debts.every((debt) => debt.balance <= 0)
  const emergencyFundComplete = latestMonth.savings >= targetEmergencyFund
  const retirementGoalAchieved =
    latestMonth.retirementAccountBalance >= options.targetRetirementBalance
  const financialFreedomPossible =
    hasNoDebt && emergencyFundComplete && retirementGoalAchieved

  const firstMonth = months[0]
  const currentBabyStep = (() => {
    switch (true) {
      case firstMonth.savings < 1000:
        return 1
      case firstMonth.debts.some((debt) => debt.balance > 0):
        return 2
      case firstMonth.savings < targetEmergencyFund:
        return 3
      case firstMonth.retirementAccountBalance <= 0:
        return 4
      case firstMonth.mortgage.balance > 0:
        return 6
      default:
        return 7
    }
  })()

  const babySteps = babyStepDefinitions.map((step) => {
    const completedMonth: number | null =
      step.step === 1
        ? emergencyFundReachedMonth
        : step.step === 2
          ? debtFreeMonth
          : step.step === 3
            ? fullEmergencyFundMonth
            : step.step === 4
              ? retirementStartedMonth
              : mortgageFreeMonth

    const hasCompleted = completedMonth !== null && completedMonth === 0

    return {
      ...step,
      completed: hasCompleted,
      dateCompleted: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + (completedMonth ?? 0),
        1,
      )
        .toISOString()
        .slice(0, 10),
    }
  })

  return {
    financialFreedomPossible,
    currentBabyStep,
    projectedRetirementNetWorth,
    millionDollarNetWorthMonth:
      millionDollarNetWorthMonth >= 0 ? millionDollarNetWorthMonth : null,
    babySteps,
  }
}
