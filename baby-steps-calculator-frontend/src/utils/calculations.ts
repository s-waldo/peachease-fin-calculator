// TODO:  Generate functions for each category.

// Master Calculation Function
type FFOptionsT = {
  targetEmergencyFund: number
  projectedReturnAsInteger: number
}
export function calculateFinancialFreedom(
  stats: FinancialFreedomTrackerT,
  snowball: number,
  ageInMonths: number,
  options: FFOptionsT,
) {
  // TODO: Create exception calculator for life as is.
  if (snowball <= 0)
    return "Error: Financial Freedom not possible if nothing changes."
  options.projectedReturnAsInteger = options.projectedReturnAsInteger ?? 10
  options.targetEmergencyFund = options.targetEmergencyFund ?? 20000
  const netWorthTracker = []
  const financialTracker = structuredClone(stats)
  // sort debts by balance from smallest to largest
  financialTracker.debts = financialTracker.debts.sort(
    (a, b) => a.balance - b.balance,
  )
  while (ageInMonths < 65 * 12) {
    const [
      { savings, debts, mortgage, retirementAccountBalance },
      snowballChange,
    ] = calculateMonthOfFinancialProgress(financialTracker, snowball, options)
    netWorthTracker.push({
      savings,
      debts,
      mortgage: {
        balance: mortgage.balance,
        rate: mortgage.interestRateAsInteger,
        payment: mortgage.payment,
      },
      retirementAccountBalance,
    })
    snowball = snowballChange
    ageInMonths++
  }

  return netWorthTracker
}

export function calculateMonthOfFinancialProgress(
  financialTracker: FinancialFreedomTrackerT,
  snowball: number,
  {targetEmergencyFund, projectedReturnAsInteger}: FFOptionsT,
): [FinancialFreedomTrackerT, number] {
  // do other monthly bills
  financialTracker.mortgage = payMortgage(financialTracker.mortgage)
  financialTracker.debts = payDebts(financialTracker.debts)
  financialTracker.retirementAccountBalance = monthlyRetirementInterest(
    financialTracker.retirementAccountBalance,
    projectedReturnAsInteger,
  )

  const monthlyIncome = financialTracker.annualIncome / 12

  // Assess which baby step this month is on
  if (financialTracker.savings < 1000) {
    financialTracker.savings +=
      snowball + financialTracker.savings > 1000
        ? 1000 - financialTracker.savings
        : snowball
  } else if (financialTracker.debts.length > 0) {
    if (financialTracker.debts[0].balance > 0) {
      if (financialTracker.debts[0].balance > snowball) {
        financialTracker.debts[0].balance -= snowball
      } else {
        financialTracker.debts[0].balance = 0
      }
    } else if (financialTracker.debts.length > 1) {
      financialTracker.debts[1].balance -= snowball
    }
    if (financialTracker.debts[0].balance === 0) {
      snowball += financialTracker.debts[0].minimumPayment
      financialTracker.debts = financialTracker.debts.slice(1)
    }
  } else if (financialTracker.savings < targetEmergencyFund) {
    financialTracker.savings += snowball
  } else if (financialTracker.mortgage.balance > 0) {
    if (monthlyIncome * 0.15 < snowball) {
      const retirement = Math.floor(monthlyIncome * 0.15)
      const extraPayment = snowball - retirement
      financialTracker.mortgage.balance -= extraPayment
      financialTracker.retirementAccountBalance += retirement
    }
  } else {
    const retirement = Math.floor(monthlyIncome * 0.25)
    financialTracker.retirementAccountBalance += retirement
  }
  // perform that baby step
  // return tracker
  return [financialTracker, snowball]
}

function payMortgage(mortgage: MortgageT) {
  const interestPayment =
    mortgage.balance * (mortgage.interestRateAsInteger / 12 / 100)
  const principalPayment = Math.min(
    (mortgage.payment * 100 - interestPayment * 100) / 100,
    mortgage.balance,
  )
  mortgage.balance =
    Math.floor((mortgage.balance - principalPayment) * 100) / 100
  return mortgage
}

