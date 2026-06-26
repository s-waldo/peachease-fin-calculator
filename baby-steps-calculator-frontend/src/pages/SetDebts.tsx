import { useState } from "react"
import {
  FormatDecimalNumberInput,
  FormFieldset,
  FormInput,
  FormLabel,
  FormPercentInput,
  FormTitle,
  Input,
} from "../components/form/formComponents"
import { useFieldArray } from "react-hook-form"

export default function SetDebts({ control, watch, register }) {
  const [isFormShown, setIsFormShown] = useState(false)

  const showForm = () => {
    setIsFormShown((prev) => !prev)
  }

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "debts",
  })

  const watchedDebts = watch("debts")

  return (
    <>
      <FormTitle>Debts</FormTitle>
      <div>
        {fields.length === 0 && !isFormShown ? (
          <div>You currently have no debts.</div>
        ) : (
          fields.map((field, index) => {
            if (isFormShown && index === fields.length - 1) return null

            const currentDebt = watchedDebts[index] || field
            return (
              <div
                className="rounded shadow py-2 px-2 grid grid-cols-3 tabular-nums"
                key={field.id}
              >
                <div className="col-span-2 flex flex-col">
                  <div className="text-lg font-bold">{currentDebt.name}</div>
                  <div className="flex flex-col text-xs">
                    <div>
                      Balance: <strong>${currentDebt.balance}</strong>
                    </div>
                    <div>
                      Interest: <strong>{currentDebt.interestRate}%</strong>
                    </div>
                    <div>
                      Min. Payment:{" "}
                      <strong>
                        ${Number(currentDebt.minimumPayment).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="button"
                    className="btn btn-xs btn-ghost"
                    onClick={() => null}
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
            <fieldset>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                {...register(`debts.${fields.length - 1}.name`)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="balance">Balance</label>
              <input
                id="balance"
                {...register(`debts.${fields.length - 1}.balance`)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="minimumPayment">Minimum Payment</label>
              <input
                id="minimumPayment"
                {...register(`debts.${fields.length - 1}.minimumPayment`)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="interestRate">Interest Rate</label>
              <Input
                id={"interestRate"}
                register={register}
                name={`debts.${fields.length - 1}.interestRate`}
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
  )
}
