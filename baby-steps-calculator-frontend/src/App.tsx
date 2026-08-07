import "./App.css"

import Form from "./pages/Form"
import Results from "./pages/Results"
import Introduction from "./pages/Introduction"
import { useGlobalStore } from "./utils/state/globalState"

function App() {
  const step = useGlobalStore((state) => state.step)

  const pages = [<Introduction />, <Form />, <Results />]

  return <div className="min-h-dvh w-full">{pages[step]}</div>
}

export default App