function payDebts(debts: DebtType[]): DebtType[] {
  const debtCopy = structuredClone(debts)
  for (const debt of debtCopy) {
    const interest = calculateMonthlyDebtInterest(
      debt.balance,
      debt.interestRateAsInteger,
    )
    // if monthly payment is less than balance
    if (debt.minimumPayment >= interest + debt.balance) {
      // apply monthly payments to balances or balance
      debt.balance = 0
    }
    // else
    else {
      // apply minimum payment to balance
      debt.balance -= debt.minimumPayment - interest
      debt.balance = Math.floor(debt.balance * 100) / 100
    }
  }
  return debtCopy
}

// Income Calculations
export function calculateTakeHomePay(
  pay: number,
  frequency: "weekly" | "biweekly" | "semimonthly" | "monthly",
) {
  switch (frequency) {
    case "weekly":
      return pay * 52
    case "biweekly":
      return pay * 26
    case "semimonthly":
      return pay * 24
    case "monthly":
      return pay * 12
  }
}

// Emergency Fund Calculator - calculate months to save for emergency fund
export function calculateEmergencyFundTimeline(
  monthlySavings: number,
  targetGoal: number,
  startingBalance = 0,
) {
  const tracker = []
  let month = 0
  let savings = startingBalance
  while (savings < targetGoal) {
    month++
    savings +=
      monthlySavings + savings > targetGoal
        ? targetGoal - savings
        : monthlySavings
    tracker.push({
      month,
      savings,
    })
  }
  return tracker
}

// Debt Snowball Calculator
export function calculateDebtSnowballTimeInMonths(
  debts: DebtType[],
  snowballAmount: number,
) {
  let debtCounter = 0
  let months = 0
  let snowball = snowballAmount
  const sortedDebts = structuredClone(debts).sort(
    (a, b) => a.balance - b.balance,
  )
  while (debtCounter < sortedDebts.length) {
    // for each debt
    for (const debt of sortedDebts) {
      // calculate interest each month for all debts
      const interest = calculateMonthlyDebtInterest(
        debt.balance,
        debt.interestRateAsInteger,
      )
      // if monthly payment is less than balance
      if (debt.minimumPayment >= interest + debt.balance) {
        // apply monthly payments to balances or balance
        debt.balance = 0
      }
      // else
      else {
        // apply minimum payment to balance
        debt.balance -= debt.minimumPayment - interest
      }
    }
    // if snowball is greater than balance
    if (snowball >= sortedDebts[debtCounter].balance) {
      // remove balance from snowball amount in temp number
      let temp = snowball
      temp -= sortedDebts[debtCounter].balance
      sortedDebts[debtCounter].balance = 0
      // apply remainder of snowball to next debt
      if (debtCounter < sortedDebts.length - 1)
        sortedDebts[debtCounter + 1].balance -= temp
    } else {
      // apply snowball amount to smallest debt, first in sorted debts array
      sortedDebts[debtCounter].balance -= snowball
    }
    // if debt balance is 0
    if (sortedDebts[debtCounter].balance <= 0) {
      // add minimum payment to snowball
      snowball += sortedDebts[debtCounter].minimumPayment
      // remove debt from sorted list
      debtCounter++
    }
    months++
    console.log(sortedDebts)
    // break
  }
  return months
}

// 401k Calculator
export function calculateRetirementSavings(
  presentValue: number,
  monthlyContribution: number,
  annualInterestRateAsInteger: number,
  investmentYears: number,
) {
  const monthlyInterestRate = annualInterestRateAsInteger / 12 / 100
  const totalPeriods = investmentYears * 12
  return (
    presentValue * Math.pow(1 + monthlyInterestRate, totalPeriods) +
    monthlyContribution *
      ((Math.pow(1 + monthlyInterestRate, totalPeriods) - 1) /
        monthlyInterestRate)
  )
}

