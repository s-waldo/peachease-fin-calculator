import { useState } from "react"
import { FormTitle, Input } from "../components/form/formComponents"
import { z } from "zod"
import { useFieldArray, useForm, type FieldPath } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formatInputValueToNumericDecimals } from "../utils/conversions"

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["age", "annualIncome", "savings", "retirementBalance"],
  },
  {
    id: "Step 2",
    name: "Mortgage Information",
    fields: ["balance", "payment", "rate"],
  },
  {
    id: "Step 3",
    name: "Debt Information",
    fields: [],
  },
  {
    id: "Step 4",
    name: "Goals",
    fields: [
      "targetEmergencyFund",
      "targetRetirementBalance",
      "snowballAmount",
      "projectedReturns",
    ],
  },
]

const zFormData = z.object({
  age: z.string().min(1, { error: "Age is Required" }),
  annualIncome: z
    .string()
    .min(1, { error: "Annual Income is Required" })
    .refine((val) => Number(val.replace(',', '')) > 0, "Must be greater than 0"),
  savings: z.string().min(1, { error: "Savings is Required" }),
  retirementBalance: z
    .string()
    .min(1, { error: "Retirement Balance is Required" }),
  balance: z.string().min(1, { error: "Balance is Required" }),
  payment: z.string().min(1, { error: "Payment is Required" }),
  rate: z.string().min(1, { error: "Rate is Required" }),
  targetEmergencyFund: z
    .string()
    .min(1, { error: "Target Emergency Fund is Required" })
    .refine((val) => Number(val.replace(',', '')) > 0, "Must be greater than 0"),
  targetRetirementBalance: z
    .string()
    .min(1, { error: "Target Retirement Balance is Required" })
    .refine((val) => Number(val.replace(',', '')) > 0, "Must be greater than 0"),
  snowballAmount: z
    .string()
    .min(1, { error: "Snowball Amount is Required" })
    .refine((val) => Number(val.replace(',', '')) > 0, "Must be greater than 0"),
  projectedReturns: z
    .string()
    .min(1, { error: "Projected Returns is Required" }),
  debts: z.array(
    z.object({
      name: z.string(),
      balance: z.string(),
      minimumPayment: z.string(),
      interestRate: z.string(),
    }),
  ),
})

