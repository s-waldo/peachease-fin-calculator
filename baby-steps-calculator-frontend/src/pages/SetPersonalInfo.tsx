import {
  FormatDecimalNumberInput,
  FormBlock,
  FormFieldset,
  FormInput,
  FormLabel,
  FormTitle,
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
      <FormTitle>Personal Information</FormTitle>
      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Age</FormLabel>
        <FormInput
          type="number"
          name="age"
          id="age"
          min={0}
          max={100}
          value={userData.age}
          onChange={handleChange}
        />
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Annual Income</FormLabel>
        <FormatDecimalNumberInput
          name="annualIncome"
          id="annualIncome"
          value={userData.annualIncome}
          onChange={handleFormattedChange}
        />
      </FormFieldset>

      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Savings</FormLabel>
        <FormatDecimalNumberInput
          name="savings"
          id="savings"
          value={userData.savings}
          onChange={handleFormattedChange}
        />
      </FormFieldset>

      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Retirement Balance</FormLabel>
        <FormatDecimalNumberInput
          value={userData.retirementBalance}
          onChange={handleFormattedChange}
          name="retirementBalance"
          id="retirementBalance"
        />
      </FormFieldset>
    </FormBlock>
  )
}
