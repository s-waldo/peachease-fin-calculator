import { useGlobalStore } from "../utils/state/globalState"

export default function Introduction() {
  const nextStep = useGlobalStore((state) => state.nextStep)
  return (
    <>
      <h2>Welcome to the Baby Steps Calculator!</h2>
      <p>Get started today to project your financial future.</p>
      <h3>How does it work?</h3>
      <p>
        Answer a few questions to get your financial freedom date in accordance
        to the baby steps plan. Once calculated, you'll be able to come back in
        the future to track your progress!
      </p>

      <p>Ready to go?</p>
      <button onClick={nextStep}>Start</button>
    </>
  )
}
