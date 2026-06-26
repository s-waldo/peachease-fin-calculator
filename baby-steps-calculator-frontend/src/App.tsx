import "./App.css"

import Introduction from "./pages/Introduction"
import SetPersonalInfo from "./pages/SetPersonalInfo"
import SetMortgage from "./pages/SetMortgage"
import SetDebts from "./pages/SetDebts"
import { useGlobalStore } from "./utils/state/globalState"
import SetGoals from "./pages/SetGoals"
import Form from "./pages/Form"
import Results from "./pages/Results"

function App() {
  const step = useGlobalStore((state) => state.step)

  const steps = [
    <Introduction />,
    <SetPersonalInfo />,
    <SetMortgage />,
    <SetDebts />,
    <SetGoals />,
  ]

  return (
    <div>
      {/* <div style={{ width: "75%", minWidth: "450px" }}>{steps[step]}</div> */}
      {/* <Results /> */}
      <Form />
    </div>
  )
}

export default App
