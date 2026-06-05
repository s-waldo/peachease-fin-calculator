import type { StateCreator } from "zustand"

export interface ProgressSliceT {
  step: number
  nextStep: () => void
  prevStep: () => void
}

export const progressStateStore: StateCreator<ProgressSliceT, [], [], ProgressSliceT> = (set) => ({
  step: 0,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () =>
    set((state) => ({ step: state.step === 0 ? 0 : state.step - 1 })),
})
