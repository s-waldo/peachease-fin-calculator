import { useState } from "react"
import { useGlobalStore } from "../utils/state/globalState"
import type { DebtData } from "../utils/state/formState"
import {
  FormatDecimalNumberInput,
  FormBlock,
  FormFieldset,
  FormInput,
  FormLabel,
  FormPercentInput,
  FormTitle,
} from "../components/form/formComponents"

const defaultCurrDebtData = {
  id: "",
  name: "",
  balance: "0.00",
  interestRateAsInteger: "0.00",
  minimumPayment: "0.00",
}

export default function SetDebts() {
  const debts = useGlobalStore((state) => state.formData.debts)
  const addDebt = useGlobalStore((state) => state.addDebt)
  const deleteDebt = useGlobalStore((state) => state.deleteDebt)

  const [currDebt, setCurrDebt] = useState<DebtData>(defaultCurrDebtData)
  const [isFormShown, setIsFormShown] = useState(false)

  const handleSubmit = () => {
    addDebt({ ...currDebt, id: crypto.randomUUID() })
    resetForm()
    showForm()
  }

  const showForm = () => {
    setIsFormShown((prev) => !prev)
  }
  const resetForm = () => {
    setCurrDebt(defaultCurrDebtData)
  }
  const editDebt = (id: string) => {
    setIsFormShown(true)
    const editableDebt = debts.find((debt) => debt.id === id)
    if (!editableDebt) return
    deleteDebt(id)
    setCurrDebt(editableDebt)
  }

  return (
    <FormBlock>
      <FormTitle>Debts</FormTitle>
      <div>
        {debts.length === 0 && !isFormShown ? (
          <div>You currently have no debts.</div>
        ) : (
          debts.map((debt) => {
            return (
              <div
                className="rounded shadow py-2 px-2 grid grid-cols-3 tabular-nums"
                key={debt.id}
              >
                <div className="col-span-2 flex flex-col">
                  <div className="text-lg font-bold">{debt.name}</div>
                  <div className="flex flex-col text-xs">
                    <div>
                      Balance: <strong>${debt.balance}</strong>
                    </div>
                    <div>
                      Interest: <strong>{debt.interestRateAsInteger}%</strong>
                    </div>
                    <div>
                      Min. Payment:{" "}
                      <strong>
                        ${Number(debt.minimumPayment).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => editDebt(debt.id)}
                  >
                    <i className="text-sm fa-solid fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-xs btn-ghost"
                    onClick={() => deleteDebt(debt.id)}
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
            <FormFieldset>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                id="name"
                name="name"
                type="text"
                value={currDebt.name}
                onChange={(e) =>
                  setCurrDebt((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </FormFieldset>
            <FormFieldset>
              <FormLabel htmlFor="balance">Balance</FormLabel>
              <FormatDecimalNumberInput
                id="balance"
                name="balance"
                value={currDebt.balance}
                onChange={(e) => {
                  const amountStr = e.target.value.replace(/[^\d]/g, "")
                  setCurrDebt((prev) => ({
                    ...prev,
                    balance: (Number(amountStr) / 100).toFixed(2),
                  }))
                }}
              />
            </FormFieldset>
            <FormFieldset>
              <FormLabel htmlFor="minimumPayment">Minimum Payment</FormLabel>
              <FormatDecimalNumberInput
                id="minimumPayment"
                name="minimumPayment"
                value={currDebt.minimumPayment}
                onChange={(e) => {
                  const amountStr = e.target.value.replace(/[^\d]/g, "")
                  setCurrDebt((prev) => ({
                    ...prev,
                    minimumPayment: (Number(amountStr) / 100).toFixed(2),
                  }))
                }}
              />
            </FormFieldset>
            <FormFieldset>
              <FormLabel htmlFor="interestRateAsInteger">
                Interest Rate
              </FormLabel>
              <FormPercentInput
                value={currDebt.interestRateAsInteger}
                onChange={(e) => {
                  const amountStr = e.target.value.replace(/[^\d]/g, "")
                  setCurrDebt((prev) => ({
                    ...prev,
                    interestRateAsInteger: (Number(amountStr) / 100).toFixed(2),
                  }))
                }}
                id={"interestRateAsInteger"}
                name={"interestRateAsInteger"}
              />
            </FormFieldset>
            <button className="btn btn-ghost" onClick={handleSubmit}>
              <i className="fa-solid fa-save"></i>Save
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost" onClick={showForm}>
            <i className="fa-solid fa-plus"></i>Add Debt
          </button>
        )}
      </div>
    </FormBlock>
  )
}
