import { useGlobalStore } from "../utils/state/globalState"

export default function Introduction() {
  const nextStep = useGlobalStore((state) => state.nextStep)
  return (
    <div className="grid lg:grid-cols-2 grid-rows-1 min-h-dvh p-10">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome to Peachy!</h2>
          <p>Get started today to project your financial future.</p>
        </div>
        <div>
          <h3 className="italic">How does it work?</h3>
          <p>
            Answer a few questions to get your financial freedom date in
            accordance to the baby steps plan. Once calculated, you'll be able to
            come back in the future to track your progress!
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <p>Ready to start?</p>
        <button className="btn btn-primary w-1/2" onClick={nextStep}>
          Take the quiz
        </button>
      </div>
    </div>
  )
}
