import { type ComponentProps, type HTMLInputTypeAttribute, type ReactNode } from "react"
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
        <button
          className="btn btn-primary"
          onClick={prevStep}
          disabled={step <= 0}
        >
          Prev
        </button>
        <button
          className="btn btn-primary"
          onClick={nextStep}
          disabled={!(step < 5 - 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}

export function FormInput({
  id,
  name,
  value,
  onChange,
  type = "text",
  min = undefined,
  max = undefined,
}: {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  min?: string | number | undefined
  max?: string | number | undefined
}) {
  return (
    <input
      className="input"
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  )
}

export function FormatDecimalNumberInput({ value, onChange, name, id }) {
  return (
    <label className="input">
      <i className="fa-regular fa-dollar-sign"></i>
      <input
        type="text"
        inputMode="decimal"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export function FormLabel() {
  return <label htmlFor="annualIncome">Age</label>
}
