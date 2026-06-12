import {
  FormatDecimalNumberInput,
  FormBlock,
  FormFieldset,
  FormLabel,
  FormPercentInput,
  FormTitle,
} from "../components/form/formComponents"
import { formatInputValueToNumericDecimals } from "../utils/conversions"
import type { MortgageData } from "../utils/state/formState"
import { useGlobalStore } from "../utils/state/globalState"

export default function SetMortgage() {
  const mortgage = useGlobalStore((state) => state.formData.mortgage)
  const setMortgageData = useGlobalStore((state) => state.setMortgageData)

  const handleFormattedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMortgageData(
      e.target.name as keyof MortgageData,
      formatInputValueToNumericDecimals(e.target.value),
    )
  }
  return (
    <FormBlock>
      <FormTitle>Mortgage Information</FormTitle>
      <FormFieldset>
        <FormLabel htmlFor="balance">Mortgage Balance</FormLabel>
        <FormatDecimalNumberInput
          name="balance"
          id="balance"
          value={mortgage.balance}
          onChange={handleFormattedChange}
        />
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="rate">Mortgage Rate</FormLabel>
        <FormPercentInput
          name="rate"
          id="rate"
          value={mortgage.rate}
          onChange={handleFormattedChange}
        />
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="payment">Mortgage Payment</FormLabel>
        <FormatDecimalNumberInput
          name="payment"
          id="payment"
          value={mortgage.payment}
          onChange={handleFormattedChange}
        />
      </FormFieldset>
    </FormBlock>
  )
}