type zFormDataT = z.infer<typeof zFormData>
export default function Form() {
  const [step, setStep] = useState(0)
  const [isFormShown, setIsFormShown] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const {
    formState: { errors },
    register,
    trigger,
    control,
    watch,
    reset,
    handleSubmit,
  } = useForm<zFormDataT>({
    resolver: zodResolver(zFormData),
    mode: "all",
    defaultValues: {
      age: "25",
      balance: "0.00",
      annualIncome: "0.00",
      debts: [],
      payment: "0.00",
      projectedReturns: "10",
      rate: "0.00",
      retirementBalance: "0.00",
      savings: "0.00",
      snowballAmount: "0.00",
      targetEmergencyFund: "0.00",
      targetRetirementBalance: "0.00",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "debts",
  })

  const next = async (e?: React.MouseEvent) => {
    e?.preventDefault()
    console.log("next() called, step is:", step)
    if (step < steps.length - 1) {
      const fields = steps[step].fields
      const isValidPage = await trigger(fields as FieldPath<zFormDataT>[], {
        shouldFocus: true,
      })
      if (!isValidPage) return
      setStep((prev) => prev + 1)
    }
  }

  const showForm = () => {
    setIsFormShown((prev) => !prev)
  }

  const resetForm = () => {
    reset()
    setStep(0)
  }

  const prev = () => {
    if (step === 0) return
    setStep((prev) => prev - 1)
  }
  const onSubmit = (formData: zFormDataT) => {
    console.log(formData)
  }

  const handleEditIndex = (index: number) => {
    setEditingIndex(index)
  }

  const handleSaveEdit = () => {
    setEditingIndex(null)
  }

  const watchedDebts = watch("debts")

  return (
    <form className="w-full max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 rounded-2xl mb-4 shadow">
        <button type="button" className="btn btn-ghost" onClick={resetForm}>
          Reset
        </button>

        {step === 0 && (
          <>
            <FormTitle>Personal Information</FormTitle>
            <fieldset className="fieldset">
              <label className="label" htmlFor="age">
                Age
              </label>
              <input
                className="input"
                type="number"
                id="age"
                min={0}
                max={100}
                {...register("age")}
              />
              {errors.age && (
                <p className="text-red-400 text-xs">{errors.age.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="annualIncome">
                Annual Income
              </label>
              <Input
                type="currency"
                id="annualIncome"
                register={register("annualIncome", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.annualIncome && (
                <p className="text-red-400 text-xs">
                  {errors.annualIncome.message}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="savings">
                Savings
              </label>
              <Input
                type="currency"
                id="savings"
                register={register("savings", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.savings && (
                <p className="text-red-400 text-xs">{errors.savings.message}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="retirementBalance">
                Retirement Balance
              </label>
              <Input
                type="currency"
                id="savings"
                register={register("retirementBalance", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.retirementBalance && (
                <p className="text-red-400 text-xs">
                  {errors.retirementBalance.message}
                </p>
              )}
            </fieldset>
          </>
        )}
        {step === 1 && (
          <>
            <FormTitle>Mortgage Information</FormTitle>
            <fieldset className="fieldset">
              <label className="label" htmlFor="balance">
                Mortgage Balance
              </label>
              <Input
                type="currency"
                id="savings"
                register={register("balance", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.balance && (
                <p className="text-red-400 text-xs">{errors.balance.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="rate">
                Mortgage Rate
              </label>
              <Input
                type="percent"
                id="rate"
                register={register("rate", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.rate && (
                <p className="text-red-400 text-xs">{errors.rate.message}</p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="payment">
                Mortgage Payment
              </label>
              <Input
                type="currency"
                id="payment"
                register={register("payment", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.payment && (
                <p className="text-red-400 text-xs">{errors.payment.message}</p>
              )}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <>
            <FormTitle>Debts</FormTitle>
            <div>
              {fields.length === 0 && !isFormShown ? (
                <div>You currently have no debts.</div>
              ) : (
                fields.map((field, index) => {
                  if (isFormShown && index === fields.length - 1) return null

                  const currentDebt = watchedDebts[index] || field

                  if (editingIndex === index) {
                    return (
                      <div className="rounded shadow py-2 px-2" key={field.id}>
                        <fieldset className="fieldset">
                          <label htmlFor={`edit-name-${index}`}>Name</label>
                          <Input
                            type="text"
                            id={`edit-name-${index}`}
                            register={register(`debts.${index}.name`, {
                              onChange: (e) => {
                                e.target.value =
                                  formatInputValueToNumericDecimals(
                                    e.target.value,
                                  )
                              },
                            })}
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <label htmlFor={`edit-balance-${index}`}>
                            Balance
                          </label>
                          <Input
                            type="currency"
                            id={`edit-balance-${index}`}
                            register={register(`debts.${index}.balance`)}
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <label htmlFor={`edit-minimumPayment-${index}`}>
                            Minimum Payment
                          </label>
                          <Input
                            type="currency"
                            id={`edit-minimumPayment-${index}`}
                            register={register(
                              `debts.${index}.minimumPayment`,
                              {
                                onChange: (e) => {
                                  e.target.value =
                                    formatInputValueToNumericDecimals(
                                      e.target.value,
                                    )
                                },
                              },
                            )}
                          />
                        </fieldset>
                        <fieldset className="fieldset">
                          <label htmlFor={`edit-interestRate-${index}`}>
                            Interest Rate
                          </label>
                          <Input
                            type="percent"
                            id={`edit-interestRate-${index}`}
                            register={register(`debts.${index}.interestRate`, {
                              onChange: (e) => {
                                e.target.value =
                                  formatInputValueToNumericDecimals(
                                    e.target.value,
                                  )
                              },
                            })}
                          />
                        </fieldset>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => handleSaveEdit()}
                        >
                          <i className="fa-solid fa-save"></i>Save
                        </button>
                      </div>
                    )
                  }

                  return (
                    <div
                      className="rounded shadow py-2 px-2 grid grid-cols-3 tabular-nums"
                      key={field.id}
                    >
                      <div className="col-span-2 flex flex-col">
                        <div className="text-lg font-bold">
                          {currentDebt.name}
                        </div>
                        <div className="flex flex-col text-xs">
                          <div>
                            Balance: <strong>${currentDebt.balance}</strong>
                          </div>
                          <div>
                            Interest:{" "}
                            <strong>{currentDebt.interestRate}%</strong>
                          </div>
                          <div>
                            Min. Payment:{" "}
                            <strong>
                              $
                              {Number(
                                currentDebt.minimumPayment,
                              ).toLocaleString()}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        <button
                          type="button"
                          className="btn btn-xs btn-ghost"
                          onClick={() => handleEditIndex(index)}
                        >
                          <i className="text-sm fa-solid fa-edit"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-xs btn-ghost"
                          onClick={() => remove(index)}
                        >
                          <i className="text-sm fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div>
              {isFormShown ? (
                <div>
                  <fieldset className="fieldset">
                    <label htmlFor="name">Name</label>
                    <Input
                      type="text"
                      id="name"
                      register={register(`debts.${fields.length - 1}.name`)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <label htmlFor="balance">Balance</label>
                    <Input
                      type="currency"
                      id="balance"
                      register={register(`debts.${fields.length - 1}.balance`, {
                        onChange: (e) => {
                          e.target.value = formatInputValueToNumericDecimals(
                            e.target.value,
                          )
                        },
                      })}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <label htmlFor="minimumPayment">Minimum Payment</label>
                    <Input
                      type="currency"
                      id="minimumPayment"
                      register={register(
                        `debts.${fields.length - 1}.minimumPayment`,
                        {
                          onChange: (e) => {
                            e.target.value = formatInputValueToNumericDecimals(
                              e.target.value,
                            )
                          },
                        },
                      )}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <label htmlFor="interestRate">Interest Rate</label>
                    <Input
                      type="percent"
                      id="interestRate"
                      register={register(
                        `debts.${fields.length - 1}.interestRate`,
                        {
                          onChange: (e) => {
                            e.target.value = formatInputValueToNumericDecimals(
                              e.target.value,
                            )
                          },
                        },
                      )}
                    />
                  </fieldset>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      showForm()
                    }}
                  >
                    <i className="fa-solid fa-save"></i>Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      remove(fields.length - 1)
                      showForm()
                    }}
                  >
                    <i className="fa-solid fa-x"></i>Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    showForm()
                    append({
                      name: "",
                      balance: "",
                      interestRate: "",
                      minimumPayment: "",
                    })
                  }}
                >
                  <i className="fa-solid fa-plus"></i>Add Debt
                </button>
              )}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <FormTitle>Set Goals</FormTitle>
            <fieldset className="fieldset">
              <label className="label" htmlFor="targetEmergencyFund">
                Target Emergency Fund
              </label>
              <Input
                type="currency"
                id="targetEmergencyFund"
                register={register("targetEmergencyFund", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.targetEmergencyFund && (
                <p className="text-red-400 text-xs">
                  {errors.targetEmergencyFund.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="targetRetirementBalance">
                Retirement Goal
              </label>
              <Input
                type="currency"
                id="targetRetirementBalance"
                register={register("targetRetirementBalance", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.targetRetirementBalance && (
                <p className="text-red-400 text-xs">
                  {errors.targetRetirementBalance.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="snowballAmount">
                Snowball Amount
              </label>
              <Input
                type="currency"
                id="snowballAmount"
                register={register("snowballAmount", {
                  onChange: (e) => {
                    e.target.value = formatInputValueToNumericDecimals(
                      e.target.value,
                    )
                  },
                })}
              />
              {errors.snowballAmount && (
                <p className="text-red-400 text-xs">
                  {errors.snowballAmount.message}
                </p>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <label className="label" htmlFor="projectedReturns">
                Projected Returns
              </label>
              <Input
                type="percent"
                id="projectedReturns"
                register={register("projectedReturns")}
              />
              {errors.projectedReturns && (
                <p className="text-red-400 text-xs">
                  {errors.projectedReturns.message}
                </p>
              )}
            </fieldset>
          </>
        )}
      </div>
      <div className="flex justify-between">
        {step > 0 && (
          <button type="button" className="btn btn-ghost" onClick={prev}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        )}
        {step === steps.length - 1 ? (
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={next}>
            Next
          </button>
        )}
      </div>
    </form>
  )
}
