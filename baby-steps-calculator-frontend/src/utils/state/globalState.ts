import { create } from "zustand"
import { progressStateStore, type ProgressSliceT } from "./progressState"
import { formStateStore, type FormStateStoreT } from "./formState"
import { resultStateStore, type ResultStateStoreT } from "./resultState"

export const useGlobalStore = create<ProgressSliceT & FormStateStoreT & ResultStateStoreT>()(
  (...a) => ({
    ...progressStateStore(...a),
    ...formStateStore(...a),
    ...resultStateStore(...a)
  }),
)
