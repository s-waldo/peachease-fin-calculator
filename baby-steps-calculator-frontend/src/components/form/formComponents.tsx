import { type HTMLInputTypeAttribute, type ReactNode } from "react"
import { useGlobalStore } from "../../utils/state/globalState"

export function FormBlock({ children }: { children: ReactNode }) {
  const step = useGlobalStore((state) => state.step)
  const prevStep = useGlobalStore((state) => state.prevStep)
  const nextStep = useGlobalStore((state) => state.nextStep)

  return (
    <FormCard>
      <div className="w-full">{children}</div>
      <div className="w-full flex justify-end gap-4">
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
    </FormCard>
  )
}

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-2xl shadow items-center justify-center p-8 gap-8">
      {children}
    </div>
  )
}

export function FormTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl bold">{children}</h2>
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
export function FormPercentInput({ value, onChange, name, id }) {
  return (
    <label className="input">
      <input
        type="text"
        inputMode="decimal"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span>%</span>
    </label>
  )
}

export function FormLabel({
  children,
  htmlFor,
}: {
  children: ReactNode
  htmlFor: string
}) {
  return (
    <label className="label" htmlFor={htmlFor}>
      {children}
    </label>
  )
}
export function FormFieldset({ children }: { children: ReactNode }) {
  return <fieldset className="fieldset">{children}</fieldset>
}


export function FormAddDebtForm() {

}

export function FormDebtField() {
  
}