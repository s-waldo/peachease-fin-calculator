import { useForm } from "react-hook-form"
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
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

const PersonalSchema = z.object({
  age: z.string().min(1),
  annualIncome: z.string(),
  savings: z.string(),
  retirementBalance: z.string().min(15, "Too short!"),
})

export default function SetPersonalInfo() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PersonalSchema),
    mode: "onTouched",
  })
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
  const onSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted!!!")
  }
  return (
    <FormBlock onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Personal Information</FormTitle>
      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Age</FormLabel>
        <FormInput
          register={register("age")}
          type="number"
          name="age"
          id="age"
          min={0}
          max={100}
          value={userData.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age?.message}</p>}
      </FormFieldset>
      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Annual Income</FormLabel>
        <FormatDecimalNumberInput
          register={register("annualIncome")}
          id="annualIncome"
          value={userData.annualIncome}
          onChange={handleFormattedChange}
        />
      </FormFieldset>

      <FormFieldset>
        <FormLabel htmlFor="annualIncome">Savings</FormLabel>
        <FormatDecimalNumberInput
          register={register('savings')}
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
          register={register('retirementBalance')}
          id="retirementBalance"
        />
      </FormFieldset>
    </FormBlock>
  )
}
