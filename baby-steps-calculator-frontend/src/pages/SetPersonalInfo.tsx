import {
  FormatDecimalNumberInput,
  FormBlock,
  FormInput,
} from "../components/form/formComponents"
import { formatInputValueToNumericDecimals } from "../utils/conversions"
import type { UserData } from "../utils/state/formState"
import { useGlobalStore } from "../utils/state/globalState"

export default function SetPersonalInfo() {
  const userData = useGlobalStore((state) => state.formData.user)
  const setUserData = useGlobalStore((state) => state.setUserData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(e.target.name as keyof UserData, e.target.value)
  }

  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(
      e.target.name as keyof UserData,
      formatInputValueToNumericDecimals(e.target.value),
    )
  }
  return (
    <FormBlock>
      <form>
        <label htmlFor="annualIncome">Age</label>
        <FormInput 
          type="number"
          name="age"
          id="age"
          min={0}
          max={100}
          value={userData.age}
          onChange={handleChange}
        />
        <label htmlFor="annualIncome">Annual Income</label>
        <FormatDecimalNumberInput 
          name="annualIncome"
          id="annualIncome"
          value={userData.annualIncome}
          onChange={handleFormattedChange}
        />

        <label htmlFor="annualIncome">Savings</label>
        <FormatDecimalNumberInput 
          name="savings"
          id="savings"
          value={userData.savings}
          onChange={handleFormattedChange}
        />

        <label htmlFor="annualIncome">Retirement Balance</label>
        <FormatDecimalNumberInput
          value={userData.retirementBalance}
          onChange={handleFormattedChange}
          name="retirementBalance"
          id="retirementBalance"
        />
      </form>
    </FormBlock>
  )
}
