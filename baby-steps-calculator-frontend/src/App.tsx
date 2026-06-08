import "./App.css"

import Introduction from "./pages/Introduction"
import SetPersonalInfo from "./pages/SetPersonalInfo"
import SetMortgage from "./pages/SetMortgage"
import SetDebts from "./pages/SetDebts"
import { useGlobalStore } from "./utils/state/globalState"
import SetGoals from "./pages/SetGoals"

function App() {
  const step = useGlobalStore((state) => state.step)
  const nextStep = useGlobalStore((state) => state.nextStep)
  const prevStep = useGlobalStore((state) => state.prevStep)

  const steps = [
    <Introduction />,
    <SetPersonalInfo />,
    <SetMortgage />,
    <SetDebts />,
    <SetGoals />,
  ]

  return (
    <div
      style={{
        margin: "0 auto",
        display: "grid",
        grid: "1fr 1fr 1fr / auto-flow",
        width: "50%",
        height: "100dvh",
      }}
    >
      <div style={{ width: "75%", minWidth: "450px" }}>{steps[step]}</div>
      <div>
        <p>{step}</p>
        <button
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={step <= 0}
        >
          Prev
        </button>
        <button className="btn btn-secondary" onClick={nextStep} disabled={!(step < steps.length - 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export function MoneyInput({ state, onChange, name }) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={state}
      onChange={(e) => {
        const amountStr = e.target.value.replace(/[^\d]/g, "")
        onChange((prev) => ({
          ...prev,
          [name]: (Number(amountStr) / 100).toFixed(2),
        }))
      }}
    />
  )
}

export default App