function monthlyRetirementInterest(balance: number, interestRate: number) {
  const monthlyRate = interestRate / 12 / 100
  return Math.floor((balance + balance * monthlyRate) * 100) / 100
}

// 529 Calculator
export function calculateCollegeSavings(
  presentValue: number,
  monthlyContribution: number,
  annualInterestRateAsInteger: number,
  investmentYears: number,
) {
  const monthlyInterestRate = annualInterestRateAsInteger / 12 / 100
  const totalPeriods = investmentYears * 12
  return (
    presentValue * Math.pow(1 + monthlyInterestRate, totalPeriods) +
    monthlyContribution *
      ((Math.pow(1 + monthlyInterestRate, totalPeriods) - 1) /
        monthlyInterestRate)
  )
}

// Mortgage Payoff Calculator

// Helper Calculations
// Income Calculator - calculate income based on paychecks

// Mortgage payment calculation
export function calculateMortgagePayment(
  startingBalance: number,
  interestRateAsInteger: number,
  loanYears: number,
) {
  const monthlyInterestRate = interestRateAsInteger / 12 / 100
  const totalPayments = loanYears * 12
  return Math.round(
    startingBalance *
      ((monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)),
  )
}
// Mortgage payment amortization calculator
export function getMortgageSchedule(
  startingBalance: number,
  interestRateAsInteger: number,
  loanYears: number,
  payment: number,
) {
  const paymentSchedule = []
  const monthlyInterestRate = interestRateAsInteger / 12 / 100
  const totalPayments = loanYears * 12
  let balance = startingBalance
  for (let i = 0; i < totalPayments; i++) {
    const interestPayment =
      Math.floor(balance * monthlyInterestRate * 100) / 100
    const principalPayment = Math.min(
      (payment * 100 - interestPayment * 100) / 100,
      balance,
    )
    balance = Math.floor((balance - principalPayment) * 100) / 100
    paymentSchedule.push({
      month: i + 1,
      interestPayment,
      principalPayment,
      balance,
    })
  }
  return paymentSchedule
}

// Debt Interest Calculator
export function calculateMonthlyDebtInterest(
  balance: number,
  interestRate: number,
) {
  return (interestRate / 12 / 100) * balance
}

export function calculateDebtMonthlyBalance(
  balance: number,
  interestRateAsPercent: number,
  payment: number,
) {
  const interestThisPeriod = calculateMonthlyDebtInterest(
    balance,
    interestRateAsPercent,
  )
  const principalPaid = payment - interestThisPeriod
  return balance - principalPaid
}

// Mock Data
export const mockData: FinancialFreedomTrackerT = {
  annualIncome: 100000,
  savings: 0,
  debts: [
    {
      name: "Discover Credit",
      balance: 2000,
      minimumPayment: 125,
      interestRateAsInteger: 24.99,
    },
    {
      name: "Medical Debt",
      balance: 1000,
      minimumPayment: 125,
      interestRateAsInteger: 0,
    },
    {
      name: "HELOC",
      balance: 4000,
      minimumPayment: 210,
      interestRateAsInteger: 6,
    },
    {
      name: "Car Loan",
      balance: 13000,
      minimumPayment: 510,
      interestRateAsInteger: 8,
    },
  ],
  mortgage: {
    balance: 310000,
    interestRateAsInteger: 6.8,
    payment: calculateMortgagePayment(310000, 6.8, 30),
  },
  retirementAccountBalance: 3000,
}
export type DebtType = {
  name: string
  balance: number
  minimumPayment: number
  interestRateAsInteger: number
}

export type FinancialFreedomTrackerT = {
  annualIncome: number
  savings: number
  debts: DebtType[]
  mortgage: MortgageT
  retirementAccountBalance: number
}

export type MortgageT = {
  balance: number
  payment: number
  interestRateAsInteger: number
}

export type FinancialFreedomMonthT = {
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
