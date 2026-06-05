import type { ReactNode } from "react"
import { useGlobalStore } from "../../utils/state/globalState"

export function FormBlock({ children }: { children: ReactNode }) {
  const step = useGlobalStore((state) => state.step)
  const prevStep = useGlobalStore((state) => state.prevStep)
  const nextStep = useGlobalStore((state) => state.nextStep)

  return (
    <>
      <div>{children}</div>
      <div>
        <p>{step}</p>
        <button onClick={prevStep} disabled={step <= 0}>
          Prev
        </button>
        <button onClick={nextStep} disabled={!(step < 5 - 1)}>
          Next
        </button>
      </div>
    </>
  )
}

export function FormInput() {

}

export function FormatDecimalNumberInput() {

}

export function FormLabel() {
  
}
