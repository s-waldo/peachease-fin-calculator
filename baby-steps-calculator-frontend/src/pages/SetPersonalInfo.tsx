import { FormBlock } from "../components/form/formComponents"

export default function SetPersonalInfo() {
  return (
    <FormBlock>
      <form>
        <label htmlFor="annualIncome">Age</label>
        <input type="text" inputMode="decimal" />
        <label htmlFor="annualIncome">Snowball Amount</label>
        <input type="text" inputMode="decimal" />
        <label htmlFor="annualIncome">Annual Income</label>
        <input type="text" inputMode="decimal" />

        <label htmlFor="annualIncome">Savings</label>
        <input type="text" />
        <label htmlFor="annualIncome">Target Emergency Fund</label>
        <input type="text" />

        <label htmlFor="annualIncome">Retirement Balance</label>
        <input type="text" />
      </form>
    </FormBlock>
  )
}
