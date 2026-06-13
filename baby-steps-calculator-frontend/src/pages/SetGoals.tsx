import {
  FormatDecimalNumberInput,
  FormBlock,
  FormFieldset,
  FormLabel,
  FormPercentInput,
} from "../components/form/formComponents"
import { formatInputValueToNumericDecimals } from "../utils/conversions"
import type { GoalsData } from "../utils/state/formState"
import { useGlobalStore } from "../utils/state/globalState"

export default function SetGoals() {
  const goals = useGlobalStore(state => state.formData.goals)
  const setGoals = useGlobalStore(state => state.setGoalsData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoals(e.target.name as keyof GoalsData, formatInputValueToNumericDecimals(e.target.value))
  }
  return (
    <FormBlock>
      <h3>Set Goals</h3>
      <FormFieldset>
        <FormLabel htmlFor="targetEmergencyFund">Target Emergency Fund</FormLabel>
        <FormatDecimalNumberInput name="targetEmergencyFund" id="targetEmergencyFund" value={goals.targetEmergencyFund} onChange={handleChange} />
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="targetRetirementBalance">Retirement Goal</FormLabel>
        <FormatDecimalNumberInput name="targetRetirementBalance" id="targetRetirementBalance" value={goals.targetRetirementBalance} onChange={handleChange}/>
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="snowballAmount">Snowball Amount</FormLabel>
        <FormatDecimalNumberInput name="snowballAmount" id="snowballAmount" value={goals.snowballAmount} onChange={handleChange}/>
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="projectedReturns">Projected Returns</FormLabel>
        <FormPercentInput name="projectedReturns" id="projectedReturns" value={goals.projectedReturns} onChange={handleChange}/>
      </FormFieldset>
    </FormBlock>
  )
}
