import {FormBlock} from "../components/form/formComponents"
import type { MortgageData } from "../utils/state/formState"
import { useGlobalStore } from "../utils/state/globalState"

export default function SetMortgage() {
  const mortgage = useGlobalStore((state) => state.formData.mortgage)
  const setMortgageData = useGlobalStore((state) => state.setMortgageData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMortgageData(e.target.name as keyof MortgageData, e.target.value)
  }
  return (
    <FormBlock>
      <label htmlFor="annualIncome">Mortgage Balance</label>
      <input
        type="text"
        name="balance"
        id="balance"
        value={mortgage.balance}
        onChange={handleChange}
      />
      <label htmlFor="annualIncome">Mortgage Rate</label>
      <input
        type="text"
        name="rate"
        id="rate"
        value={mortgage.rate}
        onChange={handleChange}
      />
      <label htmlFor="annualIncome">Mortgage Payment</label>
      <input
        type="text"
        name="payment"
        id="payment"
        value={mortgage.payment}
        onChange={handleChange}
      />
    </FormBlock>
  )
}
