import { useState } from "react"

import { MoneyInput } from "../App"
import { useGlobalStore } from "../utils/state/globalState"
import type { DebtData } from "../utils/state/formState"
import {FormBlock} from "../components/form/formComponents"

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

  const handleSubmit = () => {
    addDebt({ ...currDebt, id: crypto.randomUUID() })
    resetForm()
  }

  const resetForm = () => {
    setCurrDebt(defaultCurrDebtData)
  }
  const editDebt = (id: string) => {
    const editableDebt = debts.find((debt) => debt.id === id)
    if (!editableDebt) return
    deleteDebt(id)
    setCurrDebt(editableDebt)
  }

  return (
    <FormBlock>
      <div>Debts</div>
      <div>
        {debts.map((debt) => {
          return (
            <div key={debt.id}>
              <p>
                {debt.name} <span>Balance: ${debt.balance}</span>
                <span>
                  <div>Interest: {debt.interestRateAsInteger}%</div>
                  <div>Min. Payment: ${debt.minimumPayment}</div>
                </span>
              </p>
              <div>
                <button onClick={() => editDebt(debt.id)}>Edit</button>
                <button onClick={() => deleteDebt(debt.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20% 50%",
            rowGap: "5px",
          }}
        >
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={currDebt.name}
            onChange={(e) =>
              setCurrDebt((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <label htmlFor="">Balance</label>
          <input
            type="text"
            inputMode="decimal"
            value={currDebt.balance}
            placeholder="0.00"
            onChange={(e) => {
              const amountStr = e.target.value.replace(/[^\d]/g, "")
              setCurrDebt((prev) => ({
                ...prev,
                balance: (Number(amountStr) / 100).toFixed(2),
              }))
            }}
          />
          <label htmlFor="">Minimum Payment</label>
          <input
            type="text"
            inputMode="decimal"
            value={currDebt.minimumPayment}
            onChange={(e) =>
              setCurrDebt((prev) => ({
                ...prev,
                minimumPayment: e.target.value.replace(/[^\d.]/g, ""),
              }))
            }
          />
          <label htmlFor="">Interest Rate</label>
          <MoneyInput
            state={currDebt.interestRateAsInteger}
            onChange={setCurrDebt}
            name={"interestRateAsInteger"}
          />
          <button onClick={handleSubmit}>Add Debt</button>
        </div>
      </div>
    </FormBlock>
  )
}
