import { type HTMLInputTypeAttribute, type ReactNode } from "react"
import { useGlobalStore } from "../../utils/state/globalState"
import type {
  UseFormRegisterReturn,
} from "react-hook-form"

export function FormBlock({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: () => void
}) {
  const step = useGlobalStore((state) => state.step)
  const prevStep = useGlobalStore((state) => state.prevStep)
  const nextStep = useGlobalStore((state) => state.nextStep)

  return (
    <FormCard onSubmit={onSubmit}>
      <div className="w-full">{children}</div>
      <div className="w-full flex justify-end gap-4">
        <button
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={step <= 0}
        >
          Prev
        </button>
        {step < 5 - 1 ? (
          <button
            className="btn btn-primary"
            onClick={nextStep}
            disabled={!(step < 5 - 1)}
          >
            Next
          </button>
        ) : (
          <button className="btn btn-primary">See my results</button>
        )}
      </div>
    </FormCard>
  )
}

export function FormCard({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: () => void
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col rounded-2xl shadow items-center justify-center p-8 gap-8"
    >
      {children}
    </form>
  )
}

export function FormTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl bold">{children}</h2>
}

export function FormInput({
  id,
  value,
  onChange,
  type = "text",
  min = undefined,
  max = undefined,
  register,
}: {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: HTMLInputTypeAttribute
  min?: string | number | undefined
  max?: string | number | undefined
  register?: UseFormRegisterReturn
}) {
  return (
    <input
      className="input"
      type={type}
      id={id}
      {...register}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  )
}

export function FormatDecimalNumberInput({ value, onChange, id, register }) {
  return (
    <label className="input">
      <i className="fa-regular fa-dollar-sign"></i>
      <input
        type="text"
        inputMode="decimal"
        id={id}
        {...register}
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

export function FormAddDebtForm() {}

export function FormDebtField() {}

export function Input({
  id,
  register,
  type,
}: {
  id: string
  register: UseFormRegisterReturn
  type: "text" | "currency" | "percent"
}) {
  switch (type) {
    case "text":
      return <input className="input" id={id} {...register} />
    case "currency":
      return (
        <div className="input">
          <i className="fa-regular fa-dollar-sign"></i>
          <input type="text" inputMode="decimal" id={id} {...register} />
        </div>
      )
    case "percent":
      return (
        <div className="input">
          <input type="text" inputMode="decimal" id={id} {...register} />
          <span>%</span>
        </div>
      )
  }
}
